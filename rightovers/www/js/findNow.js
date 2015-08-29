;(function() {
	$(document).on('click','#findNow',findNow)
	function findNow(response) {
		var local = {}
		
		local.dataType = 'json'
		local.url = 'http://52.21.111.70:8888/server/Food/FindNow.cfm'
		local.data = {}
		local.context = this
		result = $.ajax(local)
		result.fail(dom.fail)
		result.done(done)
	}
	function done(response) {
		var tr = ''
		console.log(response.DATA)
		
		for (var i=0; i< response.DATA.length; i++) {
			tr += '<tr>'
			tr += '	<td>' + response.DATA[i][1] + '</td>'
			tr += '	<td>' + response.DATA[i][2] + '</td>'
			tr += '</tr>'
		}
		$('tbody').html(tr)
	}
})()

