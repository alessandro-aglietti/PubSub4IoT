var pubsub = require('./pubsub.njs');
var atob = require('atob');

var BEPPE_TOPIC = "projects/potent-poetry-86911/topics/beppe";
var BEPPE_ALL_SUB = "projects/potent-poetry-86911/subscriptions/beppeall";
var BEPPE_SUB = "projects/potent-poetry-86911/subscriptions/beppe";

var ANNA_SUB = "projects/potent-poetry-86911/subscriptions/anna";
var ANNA_TOPIC = "projects/potent-poetry-86911/topics/anna";
var ANNA_ALL_SUB = "projects/potent-poetry-86911/subscriptions/annaall";

var BABY_TOPIC = "projects/potent-poetry-86911/topics/baby";
var BABY_ALL_SUB = "projects/potent-poetry-86911/subscriptions/babyall";

var SERVICE_ACCOUNT = '835550676211-5cd1go92306lp54ej68hguiibtaf58a6@developer.gserviceaccount.com';
var PEM_PATH = '../p12/key.pem';

pubsub.auth(PEM_PATH, SERVICE_ACCOUNT, function() {
	pubsub.sub(ANNA_ALL_SUB, function(msg) {
		var clearData = atob(msg.message.data);
		console.log("Anna: " + clearData);
	});

	pubsub.sub(BEPPE_ALL_SUB, function(msg) {
		var clearData = atob(msg.message.data);
		console.log("Beppe: " + clearData);
	});
});