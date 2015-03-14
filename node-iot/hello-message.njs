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

var CLIENT_ID = "835550676211-5cd1go92306lp54ej68hguiibtaf58a6.apps.googleusercontent.com";
var CLIENT_SECRET = "";

function createTopic() {
	return pubsub.projects.topics.create({
		auth : jwtClient,
		name : "projects/potent-poetry-86911/topics/mytopic"
	}, function(err, resp) {
		// handle err and response
		if (err === null) {
			console.log("createTopic complete without errors");
		} else {
			console.log(err);
		}
	});
}

function publishToTopic() {
	return pubsub.projects.topics
			.publish(
					{
						auth : jwtClient,
						topic : "projects/potent-poetry-86911/topics/mytopic",
						resource : {
							"messages" : [ {
								"attributes" : {
									"key" : "value"
								},
								"data" : "SGVsbG8gQ2xvdWQgUHViL1N1YiEgSGVyZSBpcyBteSBtZXNzYWdlIQ=="
							} ]
						}
					},
					function(err, resp) {
						// handle err and response
						if (err === null) {
							console
									.log("publishToTopic complete without errors");
						} else {
							console.log(err);
						}
					});
}

function newSubScription() {
	return pubsub.projects.subscriptions
			.create(
					{
						auth : jwtClient,
						name : "projects/potent-poetry-86911/subscriptions/mysubscription",
						resource : {
							topic : "projects/potent-poetry-86911/topics/mytopic",
							pushConfig : {
								pushEndpoint : "https://potent-poetry-86911.appspot.com/pubsub_gae"
							}
						}

					},
					function(err, resp) {
						// handle err and response
						if (err === null) {
							console
									.log("newSubScription complete without errors");
						} else {
							console.log(err);
						}
					});
}

function newPullSubscription() {
	return pubsub.projects.subscriptions.create({
		auth : jwtClient,
		name : "projects/potent-poetry-86911/subscriptions/mypullsubscription",
		resource : {
			topic : "projects/potent-poetry-86911/topics/mytopic"
		}

	}, function(err, resp) {
		// handle err and response
		if (err === null) {
			console.log("newPullSubscription complete without errors");
		} else {
			console.log(err);
		}
	});
}

function acknowledge(ackIds) {
	console.log("ackIds: " + ackIds);
	return pubsub.projects.subscriptions
			.acknowledge(
					{
						auth : jwtClient,
						subscription : "projects/potent-poetry-86911/subscriptions/mypullsubscription",
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

function readPullSubscription() {
	return pubsub.projects.subscriptions
			.pull(
					{
						auth : jwtClient,
						subscription : "projects/potent-poetry-86911/subscriptions/mypullsubscription",
						resource : {
							returnImmediately : "false",
							maxMessages : "1",
						}

					},
					function(err, resp) {
						// handle err and response
						if (err === null) {
							console
									.log("readPullSubscription complete without errors");
							var ackIds = [];
							for (var i = 0; i < resp.receivedMessages.length; i++) {
								var msg = resp.receivedMessages[i];
								ackIds.push(msg.ackId);
								console.log(atob(msg.message.data));
							}
							acknowledge(ackIds);
						} else {
							console.log(err);
						}
					});
}

jwtClient.authorize(function(err, tokens) {
	if (err === null) {
		console.log(tokens);

		// Make an authorized request to list Drive files.

		// newSubScription();

		// newPullSubscription();

		//readPullSubscription();

		publishToTopic();
	} else {
		console.log(err);
	}
});
