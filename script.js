jQuery(document).ready(function($) {
	var is_animating = false;

	$(document).on("mousewheel", function(event) {
		var windowHeight = $(window).height();
		
		if ( event.deltaY > 0 ) {
		// scrolling up

		$('.section-first').animate({
			top: windowHeight * -1,
		}, 1000);

		} else if ( event.deltaY < 0 ) {
		//scrolling down

		}

	});
});