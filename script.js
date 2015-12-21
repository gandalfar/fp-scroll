jQuery(document).ready(function($) {
	var is_animating = false;

	$(document).on("mousewheel", function(event) {
		if ( event.deltaY > 0 ) {
			handleUp();
		} else if ( event.deltaY < 0 ) {

		}

	});

	
	$(document.body).hammer().on("pandown", function(ev) {
		handleUp();
	});

	var handleUp = function() {
		if ( is_animating ) {
			return;
		}

		is_animating = true;

		var windowHeight = $(window).height();

		if ( $('.section.visible').length > 1 ) {

			$('.section.visible').first().animate({
				top: windowHeight * -1,
			}, {
				duration: 1500,
				complete: function() {
					$(this).removeClass('visible');
					is_animating = false;
				}
			});
		} else {
			$('.section.visible').first().animate({
				top: windowHeight * -1,
			},
			{
				duration: 1500,
				queue: false,
				complete: function() {
					$(this).removeClass('visible');
					is_animating = false;
					$('.footer').css({height: 'auto', overflow: 'visible'});
				}
			});

		}

	};
});