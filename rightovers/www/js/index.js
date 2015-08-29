window.FoodID = 0
window.FoodLatitude = 0
window.FoodLongitude = 0

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
        
        var compassOptions = { frequency: 200 };
        var watchID = navigator.compass.watchHeading(compassSuccess, null, compassOptions);
        watchLocation();
    },
    receivedEvent: function(id) {
        console.log('Received Event: ' + id);
    },
    telephoneNumber: "555-555-5555"
};


function doTriangle(degrees){
    var last = $('.triangle').data('last-degrees');
    if(!last) last = 0;
    last = +last;
    
    while(180 + last < degrees) {
        degrees -= 360;
    }
    
    while(180 + degrees < last) {
        degrees += 360;
    }
    
    $('.triangle').css('transform', 'rotate(' + (degrees) + 'deg)' );
    $('.triangle').data('last-degrees', degrees);
}

var compassSuccess = function(heading){

    var yDifference = window.FoodLatitude - mikeLocation.lat;
    var xDifference = window.FoodLongitude - mikeLocation.long;
    var desiredAbsoluteAngle = Math.atan2(xDifference, yDifference) * 180 / Math.PI;

    var desiredRotate = desiredAbsoluteAngle - heading.trueHeading;

    doTriangle(desiredRotate);
}


var dom = {}
dom.msg = $('.msg')
dom.Qty = $('#Qty')

dom.fail = function(xhr, status, response) {
	dom.msg.text(status + ': ' + response)
	if (xhr.responseText) {
		$('body').html(xhr.responseText)
	}
}

;(function() {
	$(document).on('click','#Save',getPosition)
	function getPosition() {
		navigator.geolocation.getCurrentPosition(save,showError)
	}
	function showError(error) {
		var local = {}
		local.coords = {}
		local.coords.latitude = 0
		local.coords.longitude = 0
		save(local)
		/*
		 switch(error.code) {
			  case error.PERMISSION_DENIED:
					dom.msg.text("User denied the request for Geolocation.")
					break;
			  case error.POSITION_UNAVAILABLE:
					dom.msg.text("Location information is unavailable.")
					break;
			  case error.TIMEOUT:
					dom.msg.text("The request to get user location timed out.")
					break;
			  case error.UNKNOWN_ERROR:
					dom.msg.text(x.innerHTML = "An unknown error occurred.")
					break;
		 }
		 */
	}

	function save(response) {
		var local = {}
		
		local.type = 'get'
		local.url = 'http://52.21.111.70:8888/server/Food/Save.cfm'
		local.data = {}
		local.data.FoodName = $('#newFood').val()
		local.data.Qty = $('#Qty').val()
		local.data.RoomNumber = $('#RoomNumber').val()
		local.data.latitude = response.coords.latitude
		local.data.longitude = response.coords.longitude
		result = $.ajax(local)
		result.fail(dom.fail)
		result.done(done)
	}
	function done(response) {
		$.mobile.navigate('#thanks')
	}
})()


;(function() {
	var Variables = {}
	
	$(document).on('click','#btnFindNow',findNow)
	$('#findNow').on( "pageshow", findNow)
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
		// [0] = FoodID
		// [1] = FoodName
		// [2] = RoomNumber
		// [3] = Qty
		// [4] = FoodLatitude
		// [5] = FoodLongitude
		var tr = ''
		
		for (var i=0; i< response.DATA.length; i++) {
			tr += '<tr data-foodid="' + response.DATA[i][0] + '"'
			tr += ' data-foodlatitude="' + response.DATA[i][4] + '"'
			tr += ' data-foodlongitude="' + response.DATA[i][5] + '"'
			tr += '>'
			tr += '	<td>There are ' + response.DATA[i][1] + ' for ' + response.DATA[i][3] + ' people.</td>'
			tr += '	<td>'
			tr += '	<a class="googleWallet" data-roomnumber="' + response.DATA[i][2] + '" data-role="button" data-inline="true" href="#navigation">'
			tr += '	<img src="img/google_wallet_icon.png" width="80">Unlock location'
			tr +=	'	</a></td>'
			tr += '</tr>'
		}
		$('tbody').html(tr).trigger('create')
//		Variables.token = setInterval(findNow,30000)
	}
//	clearTimeout(Variables.token) todo

})()

;(function() {
	$(document).on('click','#btnNotify',ToggleNotify)
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
		if (parseInt(response,10)) {
			$('#notifyMe').find('h2').text('You will be notified.')
            $('#btnNotify img').attr('src', 'img/tick7.png')
		} else {
			$('#notifyMe').find('h2').text('Notifications have been turned off.')
            $('#btnNotify img').attr('src', 'img/circle179.png')
		}
	}
})()

$('.food-type-container button').click(function(event) {
    $('#newFood').val($(this).data('food'));
});

$(document).on('click','.food-quantity-container .ui-block-a button',blockA)
function blockA() {
	dom.Qty.val(1)
	$('.food-quantity-container').find('button').buttonMarkup({theme: 'a'});
	$(this).buttonMarkup({theme: 'b'});
}
$(document).on('click','.food-quantity-container .ui-block-b button',blockB)
function blockB() {
	dom.Qty.val(2)
	$('.food-quantity-container').find('button').buttonMarkup({theme: 'a'});
	$(this).buttonMarkup({theme: 'b'});
}
$(document).on('click','.food-quantity-container .ui-block-c button',blockC)
function blockC() {
	dom.Qty.val(3)
	$('.food-quantity-container').find('button').buttonMarkup({theme: 'a'});
	$(this).buttonMarkup({theme: 'b'});
}
$(document).on('click','#findNow .googleWallet',googleWallet)
function googleWallet() {
	var RoomNumber = $(this).data('roomnumber')
	window.FoodID = $(this).closest('tr').data('foodid')
	window.FoodLatitude = $(this).closest('tr').data('foodlatitude')
	window.FoodLongitude = $(this).closest('tr').data('foodlongitude')
	$('#navigation h2').text('Room ' + RoomNumber)
	$('#navigation .roomnumber').val(RoomNumber)
}


;(function() {
	$(document).on('click','#navigation a.thanks', decrementQty);
	function decrementQty() {
		var local = {}
		
		local.url = 'http://52.21.111.70:8888/server/Food/decrementQty.cfm'
		local.data = {}
		local.data.FoodID = window.FoodID
		result = $.ajax(local)
		result.fail(dom.fail)
		result.done(done)
	}
	function done(response) {
		$.mobile.navigate('#main')
	}
})()

;(function() {
	$(document).on('click','.allgone', deleteAndNotify);
	function deleteAndNotify(){
		var local = {}
		
		local.url = 'http://52.21.111.70:8888/server/Food/Delete.cfm'
		local.data = {}
		local.data.FoodID = window.FoodID
		result = $.ajax(local)
		result.fail(dom.fail)
		result.done(done)
	}
	function done(response) {
		$.mobile.navigate('#main')
	}
})()


app.initialize();
