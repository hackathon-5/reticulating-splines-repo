<cfscript>
storedproc
	procedure='Usr.ToggleNotify' {
	procparam value=url.telephoneNumber;
	procresult name='Usr';
}
echo(Usr.Notify)
</cfscript>
