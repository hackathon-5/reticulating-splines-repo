<cfoutput>
<cfif request.bootstrap.progress>
	<div class="progress pull-left progress-spacer" style="width:#(100-Paper.PctComplete)/2#%">&nbsp;</div>
	<div class="progress"> <!--  active progress-striped -->
		<div class="progress-bar progress-bar-primary" style="width: #Paper.PctComplete#%">#Int(Paper.PctComplete)#%</div>
	</div>
</cfif>
</cfoutput>