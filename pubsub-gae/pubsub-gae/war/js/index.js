$(function() {
	channel = new goog.appengine.Channel(CHANNEL_API_TOKEN);
	socket = channel.open();
	socket.onopen = onOpened;
	socket.onmessage = onMessage;
	socket.onerror = onError;
	socket.onclose = onClose;
});

function onOpened() {
	console.log("onOpened");
}

function onMessage(message) {
	var msg = JSON.parse(message.data.trim());
	
	$("#console").prepend("<p><b>" + msg.subscription + ":</b> <i>" + msg.message + "</i></p>");
}

function onError(error) {
	console.log("onError: " + error);
	// alert + refresh page

}

function onClose() {
	console.log("onClose");
}