

<?xml version="1.0" encoding="utf-8"?>

<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>

<!DOCTYPE html>
<html lang="en">
<head>
<title>PubSubMom</title>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="">
<meta name="author" content="">
<script>
	var CHANNEL_API_TOKEN = '${channel.token}';
</script>
<script type="text/javascript" src="/_ah/channel/jsapi"></script>

<link href="lib/bootstrap.min.css" rel="stylesheet">
<link href="mat-des-dist/css/ripples.min.css" rel="stylesheet">
<link href="mat-des-dist/css/material-wfont.min.css" rel="stylesheet">
<style>
#cards-holder {
	height: 400px;
}

.cardimg {
	margin: 1%;
	display: inline-block;
	width: 30%;
	height: 100%;
	background-image: url(images/scheda.jpg);
	background-size: cover;
	background-position: center center;
	border: 8px solid white;
}

#sender-th {
	width: 200px;
}

.label-nome {
	display: inline-block;
	position: relative;
	top: 50px;
	background-color: white;
	padding: 5px 10px;
}

.forchetta {
	width: 100%;
	height: 100%;
	background-image: url(images/forchetta.png);
	background-repeat: no-repeat;
	background-position: right 54px;
	visibility: hidden;
}

@media ( max-width : 400px) {
	#sender-th {
		width: 100px;
	}
}

@media ( max-width : 800px) {
	#cards-holder {
		height: 200px;
	}
	.forchetta {
		height: 154px;
	}
}
</style>
</head>

<body>

	<div class="navbar navbar-default">
		<div class="container">
			<div class="navbar-header">
				<a class="navbar-brand" id="noizes-logo">PubSubMom</a>
			</div>
		</div>
	</div>

	<!-- Main jumbotron for a primary marketing message or call to action -->
	<div class="jumbotron">
		<div class="container" id="main-container">
			<div style="text-align: center;">
				<img style="max-width: 100%; max-height: 300px" id="header-img" />
			</div>

			<section id="main">
				<div id="cards-holder">
					<div id="scheda-anna" class="cardimg">
						<div id="nome-anna" class="label-nome text-primary">Anna</div>
						<div id="forchetta-anna" class="forchetta"></div>
					</div>
					<div id="scheda-beppe" class="cardimg">
						<div id="nome-beppe" class="label-nome text-primary">Beppe</div>
						<div id="forchetta-beppe" class="forchetta"></div>
					</div>
					<div id="scheda-gianni" class="cardimg">
						<div id="nome-gianni" class="label-nome text-primary">Gianni</div>
						<div id="forchetta-gianni" class="forchetta"></div>
					</div>
				</div>
				<br>
				<div id="message-table-holder">
					<table class="table table-striped table-hover" id="message-table">
						<thead>
							<tr>
								<th id="sender-th">Sender</th>
								<th>Message</th>
							</tr>
						</thead>
						<tbody id="message-list">
						</tbody>
					</table>

				</div>
			</section>
		</div>

		<div class="container" style="margin-top: 100px">
			<!-- Example row of columns -->
			<div class="row">
				<div>
					<h2>PubSubMom</h2>
					<p>A project taking part to the Intel® IoT Roadshow in Milan,
						Italy.</p>
					<p>
						<a
							href="https://www.hackerleague.org/hackathons/intel-r-iot-roadshow-milan-italy/hacks/pubsubmom"
							target="_blank"><button id="bt-details" type="button"
								class="btn btn-info">More details</button></a>
					</p>
				</div>
			</div>

			<hr>
			<footer>
				<p>&copy; PubSubMom 2015</p>
			</footer>
		</div>
		<!-- /container -->


		<script src="lib/jquery-1.10.2.min.js"></script>
		<script src="lib/bootstrap.min.js"></script>
		<script src="mat-des-dist/js/ripples.min.js"></script>
		<script src="mat-des-dist/js/material.min.js"></script>
		<script>
			$(document).ready(function() {
				$.material.init();
			});
		</script>

		<script src="js/index.js"></script>
</body>

</html>
