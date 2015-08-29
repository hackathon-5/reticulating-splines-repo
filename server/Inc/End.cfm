<cfscript>
if (request.js) {
	if (FileExists(request.dirName & request.jsName)) {
		echo('<script src="' & GetFileFromPath(request.jsName) & '"></script>' & request.LF) 
		//  & '?cache=' & TimeFormat(now(),'HHmmss.l')
	}
}
</cfscript>
</body>
</html>
