<cfscript>
storedproc
	procedure='Food.[Save]' {
	procparam value=url.FoodID;
	procparam value=url.Qty;
}
storedproc
	procedure='Usr.[Where]' {
	procresult name='Usr';
}
loop query=Usr {
	svc = new mail()
	svc.setSubject('Prairie Dog')
	svc.setBody("There's food available for " & url.Qty & " people.")
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
</cfscript>
