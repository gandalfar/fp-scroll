jQuery(document).ready(function($) {
	var is_animating = false,
		animationSpeed = 700;

	var transitionSlideDown = function() {
		var windowHeight = $(window).height();
		is_animating = true;

		$('.section.visible')
			.eq(0)
			.velocity({
				top: -windowHeight,
			}, {
				duration: animationSpeed,
				queue: false,
				complete: function() {
					
					$(this).removeClass('visible').addClass('invisible');

					window.setTimeout(function(){
						is_animating = false;
					}, 500);
				}
			});

		$('.section.visible')
			.eq(1)
			.css({top: windowHeight })
			.velocity({
				top: 0,
				queue: false,
			}, {
				duration: animationSpeed
			});
	};

	var transitionSlideUp = function() {
		var windowHeight = $(window).height();
		is_animating = true;

		$('.section.invisible')
			.last()
			.css({
				top: -windowHeight
			})
			.velocity({
				top: 0,
			}, {
				duration: animationSpeed,
				queue: false,
				complete: function() {
					
					$(this).removeClass('invisible').addClass('visible');

					window.setTimeout(function(){
						is_animating = false;
					}, 500);
				}
			});

		$('.section.invisible')
			.next('.visible')
			.css({
				top: 0
			})
			.velocity({
				top: windowHeight,
			}, {
				queue: false,
				duration: animationSpeed,
				complete: function() {
					$(this).removeClass('invisible').addClass('visible');
				}
			});
	};

	var handleDown = function() {
		if ( is_animating ) {
			return;
		}

		if ( $('.section.visible').length > 1 ) {
			transitionSlideDown();
		} else if ( $('.section.visible').length === 1 ) {
			var windowHeight = $(window).height();
			is_animating = true;

			$('.section.visible')
				.eq(0)
				.velocity({
					top: windowHeight * -1,
				},
				{
					duration: animationSpeed,
					queue: false,
					complete: function() {
						$(this).removeClass('visible').addClass('invisible');
						
						$('.footer').css({
							height: 'auto',
							overflow: 'visible',
							position: 'static'
						});

						window.setTimeout(function(){
							is_animating = false;

							$('body').css({overflow:'visible'});
							console.log('end');
						}, 500);
					}
				});

			$('.footer')
				.css({top: windowHeight })
				.velocity({
					top: 0,
					queue: false,
				}, {
					duration: animationSpeed
				});
		}
	};

	var handleUp = function() {
		if ( is_animating ) {
			return;
		}

		var windowHeight = $(window).height();

		if ( $('.section.visible').length > 0 ) {
			transitionSlideUp();
		} else {
			if ( $(document).scrollTop() === 0 ) {
				is_animating = true;

				$('body')
					.css({overflow: 'hidden'});

				$('.footer')
					.css({
						top: 0,
						height: '100vh',
						overflow: 'hidden',
						position: 'absolute'
					})
					.velocity({
						top: windowHeight,
					}, {
						duration: animationSpeed,
						queue: false
					});


				$('.section.invisible')
					.last()
					.eq(0)
					.css({
						top: -windowHeight,
						height: '100vh'
					})
					.velocity({
						top: 0,
					},
					{
						duration: animationSpeed,
						queue: false,
						complete: function() {
							$(this).removeClass('invisible').addClass('visible');
							
							window.setTimeout(function(){
								is_animating = false;
							}, 500);
						}
					});
			}
		}
	};

	$(document).on("mousewheel", function(event) {
		if ( event.deltaY > 0 ) {
			handleUp();
		} else if ( event.deltaY < 0 ) {
			handleDown();
		}
	});

	
	$(document.body).hammer().on("panup", function(ev) {
		handleDown();
	});

	$(document.body).hammer().on("pandown", function(ev) {
		handleUp();
	});

});