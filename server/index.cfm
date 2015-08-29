<cfscript>
if (IsDefined('form.Save')) {
	storedproc
		procedure='Food.[Save]' {
		procparam value=form.FoodID;
		procparam value=form.Qty;
	}
	request.msg = form.FoodID & ' for ' & form.Qty & ' has been posted!'
	request.bootstrap.modifier = 'label-info'
}

request.navbar = false
request.bootstrap.row = false
</cfscript>

<cfoutput>
<cfinclude template="/Inc/header.cfm">
<form>
	<cfinclude template="/Inc/Save.cfm">
	<h1>#request.title#</h1>
	<div class="row">
		<div class="col-sm-3 col-xs-12">
			<p>I found...</p>
			<select name="FoodID">
				<option value="1">Pizza</option>
				<option value="2">Sandwhich(es)</option>
				<option value="3">Taco</option>
			</select>	
			<p>Enough for</p>
			<select name="Qty">
				<option value="1">1</option>
				<option value="2">2</option>
				<option value="3">3</option>
				<option value="4">4</option>
				<option value="5">5</option>
			</select>
		</div>
	</div>
</form>
<cfinclude template="/Inc/footer.cfm">
</cfoutput>