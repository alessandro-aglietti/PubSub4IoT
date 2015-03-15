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
	var msg;
	try {
		msg = JSON.parse(message.data.trim());
		console.info(msg);
	} catch (e) {
		console.log('JSON.parse failed:', data);
	}

	var nome = msg.subscription.substr(1, msg.subscription.indexOf('push') - 1);

	var stack = msg.message;
	var messaggio = '';

	if (stack !== null && stack.length > 0) {

		if (typeof stack == "string") {
			messaggio = stack;
		} else {
			var popped = stack.pop();
			var dur = popped.duration || 1000;
			if (popped.color) {
				document.getElementById('scheda-' + nome).style.borderColor = popped.color;
				setTimeout(
						function() {
							document.getElementById('scheda-' + nome).style.borderColor = 'white';
						}, dur);
				messaggio += 'LCD [' + popped.color + '], ';
			}

			if (popped.arm) {
				document.getElementById('forchetta-' + nome).style.visibility = 'visible';
				setTimeout(
						function() {
							document.getElementById('forchetta-' + nome).style.visibility = 'hidden';
						}, dur);
				messaggio += 'Raise fork, ';
			}

			if (popped.buzzer) {

			}

			if (dur) {
				messaggio += 'Dur: ' + dur + 'ms';
			}
		}
	}

	var newRow = document.createElement('tr');
	var newSender = document.createElement('td');
	var newMessage = document.createElement('td');
	newRow.className = 'success';
	newSender.innerText = nome;
	newMessage.innerText = messaggio;
	newRow.appendChild(newSender);
	newRow.appendChild(newMessage);
	$("#message-list").prepend(newRow);
	setTimeout(function() {
		newRow.className = '';
	}, 1000);
}

function onError(error) {
	console.log("onError: " + error);
	// alert + refresh page

}

function onClose() {
	console.log("onClose");
}