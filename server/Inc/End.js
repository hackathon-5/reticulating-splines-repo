if ($.material) {
	$.material.init()
}

;(function() {
	// Web components will use the pseudo selector :unresolved
	$('.unresolved').fadeTo(400,1,resolved)
	function resolved() {
		$(this).removeClass('unresolved')
	}
})()
