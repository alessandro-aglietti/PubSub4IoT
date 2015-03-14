var http = require('http');
var btoa = require('btoa');

var google = require('googleapis');
var pubsub = google.pubsub('v1beta2');

module.exports = {
	_SCOPE_CLOUD_PLATFORM : "https://www.googleapis.com/auth/cloud-platform",
	_SCOPE_PUBSUB : "https://www.googleapis.com/auth/pubsub",
	_JWT_CLIENT : null,
	auth : function(pemPath, serviceAccount, callback) {

		this._JWT_CLIENT = new google.auth.JWT(serviceAccount, pemPath, null, [
				this._SCOPE_CLOUD_PLATFORM, this._SCOPE_PUBSUB ]);

		this._JWT_CLIENT.authorize(function(err, tokens) {
			if (err === null) {
				console.log(tokens);
				callback();
			} else {
				console.log(err);
			}
		});
	},

	pub : function(message, topic) {
		pubsub.projects.topics.publish({
			auth : this._JWT_CLIENT,
			topic : topic,
			resource : {
				messages : [ {
					data : btoa(message)
				} ]
			}
		}, function(err, resp) {
			// handle err and response
			if (err === null) {
				console.log("pub done");
			} else {
				console.log(err);
			}
		});
	},

	_pull : function(sub, callback) {
		pubsub.projects.subscriptions.pull({
			auth : this._JWT_CLIENT,
			subscription : sub,
			resource : {
				returnImmediately : "false",
				maxMessages : "1",
			}

		}, callback);
	},

	_acknowledge : function(msgs, sub) {
		var ackIds = [];
		for (var i = 0; i < msgs.length; i++) {
			var msg = msgs[i];
			ackIds.push(msg.ackId);
		}

		pubsub.projects.subscriptions.acknowledge({
			auth : this._JWT_CLIENT,
			subscription : sub,
			resource : {
				ackIds : ackIds,
			}
		}, function(err, resp) {
			// handle err and response
			if (err === null) {
				console.log("acknowledge");
			} else {
				console.log(err);
			}
		});
	},

	sub : function(sub, parseCallback) {
		var thiss = this;
		this._pull(sub, function(err, resp) {
			if (err === null) {
				if (resp.receivedMessages && resp.receivedMessages.length > 0) {
					thiss._acknowledge(resp.receivedMessages, sub);

					for (var i = 0; i < resp.receivedMessages.length; i++) {
						var msg = resp.receivedMessages[i];
						parseCallback(msg);
					}
				}

			} else {
				console.log(err);
			}

			thiss.sub(sub, parseCallback);
		});
	}
};