var pubsub = require('./pubsub.njs');
var atob = require('atob');
var lcd = require('./lcd.js');

var BEPPE_TOPIC = "projects/potent-poetry-86911/topics/beppe";
var BEPPE_SUB = "projects/potent-poetry-86911/subscriptions/beppe";
var GIANNI_TOPIC = "projects/potent-poetry-86911/topics/gianni";

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
			lcd.setColor(popped.color, popped.duration || 1000);
		}

		if (popped.arm) {
			// arm
			console.log("arm");
		}

		if (popped.buzzer) {
			// buzzer popped.duration || 1000
			console.log("buzzer");
		}

		// CHANGE TO NEXT Edison TOPIC
		pubsub.pub(JSON.stringify(stack), GIANNI_TOPIC);
	}
}

var SERVICE_ACCOUNT = '835550676211-5cd1go92306lp54ej68hguiibtaf58a6@developer.gserviceaccount.com';
var PEM_PATH = '../p12/key.pem';

pubsub.auth(PEM_PATH, SERVICE_ACCOUNT, function() {
	pubsub.pub("Anna pronta", BEPPE_TOPIC);

	pubsub.sub(BEPPE_SUB, parse);
});