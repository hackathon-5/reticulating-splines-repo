<cfscript>
storedproc
	procedure='Food.[Save]' {
	procparam value=url.FoodName;
	procparam value=url.Qty;
	procparam value=url.RoomNumber;
	procparam value=url.Latitude;
	procparam value=url.Longitude;
	procresult name='Food';
}
storedproc
	procedure='Usr.[Where]' {
	procresult name='Usr';
}
loop query=Usr {
	if (Notify) {
		svc = new mail()
		svc.setSubject('Prairie Dog')
		svc.setBody("There's " & url.FoodName & " available for " & url.Qty & " people.")
		svc.setFrom('Phillip Senn<Phillip.Senn@my.lr.edu>')
		svc.setUserName('Phillip.Senn@my.lr.edu')
		svc.setPassword('lru2010!')
		svc.setPort(465)
		svc.setServer('smtp.gmail.com')
		svc.setTo('#Usr.telephoneNumber#@vtext.com')
		svc.setType('html')
		svc.setUseSSL(true)
		svc.Send()
	}
}
</cfscript>
