<cfoutput>
<cfif isDefined("session.Usr")>
	<div class="navbar-inverse">
		<div class="container">
			<div class="navbar-header">
				<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="##navbar" aria-expanded="false" aria-controls="navbar">
					<span class="sr-only">Toggle navigation</span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>
				<a class="navbar-brand glyphicon glyphicon-home" href="#request.home#"
				data-toggle="tooltip" data-placement="bottom"></a>
			</div>
			<div id="navbar" class="navbar-collapse collapse">
				<ul class="nav navbar-nav">
					<li><a href="#request.home#/Status.cfm">Status</a></li>
					<li class="dropdown">
						<a href="##" class="dropdown-toggle" data-toggle="dropdown">#session.Usr.UsrName# 
							<span class="caret"></span>
						</a>
						<ul class="dropdown-menu" role="menu">
							<li><a href="#request.home#/Profile/Profile.cfm">Profile</a></li>
							<li class="divider"></li>
							<li><a href="#request.home#/?logout">Logout</a></li>
						</ul>
					</li>
				</ul>
			</div>
		</div>
	</div>
<cfelse>
	<div class="navbar-inverse">
		<div class="container">
			<div class="navbar-header">
				<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="##navbar" aria-expanded="false" aria-controls="navbar">
					<span class="sr-only">Toggle navigation</span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>
				<a class="navbar-brand glyphicon glyphicon-home" href="http://hackathon.sparcedge.com/"
				data-toggle="tooltip" data-placement="bottom" title="Hackathon"></a>
			</div>
		</div>
	</div>
</cfif>
</cfoutput>