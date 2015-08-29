<cfscript>
storedproc
	procedure='Usr.WhereTelephoneNumber' {
	procparam value=url.telephoneNumber;
	procresult name='Usr';
}
echo(Usr.Notify)
</cfscript>
