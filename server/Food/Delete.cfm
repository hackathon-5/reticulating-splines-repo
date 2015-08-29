<cfscript>
storedproc
	procedure='Food.[Delete]' {
	procparam value=url.FoodID;
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
		svc.setBody(Food.FoodName & "'s all gone!")
		svc.setFrom('Phillip Senn<Phillip.Senn@my.lr.edu>')
		svc.setUserName('Phillip.Senn@my.lr.edu')
		svc.setPassword('lru2010!')
		svc.setPort(465)
		svc.setServer('smtp.gmail.com')
		svc.setTo('#Usr.telephoneNumber#@vtext.com')
		svc.setType('html')
		svc.setUseSSL(true)
//		svc.Send()
	}
}
</cfscript>
