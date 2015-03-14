var pubsub = require('./pubsub.njs');
var atob = require('atob');

var BEPPE_TOPIC = "projects/potent-poetry-86911/topics/beppe";
var ANNA_TOPIC = "projects/potent-poetry-86911/topics/anna";
var BEPPE_SUB = "projects/potent-poetry-86911/subscriptions/beppe";
var ANNA_SUB = "projects/potent-poetry-86911/subscriptions/anna";

function parse(msg) {
	var clearData = atob(msg.message.data);
	switch (clearData) {
	case "Pronti?":
		pubsub.pub("Si!", ANNA_TOPIC);
		break;
	case "Anna inizia a contare":
		pubsub.pub(1, BEPPE_TOPIC);
		break;
	default:
		var count = parseInt(clearData, 10);

		count++;

		if (count < 11) {
			pubsub.pub(count, BEPPE_TOPIC);
		}
		break;
	}

}

var SERVICE_ACCOUNT = '835550676211-5cd1go92306lp54ej68hguiibtaf58a6@developer.gserviceaccount.com';
var PEM_PATH = '../p12/key.pem';

pubsub.auth(PEM_PATH, SERVICE_ACCOUNT, function() {
	pubsub.pub("Anna pronta", ANNA_TOPIC);

	pubsub.sub(ANNA_SUB, parse);
});