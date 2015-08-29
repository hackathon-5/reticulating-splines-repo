<!doctype html>
<html lang="en" class="no-js">
<head>
<meta content="Phillip Senn" name="author">
<meta content="Michael Senn" name="author">
<meta content="Matthew Senn" name="author">
<meta charset="utf-8">
<!---
<link rel="shortcut icon" href="http://www.lr.edu/sites/default/files/vnd.microsoft.png" type="image/png" />
--->
<cfscript>
echo('<title>' & request.title & '</title>' & request.LF)
if (request.css) {
	echo('<meta name="viewport" content="width=device-width, initial-scale=1, minimal-ui">' & request.LF)
	if (request.jQueryUI.value) {
		echo('<link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/themes/' & request.jQueryUI.theme & '/jquery-ui.css">');
	}
	if (request.bootstrap.value) {
		echo('<link rel="stylesheet" href="//cdn.jsdelivr.net/bootstrap/latest/css/bootstrap.css">' & request.LF)
//		echo('<link rel="stylesheet" href="//cdn.jsdelivr.net/bootstrap/latest/css/bootstrap-theme.css">' & request.LF)
//		echo('<link rel="stylesheet" href="' & request.home & '/Inc/Lucee.css">' & request.LF)
		echo('<link rel="stylesheet" href="' & request.home & '/Inc/PrairieDog.css">' & request.LF)
	}
	if (FileExists(request.dirName & request.cssName)) {
		echo('<link rel="stylesheet" href="' & request.cssName & '?cache='
		& TimeFormat(now(),'HHmmss.l') & '">' & request.LF)
	}
}
if (request.js) {
	echo('<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>' & request.LF)
//	echo('<script src="//cdn.jsdelivr.net/modernizr/latest/modernizr.js"></script>' & request.LF)
}
</cfscript>
