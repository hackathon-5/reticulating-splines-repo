var app = {
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function() {
        app.receivedEvent('deviceready');

        var telePlugin = cordova.require("cordova/plugin/telephonenumber");
        telePlugin.get(function(result) {
            console.log("Telephone number = " + result);
            app.telephoneNumber = result;
            $('.phone-number').text(result);
        }, function() {
            console.log("Error getting Telephone number");
            $('.phone-number').text("555-555-5555");
        });
        
        var compassOptions = { frequency: 10 };
        var watchID = navigator.compass.watchHeading(compassSuccess, null, compassOptions);
        watchLocation();
    },
    receivedEvent: function(id) {
        console.log('Received Event: ' + id);
    },
    telephoneNumber: "555-555-5555"
};


function doTriangle(degrees){
    $('.triangle').css('transform', 'rotate(' + (0 - degrees) + 'deg)' );
}

var compassSuccess = function(heading){
    doTriangle(heading.trueHeading);
}


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
		local.url = 'http://52.21.111.70:8888/server/Food/Save.cfm'
		local.data = {}
		local.data.FoodID = $('#FoodID').val()
		local.data.Qty = $('#Qty').val()
		local.context = this
		local.crossDomain = true
		result = $.ajax(local)
		result.fail(dom.fail)
		result.done(done)
	}
	function done(response) {
		console.log(response)
	}
})()


;(function() {
	var Variables = {}
	
	$(document).on('click','#btnFindNow',findNow)
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
		
		for (var i=0; i< response.DATA.length; i++) {
			tr += '<tr>'
			tr += '	<td>' + response.DATA[i][1] + '</td>'
			tr += '	<td>' + response.DATA[i][2] + '</td>'
			tr += '</tr>'
		}
		$('tbody').html(tr)
		Variables.token = setInterval(findNow,30000)
	}
//	clearTimeout(Variables.token) todo

})()

;(function() {
	$(document).on('click','#btnNotifyMe',ToggleNotify)
	function ToggleNotify(response) {
		var local = {}
		
		local.url = 'http://52.21.111.70:8888/server/Usr/ToggleNotify.cfm'
		local.data = {}
		local.data.telephoneNumber = app.telephoneNumber
		local.context = this
		result = $.ajax(local)
		result.fail(dom.fail)
		result.done(done)
	}
	function done(response) {
		if (response) {
			$('#notifyMe').find('h1').text('You will be notified.')
		} else {
			$('#notifyMe').find('h1').text('Notifications have been turned off.')
		}
	}
})()



app.initialize();
