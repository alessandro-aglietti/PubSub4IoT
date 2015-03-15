var pubsub = require('./pubsub.njs');
var atob = require('atob');
var lcd = require('./lcd.js');

var BEPPE_TOPIC = "projects/potent-poetry-86911/topics/beppe";
var ANNA_TOPIC = "projects/potent-poetry-86911/topics/anna";
var BEPPE_SUB = "projects/potent-poetry-86911/subscriptions/beppe";
var ANNA_SUB = "projects/potent-poetry-86911/subscriptions/anna";

var five = require("johnny-five");
var Edison = require("galileo-io");
var board = new five.Board({
	io : new Edison()
});

board
		.on(
				"ready",
				function() {

					var button = new five.Button(4);
					var servo = new five.Servo(6);
					var piezo = new five.Piezo(3);

					piezo.off();

					function raiseArm() {
						servo.min();
						console.log("Raising Arm");
					}

					function lowerArm() {
						servo.to(84);
						console.log("Lowering Arm");
					}

					function raiseArmForDuration(duration) {
						raiseArm();
						setTimeout(function() {
							lowerArm();
						}, duration);
					}

					function bip(duration) {
						piezo.play({
							song : "A",
							beats : 1 / 4,
							tempo : 1
						});
						setTimeout(function() {
							piezo.off();
						}, duration * 10);
					}

					function parse(msg) {
						var clearData = atob(msg.message.data);
						var stack = null;
						try {
							stack = JSON.parse(clearData);
						} catch (e) {
							console.log('JSON.parse failed');
						}

						if (stack !== null && stack.length > 0) {
							var popped = stack.pop();

							if (popped.color) {
								lcd.setColor(popped.color,
										popped.duration || 1000);
							}

							if (popped.arm) {
								// arm
								console.log("arm");
								raiseArmForDuration(popped.duration || 1000);
							}

							if (popped.buzzer) {
								// buzzer popped.duration || 1000
								console.log("buzzer");
							}

							// CHANGE TO NEXT Edison TOPIC
							pubsub.pub(JSON.stringify(stack), ANNA_TOPIC);
						}
					}

					var SERVICE_ACCOUNT = '835550676211-5cd1go92306lp54ej68hguiibtaf58a6@developer.gserviceaccount.com';
					var PEM_PATH = '../p12/key.pem';

					pubsub.auth(PEM_PATH, SERVICE_ACCOUNT, function() {
						pubsub.pub("Anna pronta", ANNA_TOPIC);

						pubsub.sub(ANNA_SUB, parse);
					});
				});
