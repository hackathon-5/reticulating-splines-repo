<cfscript>
if (request.bootstrap.row) {
	echo('	</div>' & request.LF)
	echo('</div>' & request.LF)
}
echo('</main>' & request.LF)
if (request.js) {
	// echo('<script src="/GoogleAnalytics.js"></script>' & request.LF)
	if (request.bootstrap.value) {
		echo('<script src="' & request.home & '/Inc/foot.js"></script>' & request.LF)
		echo('<script src="//cdn.jsdelivr.net/bootstrap/latest/js/bootstrap.js"></script>' & request.LF)
	}
	if (request.jQueryUI.value) {
		echo('<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js"></script>' & request.LF)
		echo('<script src="//cdn.jsdelivr.net/jquery.ui.touch-punch/latest/jquery.ui.touch-punch.js"></script>' & request.LF)
	}
}
</cfscript>
