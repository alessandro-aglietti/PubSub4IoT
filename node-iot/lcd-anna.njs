var pubsub = require('./pubsub.njs');
var atob = require('atob');
var lcd = require('./lcd.js');

var BEPPE_TOPIC = "projects/potent-poetry-86911/topics/beppe";
var ANNA_TOPIC = "projects/potent-poetry-86911/topics/anna";
var BEPPE_SUB = "projects/potent-poetry-86911/subscriptions/beppe";
var ANNA_SUB = "projects/potent-poetry-86911/subscriptions/anna";

function parse(msg) {
	var clearData = atob(msg.message.data);
	var stack = null;
	try {
		stack = JSON.parse(clearData);
	} catch (e) {
		console.log('JSON.parse failed');
	}

	if (stack !== null) {
		var popped = stack.pop();
		lcd.setColor(popped.color, popped.duration);

		pubsub.pub(JSON.stringify(stack), ANNA_TOPIC);
	}
}

var SERVICE_ACCOUNT = '835550676211-5cd1go92306lp54ej68hguiibtaf58a6@developer.gserviceaccount.com';
var PEM_PATH = '../p12/key.pem';

pubsub.auth(PEM_PATH, SERVICE_ACCOUNT, function() {
	pubsub.pub("Anna pronta", ANNA_TOPIC);

	pubsub.sub(ANNA_SUB, parse);
});