<cfscript>
echo('<nav class="navbar navbar-#request.bootstrap.navbar_top#-top">' & request.LF)  // I'll have to change the css, too.
include '/Inc/navbar.cfm'
echo('	<div class="navbar-default">' & request.LF)
if (request.msg == '') {
	echo('		<div class="msg container borderRightRadius">' & request.LF)
	echo('			<div class="pull-right">' & request.Save & '</div>')
	echo('			<div id="msg"></div>' & request.LF)
} else {
	echo('		<div class="msg container borderRightRadius ' & request.bootstrap.modifier & '">' & request.LF)
	echo('			<div class="pull-right">' & request.Save & '</div>')
	echo('			<div id="msg">' & request.msg & '</div>' & request.LF)
}
echo('		</div>')
echo('	</div>')
include '/Inc/progress.cfm'
echo('	</div>' & request.LF)
echo('</nav>' & request.LF)
</cfscript>