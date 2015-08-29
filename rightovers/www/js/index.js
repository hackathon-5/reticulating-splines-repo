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
//		local.beforeSend = function(xhr) {
//			xhr.setRequestHeader('Access-Control-Allow-Origin','*')
//		}
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
	$(document).on('click','#SaveUsrName',save)
	function save(response) {
		var local = {}
		
		response.preventDefault()
		local.url = 'http://52.21.111.70:8888/server/Usr/SaveUsrName.cfm'
		local.data = {}
		local.data.UsrName = $('#UsrName').val()
		local.data.telephoneNumber = app.telephoneNumber
		local.context = this
		result = $.ajax(local)
		result.fail(dom.fail)
		result.done(done)
	}
	function done(response) {
		console.log(response)
	}
})()

