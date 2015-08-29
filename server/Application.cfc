component {
this.Name = 'PrairieDog'
this.dataSource = 'PhillipSenn'
this.SessionManagement = true
// this.sessionTimeout = CreateTimeSpan(0,0,45,0)
this.ScriptProtect = 'all'
this.currentTemplatePath = GetCurrentTemplatePath()
this.directoryFromPath   = GetDirectoryFromPath(this.currentTemplatePath)
this.mappings['/Inc'] = this.directoryFromPath & 'Inc' /* Without a trailing slash */

function onSessionStart() {
	session.msg = ''
	session.bootstrap.modifier = ''
}

function onRequestStart(LogCFCName) {
	if (isDefined('url.logout')) {
		StructDelete(session,'Usr')
	}
	setting showDebugOutput=false;
	request.msg = session.msg

	request.title='Prairie Dog' // Meerkat Manor
	request.home = '/PrairieDog' // without a trailing slash todo: use a variable here.
	request.css       = url.css       ?: true
	request.js        = url.js        ?: true
	request.bootstrap.value = url.bootstrap ?: true
	request.bootstrap.modifier = session.bootstrap.modifier // label-info, label-success, label-danger...
	request.bootstrap.theme = 'bootstrap-theme'
	request.bootstrap.row = true
	request.bootstrap.navbar_top = 'fixed'
	request.navbar    = url.navbar    ?: true
	request.bootstrap.progress	= url.Progress  ?: false
	request.bootstrap.container = url.container ?: true

	request.jQueryUI.value  = url.jQueryUI  ?: false
	request.jQueryUI.theme  = 'smoothness' // black-tie,blitzer,cupertino,dark-hive,dot-luv,eggplant,excite-bike,flick,hot-sneaks,humanity,le-frog,mint-choc,overcast,pepper-grinder,redmond,smoothness,south-street,start,sunny,swanky-purse,trontastic,ui-darkness,ui-lightness,vader
	request.LF = Chr(10)
	request.Save = '<button name="Save" type="submit">Save</button>'

	request.host = getPageContext().getRequest().getHeader('Host')
	request.servletPath = getPageContext().getRequest().getServletPath()
	request.dirName = GetDirectoryFromPath(request.servletPath)
	request.cgiName = Left(request.servletPath,Len(request.servletPath)-4) // remove .cfm
	request.cgiName = ListLast(request.cgiName,'/') // get the pgm name only
	request.cssName = request.cgiName & '.css'
	request.jsName  = request.cgiName & '.js'
	request.hashTag = Chr(35)
	request.unicode = {}
	request.unicode.heavyCheckMark = '&##10004;'
	if (isDefined('url.ID')) {
		StructDelete(session,'Usr')
		if (Len(url.ID) != 36) {
			request.msg = 'ID must be a length of 36'
		} else if (Mid(url.ID,09,1) != '-') {
			request.msg = 'Position 9 has to be a dash character.'
		} else if (Mid(url.ID,14,1) != '-') {
			request.msg = 'Position 14 has to be a dash character.'
		} else if (Mid(url.ID,19,1) != '-') {
			request.msg = 'Position 19 has to be a dash character.'
		} else if (Mid(url.ID,24,1) != '-') {
			request.msg = 'Position 24 has to be a dash character.'
		} else if (Find('--',url.ID)) {
			request.msg = 'Two dashes? Really?'
		} else {
			for (var i=1; i <= Min(36,Len(url.ID)); i++) {
				if (!Find(Mid(url.ID,i,1),'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-')) {
					request.msg = Mid(url.ID,i,1) & ' says what?'
				}
			}
		}
		if (request.msg == '') {
			storedproc procedure='Usr.WhereID' {
				procparam value=url.ID;
				procresult resultset=1 name='session.Usr';
			}
			if (NOT session.Usr.recordCount) {
				StructDelete(session,'Usr')
			}
		}
	}
	if (NOT isDefined('session.Usr')) {
		if (request.msg == '') {
			request.msg = 'You have been logged out.'
			request.bootstrap.modifier = 'label-danger'
		}
		include '/Inc/Login.cfm'
		return false
	}
}

function onRequestEnd(LogCFCName) {
	session.msg = ''
	session.bootstrap.modifier = ''
}
}
