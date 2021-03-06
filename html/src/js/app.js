var dispatch = {
	lockBody: function() {
		$('body').addClass('lockScroll');
		$('body').css({ 'paddingRight': getScrollBarWidth() });
	},

	unlockBody: function() {
		$('body').removeClass('lockScroll');
		$('body').css({ 'paddingRight': 0 });
	},

	forcusEffect: function () {
		if (!String.prototype.trim) {
			(function () {
				var c = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
				String.prototype.trim = function () {
					return this.replace(c, "")
				}
			})()
		}

		[].slice.call(document.querySelectorAll(".input__field")).forEach(function (c) {
			if (c.value.trim() !== "") {
				c.parentNode.classList.add('input--filled');
			}
			c.addEventListener("focus", a);
			c.addEventListener("blur", b)
		});

		function a(e) {
			e.target.parentNode.classList.add('input--filled');
		}

		function b(e) {
			if (e.target.value.trim() === "") {
				e.target.parentNode.classList.remove('input--filled');
			}
		}
	},

	common: function () {
		var scrollTop = parseInt($(window).scrollTop());
		if (scrollTop !== 0) {
			$("#mainHeader").addClass("sticky");
			$('#backtoTop').show();
		}

		$(window).scroll(function () {
			var scrollTop = parseInt($(window).scrollTop());
			if (scrollTop > 0) {
				$("#mainHeader").addClass("sticky");
				$('#backtoTop').show();
			} else {
				$("#mainHeader").removeClass("sticky");
				$("#mainHeader").removeAttr("style");
				$('#backtoTop').hide();
			}
		});

		$('.headerLinks li a, .mainFooter__content--item_menusLinks li a').click(function () {
			var href = $.attr(this, 'href');
			$('html, body').animate({
				scrollTop: $(href).offset().top - 0
			}, 500, function () {
				window.location.hash = href;
			});
			return false;
		});

		$('#backtoTop').click(function () {
			$('body, html').animate({ scrollTop: 0 }, 600);
		});

		// Scroll Height Calculator
		$(window).scroll(function () {
			var wintop = $(window).scrollTop(), docheight = $('html').height(), winheight = $(window).height();
			var totalScroll = (wintop / (docheight - winheight)) * 100;
			$(".scrollAnimate").css("width", totalScroll + "%");
		});

		// For bootstrap Modals only
		(function () {
			var isForgotModal = false;

			$('.open_OTP_CreateAccount').click(function () {
				$('.modal').modal('hide');
				isForgotModal = true;
			});

			// Default Modal Show Function
			$('.modal').on('show.bs.modal', function () {
				$('#mainHeader').css({ 'right': getScrollBarWidth() })
			});

			// Default Modal Hide Function
			$('.modal').on('hidden.bs.modal', function (e) {
				$('#mainHeader').css({ 'right': 0 });

				if (isForgotModal) {
					$('#modal_OTP_CreateAccount').modal('show');
				}
				isForgotModal = false;
			});
		})();

		// Toggle view of Filter box
		(function () {
			$('[data-filterView="toggle"]').click(function () {
				var target = this.dataset.targetid;
				this.className += ' show';

				if (this.textContent == 'Show Filter') {
					document.querySelector(target).closest('.showCaseBox').className += ' is-filterShow';
					this.textContent = 'Hide Filter';
					this.classList.remove('show');
				} else {
					document.querySelector(target).closest('.showCaseBox').classList.remove('is-filterShow');
					this.textContent = 'Show Filter';
					this.classList.add('show');
				}
			});
		})();

		(function () {
			if ($('.searchHandle')) {
				function closeSearch() {
					$('.header__logo, .primaryMenu, .headerLinks').removeClass('fadeOut');
					$('.searchBar').removeClass('fadeIn');
					$('.header__overlay').fadeOut(500);
					$('.autoSuggestion ul').removeClass('active');
				}

				$('.searchHandle').click(function () {
					$('.header__logo, .headerLinks, .primaryMenu').addClass('fadeOut');
					$('.searchBar').addClass('fadeIn');
					$('.header__overlay').fadeIn(500);
					$('#searchInput').focus();
					$('.autoSuggestion ul').addClass('active');
				});
				$('#searchClose, .header__overlay').click(function () {
					closeSearch();
				});

				$(document).on('keyup', function (e) {
					if (e.keyCode === 27 && e.which === 27) {
						closeSearch();
					}
				})
			}
		})();

		// dropdown toggle
		$('.dropdown-btn').click(function () {
			$('.dropdown-menu').toggleClass("show");
		});

		// Mobile Menu
		$('.menuHandle').click(function (e) {
			e.preventDefault();
			// $(this).find('img').attr('src', function (index, attr) {
			// 	var newAttr = attr.split('/');
			// 	var curImg = newAttr[newAttr.length - 1].split('.')[0];
			// 	var path = newAttr.slice(0, newAttr.length - 1).join('/');

			// 	if (curImg == 'menu-button') {
			// 		$(this).closest('.header__right').find('.headerLinks').slideDown(400);
			// 		return path + '/close.svg'
			// 	} else {
			// 		$(this).closest('.header__right').find('.headerLinks').slideUp(300);
			// 		return path + '/menu-button.svg'
			// 	}
			// });

			$("#mainHeader").find(".menuHandle").toggleClass("active");
			$("#mainHeader").find(".header__links").toggleClass("open");
		});

		// Mobile dropdown toggle
		$('.dropdown-handle').click(function () {
			var siblings = $(this).parents('li').siblings();
			siblings.find('.dropdown').slideUp();
			siblings.find('.dropdown-handle').removeClass('active');
			$(this).parents('li').find('.dropdown').slideToggle();
			$(this).toggleClass('active');
		});

		// Dashboard Sidebar toggle
		$('.dash-toggle').click(function () {
			$(this).parent('.userDashboard__leftNav').toggleClass("open");
			$('.footer').toggleClass("dash-opened");
		});

		$(".donateAmounts li .donateAmount").on("click", function () {
			$(".donateAmounts li .donateAmount").removeClass("selected");
			$(this).addClass("selected");
		});

		// $('.selectpicker').selectpicker();

		$(".donateAmount").click(function () {
			$(".donateModal__box:nth-child(2)").addClass("donateModal__box--fullWidth");
		});

		$("#supriseUsBtn").click(function () {
			$(".donateModal__box:nth-child(2)").toggleClass("donateModal__box--fullWidth");
		});

		$(".donateAmount").click(function () {
			$(".donateModal__box:nth-child(3)").removeClass("donateModal__box--show").addClass("donateModal__box--hide");
		});

		$("#supriseUsBtn").click(function () {
			$(".donateModal__box:nth-child(3)").toggleClass("donateModal__box--hide donateModal__box--show");
		});
	},

	homePage: function () {
		$('#categoriesSlider').slick({
			dots: true,
			arrows: false,
			speed: 500,
			autoplay: true,
			autoplaySpeed: 5000,
			infinite: true,
			slidesToShow: 5,
			slidesToScroll: 5,
			responsive: [
				{
					breakpoint: 1279,
					settings: {
						slidesToShow: 4,
						slidesToScroll: 4,
					}
				},
				{
					breakpoint: 1023,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 3,
					}
				},
				{
					breakpoint: 767,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 2,
					}
				},
				{
					breakpoint: 479,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
					}
				}
			]
		});

		$('#storiesSlider').slick({
			dots: true,
			arrows: false,
			speed: 500,
			autoplay: true,
			autoplaySpeed: 5000,
			infinite: true,
			slidesToShow: 1,
			slidesToScroll: 1
		});

		$('#topFundraiserSlider').slick({
			dots: true,
			arrows: false,
			speed: 500,
			autoplay: true,
			autoplaySpeed: 5000,
			infinite: true,
			slidesToShow: 4,
			slidesToScroll: 4,
			responsive: [
				{
					breakpoint: 1279,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 3,
					}
				},
				{
					breakpoint: 1023,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 2,
					}
				},
				{
					breakpoint: 767,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
					}
				}
			]
		});

		$('#upcomingEventsSlider').slick({
			dots: false,
			arrows: true,
			speed: 500,
			autoplay: true,
			autoplaySpeed: 5000,
			infinite: true,
			slidesToShow: 3,
			slidesToScroll: 3,
			responsive: [
				{
					breakpoint: 1023,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 2,
					}
				},
				{
					breakpoint: 767,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
					}
				}
			]
		});
	},

	startFundraiser: function () {
		$(document).ready(function () {
			$("#secondStep, #thirdStep, #fourthStep").hide();

			$("#nextSecondStep").click(function () {
				$("#firstStep, #thirdStep, #fourthStep").hide();
				$("#secondStep").show();
			});

			$("#nextThirdStep").click(function () {
				$("#firstStep, #secondStep, #fourthStep").hide();
				$("#thirdStep").show();
			});

			$("#nextFourthStep").click(function () {
				$("#firstStep, #secondStep, #thirdStep").hide();
				$("#fourthStep").show();
			});
		});
	},

	init: function () {
		this.forcusEffect();
		this.common();
		this.homePage();
		this.startFundraiser();
	}
};

$(window).load(() => {
	if (!document.querySelector('.siteLoaderWrap')) return;
	setTimeout(() => {
		$('body').removeClass('lockScroll');
		$('body').css({ 'paddingRight': 0 });
		$('.siteLoaderWrap').hide();
	}, 0);
});

$(document).ready(() => {
	$('body').addClass('lockScroll');
	$('body').css({ 'paddingRight': getScrollBarWidth() });
	dispatch.init();

	$(".aboutus__list ul li").on("mouseover", function () {
		$(".aboutus__list ul li").removeClass("selected");
	}).on("mouseleave", function () {
		$(".aboutus__list ul li:nth-child(2)").addClass("selected");
	});

	$('.btn.dropdown-toggle').click(function () {
		$(this).next('.dropdown-menu').toggleClass('open');
	});
});