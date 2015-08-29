<cfscript>
storedproc
	procedure='Food.FindNow' {
	procresult name='Food';
}
echo(SerializeJSON(Food))
</cfscript>
