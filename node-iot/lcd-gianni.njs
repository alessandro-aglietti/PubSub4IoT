var pubsub = require('./pubsub.njs');
var atob = require('atob');
var lcd = require('./lcd.js');

var ANNA_TOPIC = "projects/potent-poetry-86911/topics/anna";
var GIANNI_TOPIC = "projects/potent-poetry-86911/topics/gianni";
var GIANNI_SUB = "projects/potent-poetry-86911/subscriptions/gianni";

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
		pubsub.pub(JSON.stringify(stack), ANNA_TOPIC);
	}
}

var SERVICE_ACCOUNT = '835550676211-5cd1go92306lp54ej68hguiibtaf58a6@developer.gserviceaccount.com';
var PEM_PATH = '../p12/key.pem';

pubsub.auth(PEM_PATH, SERVICE_ACCOUNT, function() {
	pubsub.pub("Gianni pronto", GIANNI_TOPIC);

	pubsub.sub(GIANNI_SUB, parse);
});