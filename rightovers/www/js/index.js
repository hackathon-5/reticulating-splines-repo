var app = {
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    receivedEvent: function(id) {
        console.log('Received Event: ' + id);
    }
};

var dom = {}
dom.msg = $('.msg')
dom.fail = function(xhr, status, response) {
	dom.msg.text(status + ': ' + response)
	if (xhr.responseText) {
		$('body').html(xhr.responseText)
	}
}

;(function() {
	$(document).on('click','#Save',save)
	function save(response) {
		var local = {}
		
		response.preventDefault()
		local.url = 'Food/Save.cfm'
		local.data = {}
		local.data.FoodID = $('#FoodID').val()
		local.data.Qty = $('#Qty').val()
		local.context = this
		result = $.ajax(local)
		result.fail(dom.fail)
		result.done(done)
	}
	function done(response) {
		console.log(response)
	}
})()

