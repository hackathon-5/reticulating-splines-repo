<cfscript>
storedproc
	procedure='Usr.[Where]' {
	procresult name='Usr';
}

</cfscript>

<cfoutput>
<cfinclude template="/Inc/header.cfm">
<table>
	<thead>
		<tr>
			<th>Person</th>
		</tr>
	</thead>
	<tbody>
		<cfloop query="Usr">
			<tr>
				<td><a href="#request.home#/?ID=#ID#">#UsrName#</a></td>
			</tr>
		</cfloop>
	</tbody>
</table>

<cfinclude template="/Inc/footer.cfm">
</cfoutput>