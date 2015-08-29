(function() {
	var local = {}
	$(document).on('mouseenter', 'button[name="Delete"]', function() {
		$(this).addClass('btn-danger')
	})
	$(document).on('mouseleave', 'button[name="Delete"]', function() {
		$(this).removeClass('btn-danger')
	})
	$('table').not('.no-table').addClass('table')
	$('table').not('.no-table,.no-hover').addClass('table-hover')
	$('table').not('.no-table,.no-striped').addClass('table-striped')
	$('table').not('.no-table,.no-bordered').addClass('table-bordered')
	$('table').not('.no-table,.no-condensed').addClass('table-condensed')
//	$('table').not('.no-sortable').addClass('sortable')	
	$('textarea,input:text,input:password,select').not('.no-form-control').addClass('form-control')
	$('input[type=email],input[type=url]').addClass('form-control')
	$('form').attr('role','form')
	$('form>div').addClass('form-group')
	$('form label').addClass('control-label')

	$('button,.btn-lg,.btn-block,.btn-primary,.btn-success,.btn-info,.btn-warning,.btn-danger,.btn-link').addClass('btn')
	$('.btn-default').addClass('btn')
//	$('.btn').addClass('btn-lg')
	$('.no-lg').addClass('btn').removeClass('btn-lg')
	$('#Save,button[name=Save]').addClass('btn-primary')
//	$('.btn').not('.btn-success,.btn-primary,.btn-info,.btn-warning,.btn-danger,.btn-default').addClass('btn-success')

	$('section').addClass('row')

	// $('table').not('.no-table').addClass('table').wrap('<div class="table-responsive"></div>')
	// $('img').not('[hidden]').addClass('img-responsive') // img-rounded
	if (!$('form').attr('method')) {
		  $('form').attr('method','post')
	}

//	local.global = false
//	local.type = 'POST'
//	$.ajaxSetup(local)
	$('a').attr('target', changeTarget)
	function changeTarget() {
		if(this.host == location.host) {
			return '_self'
		} else {
			return '_blank'
		}
	}
})()


window.log = function(arg) {
	if (this.console) {
		// console.log(Array.prototype.slice.call(arguments)) //paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog
		console.log(arg)
	}
}

window.dom = {} // Document Object Model
dom.msg = $('#msg') // #msg is the text, .msg is the modifer
dom.main = $('main')

dom.failure = function(svc, SQLError) {
	// dom.msg.text(SQLError.message).addClass('label-danger')
	debugger
}

// Global ajax fail handler
dom.fail = function(xhr, status, response) {
	// For some reason, Firefox was throwing this error when I'd refresh the page, but
	// it would sail right through the debugger statement AND an alert box, so I'm just
	// going to ignore errors with empty responseTexts.
	if (response) {
		dom.msg.text(status + ': ' + response).addClass('label-warning')
	}
	if (xhr.responseText) {
		dom.main.html(xhr.responseText)
	}
}

$('.navbar').find('[name=Save]').addClass('btn-lg')