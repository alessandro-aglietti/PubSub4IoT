var http = require('http');
var btoa = require('btoa');
var atob = require('atob');
/*
 * http.createServer(function handler(req, res) { res.writeHead(200,
 * {'Content-Type': 'text/plain'}); res.end('Hello World\n'); }).listen(1337,
 * '127.0.0.1');
 */

var google = require('googleapis');
var pubsub = google.pubsub('v1beta2');

var scope1 = "https://www.googleapis.com/auth/cloud-platform";
var scope2 = "https://www.googleapis.com/auth/pubsub";

var jwtClient = new google.auth.JWT(
		'835550676211-5cd1go92306lp54ej68hguiibtaf58a6@developer.gserviceaccount.com',
		'../p12/key.pem', null, [ scope1, scope2 ]);


var BEPPE_TOPIC = "projects/potent-poetry-86911/topics/beppe";
var BEPPE_ALL_SUB = "projects/potent-poetry-86911/subscriptions/beppeall";
var BEPPE_SUB = "projects/potent-poetry-86911/subscriptions/beppe";


var ANNA_SUB = "projects/potent-poetry-86911/subscriptions/anna";
var ANNA_TOPIC = "projects/potent-poetry-86911/topics/anna";
var ANNA_ALL_SUB = "projects/potent-poetry-86911/subscriptions/annaall";



function pull(sub, callback) {
	pubsub.projects.subscriptions.pull({
		auth : jwtClient,
		subscription : sub,
		resource : {
			returnImmediately : "false",
			maxMessages : "1",
		}

	}, callback);
}

function acknowledge(msgs, sub) {
	var ackIds = [];
	for (var i = 0; i < msgs.length; i++) {
		var msg = msgs[i];
		ackIds.push(msg.ackId);
		// console.log(atob(msg.message.data));
	}

	pubsub.projects.subscriptions.acknowledge({
		auth : jwtClient,
		subscription : sub,
		resource : {
			ackIds : ackIds,
		}
	}, function(err, resp) {
		// handle err and response
		if (err === null) {
			console.log("acknowledge complete without errors");
		} else {
			console.log(err);
		}
	});
}

function pullLoop(sub, parseCallback) {
	pull(sub, function(err, resp) {
		if (err === null) {
			console.log("pull complete without errors");
			acknowledge(resp.receivedMessages, sub);

			for (var i = 0; i < resp.receivedMessages.length; i++) {
				var msg = resp.receivedMessages[i];
				parseCallback(msg);
			}

		} else {
			console.log(err);
		}

		pullLoop(sub, parseCallback);
	});
}

jwtClient.authorize(function(err, tokens) {
	if (err === null) {
		console.log(tokens);

		pullLoop(ANNA_ALL_SUB, function(msg){
			var clearData = atob(msg.message.data);
			console.log("Anna: " + clearData);
		});
		
		pullLoop(BEPPE_ALL_SUB, function(msg){
			var clearData = atob(msg.message.data);
			console.log("Beppe: " + clearData);
		});

	} else {
		console.log(err);
	}
});
