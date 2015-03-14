<?xml version="1.0" encoding="utf-8"?>

<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">

<script>
	var CHANNEL_API_TOKEN = '${channel.token}';
</script>

<script src="/js/jquery-1.11.2.min.js" type="text/javascript"></script>
<link rel="stylesheet"
	href="/bootstrap-3.3.2-dist/css/bootstrap.min.css">
<link rel="stylesheet"
	href="/bootstrap-3.3.2-dist/css/bootstrap-theme.min.css">
<script src="/bootstrap-3.3.2-dist/js/bootstrap.min.js"></script>

<script type="text/javascript" src="/_ah/channel/jsapi"></script>
<script type="text/javascript" src="/js/index.js"></script>
</head>
<body>
	<div class="container-fluid">
		<div class="row">
			<div class="col-xs-12 col-sm-12 col-md-12">
				<h1>Message from Pub/Sub Hub!!</h1>
				<div id="console">
				</div>
			</div>
		</div>
	</div>
</body>
</html>