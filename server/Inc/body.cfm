</head>
<body>
<cfscript>
if (request.navbar) {
	echo('<nav class="navbar navbar-#request.bootstrap.navbar_top#-top">' & request.LF) // I'll have to change the css, too.
	include '/Inc/navbar.cfm'
	echo('<div class="navbar-default">')
	if (request.msg == '') {
		echo('	<div class="msg container">' & request.LF)
		echo('		<div id="msg"></div>' & request.LF)
	} else {
		echo('	<div class="msg container ' & request.bootstrap.modifier & '">' & request.LF)
		echo('		<div id="msg">' & request.msg & '</div>' & request.LF)
	}
	echo('	</div>' & request.LF)
	echo('</div>' & request.LF)
	include '/Inc/Progress.cfm'
	echo('</nav>' & request.LF)
}
if (request.bootstrap.container) {
	echo('<main role="main" class="container">' & request.LF)
} else {
	echo('<main role="main" class="container-fluid">' & request.LF)
}
if (request.bootstrap.row) {
	echo('<div class="row">' & request.LF)
	echo('	<div class="col-xs-12">' & request.LF)
}
</cfscript>
