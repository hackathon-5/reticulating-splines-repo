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
dom.Qty = $('#Qty')
dom.FoodID = $('#FoodID')

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
		local.type = 'post'
		local.url = 'http://52.21.111.70:8888/server/Food/Save.cfm'
		local.data = {}
		local.data.FoodName = $('#newFood').val()
		local.data.Qty = $('#Qty').val()
		local.data.RoomNumber = $('#RoomNumber').val()
		local.context = this
		local.crossDomain = true
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
		var tr = ''
		
		for (var i=0; i< response.DATA.length; i++) {
			tr += '<tr data-foodid="' + response.DATA[i][0] + '">'
			tr += '	<td>There are ' + response.DATA[i][1] + ' for ' + response.DATA[i][3] + ' people.</td>'
			tr += '	<td>'
			tr += '	<a class="googleWallet" data-roomnumber="' + response.DATA[i][2] + '" data-role="button" data-inline="true" href="#navigation">'
			tr += '	<img src="img/google_wallet_icon.png" width="80">Unlock location'
			tr +=	'	</a></td>'
			tr += '</tr>'
		}
		$('tbody').html(tr).trigger('create')
		Variables.token = setInterval(findNow,30000)
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
	var FoodID = $(this).data('foodid')
	$('#navigation h2').text('Room ' + RoomNumber)
	$('#navigation .roomnumber').val(RoomNumber)
	dom.FoodID.val(FoodID) // Put it into a global scope to be used when the user presses 'All gone'
}
$(document).on('click','#navigation a.allgone', deleteAndNotify);
function deleteAndNotify(){
	var local = {}
	
	local.url = 'http://52.21.111.70:8888/server/Food/Delete.cfm'
	local.data = {}
	local.data.FoodID = dom.FoodID.val()
	result = $.ajax(local)
	result.fail(dom.fail)
	result.done(done)
	function done(response) {
		$.mobile.navigate('#main')
	}
}
$(document).on('click','#navigation a.thanks', decrementFoodQuantity);
function decrementFoodQuantity(){
    // send post request please
    var RoomNumber = $('#navigation .roomnumber').val();
    debugger;
}



app.initialize();
