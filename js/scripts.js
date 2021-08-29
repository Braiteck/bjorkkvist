$(() => {
	// Основной слайдер на главной
	if ($('.main_slider .swiper-container').length) {
		new Swiper('.main_slider .swiper-container', {
			loop: true,
			speed: 750,
			watchSlidesVisibility: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			spaceBetween: 0,
			slidesPerView: 1,
			autoplay: {
				delay: 3000,
			},
			pagination: {
				el: '.swiper-pagination',
				type: 'bullets',
				clickable: true,
				bulletActiveClass: 'active'
			}
		})
	}


	// Карусель категорий
	if ($('.categories_slider .swiper-container').length) {
		new Swiper('.categories_slider .swiper-container', {
			loop: true,
			speed: 500,
			watchSlidesVisibility: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			spaceBetween: 20,
			slidesPerView: 1,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			pagination: {
				el: '.swiper-pagination',
				type: 'bullets',
				clickable: true,
				bulletActiveClass: 'active'
			}
		})
	}


	// Блог
	if ($('.articles_block .swiper-container').length) {
		new Swiper('.articles_block .swiper-container', {
			loop: true,
			speed: 500,
			watchSlidesVisibility: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			spaceBetween: 20,
			slidesPerView: 1,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			pagination: {
				el: '.swiper-pagination',
				type: 'bullets',
				clickable: true,
				bulletActiveClass: 'active'
			}
		})
	}


	// Товары
	if ($('.products .swiper-container').length) {
		let sliders = []

		$('.products .swiper-container').each(function (i) {
			let slides = $(this).find('.slide').length,
				this_ID = $(this).attr('id'),
				options = {
					loop: false,
					speed: 500,
					watchSlidesVisibility: true,
					slideActiveClass: 'active',
					slideVisibleClass: 'visible',
					navigation: {
						nextEl: '.swiper-button-next',
						prevEl: '.swiper-button-prev'
					},
					breakpoints: {
						0: {
							spaceBetween: 12,
							slidesPerView: 2
						},
						480: {
							spaceBetween: 16,
							slidesPerView: 2
						},
						768: {
							spaceBetween: 20,
							slidesPerView: 3
						},
						1024: {
							spaceBetween: 24,
							slidesPerView: 3
						},
						1188: {
							spaceBetween: 40,
							slidesPerView: 3
						}
					},
					on: {
						init: swiper => {
							setTimeout(() => {
								productHeight($(swiper.$el), $(swiper.$el).find('.product').length)

								let thumbH = $(swiper.$el).find('.thumb').outerHeight()

								$(swiper.$el).find('.swiper-button-prev').css('top', thumbH / 2)
								$(swiper.$el).find('.swiper-button-next').css('top', thumbH / 2)
							})
						},
						resize: swiper => {
							setTimeout(() => {
								productHeight($(swiper.$el), $(swiper.$el).find('.product').length)

								let thumbH = $(swiper.$el).find('.thumb').outerHeight()

								$(swiper.$el).find('.swiper-button-prev').css('top', thumbH / 2)
								$(swiper.$el).find('.swiper-button-next').css('top', thumbH / 2)
							})
						}
					}
				}

			sliders[i] = new Swiper('#' + this_ID, options)

			if (slides > sliders[i].params.slidesPerView) {
				options.loop = true
				sliders[i].destroy(true, true)
				sliders[i] = new Swiper('#' + this_ID, options)
			}
		})
	}


	// Рекомендуемые категории
	if ($('.recommended_categories .swiper-container').length) {
		new Swiper('.recommended_categories .swiper-container', {
			loop: true,
			speed: 500,
			watchSlidesVisibility: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			breakpoints: {
				0: {
					spaceBetween: 12,
					slidesPerView: 1,
				},
				480: {
					spaceBetween: 16,
					slidesPerView: 2,
				},
				768: {
					spaceBetween: 24,
					slidesPerView: 2,
				},
				1024: {
					spaceBetween: 24,
					slidesPerView: 3,
				},
				1188: {
					spaceBetween: 30,
					slidesPerView: 3,
				}
			},
			on: {
				init: swiper => {
					setTimeout(() => {
						let thumbH = $(swiper.$el).find('.thumb').outerHeight()

						$(swiper.$el).find('.swiper-button-prev').css('top', thumbH / 2)
						$(swiper.$el).find('.swiper-button-next').css('top', thumbH / 2)
					})
				},
				resize: swiper => {
					setTimeout(() => {
						let thumbH = $(swiper.$el).find('.thumb').outerHeight()

						$(swiper.$el).find('.swiper-button-prev').css('top', thumbH / 2)
						$(swiper.$el).find('.swiper-button-next').css('top', thumbH / 2)
					})
				}
			}
		})
	}


	// Страница товара
	if ($('.product_info .images').length) {
		const productSlider = new Swiper('.product_info .images .big .swiper-container', {
			loop: false,
			speed: 500,
			watchSlidesVisibility: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			spaceBetween: 24,
			slidesPerView: 1,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			on: {
				slideChange: swiper => {
					setTimeout(() => {
						$('.product_info .images .thumbs button').removeClass('active')
						$('.product_info .images .thumbs button').eq(swiper.activeIndex).addClass('active')
					})
				}
			}
		})

		$('.product_info .images .thumbs button').click(function (e) {
			e.preventDefault()

			productSlider.slideTo($(this).data('slide-index'), 500)
		})
	}


	// Страница товара - выбор цвета
	$('.product_info .data .color label').click(function () {
		let colorName = $(this).data('name')

		$('.product_info .data .color .selected').text(colorName)
	})


	// Смена города
	$('header .location .dropdown button').click(function (e) {
		e.preventDefault()

		$('header .location .link u').text($(this).text())
	})


	// Товар в/из избранно(е/го)
	$('.product .favorite .btn, .product_info .favorite .btn').click(function (e) {
		e.preventDefault()

		$(this).toggleClass('active')
	})


	// Изменение количества товара
	$('body').on('click', '.amount .minus', function (e) {
		e.preventDefault()

		const $parent = $(this).closest('.amount'),
			$input = $parent.find('.input'),
			inputVal = parseFloat($input.val()),
			minimum = parseFloat($input.data('minimum')),
			step = parseFloat($input.data('step')),
			unit = $input.data('unit')

		if (inputVal > minimum) $input.val(inputVal - step + unit)
	})

	$('body').on('click', '.amount .plus', function (e) {
		e.preventDefault()

		const $parent = $(this).closest('.amount'),
			$input = $parent.find('.input'),
			inputVal = parseFloat($input.val()),
			maximum = parseFloat($input.data('maximum')),
			step = parseFloat($input.data('step')),
			unit = $input.data('unit')

		if (inputVal < maximum) $input.val(inputVal + step + unit)
	})

	$('.amount .input').keydown(function () {
		const _self = $(this),
			maximum = parseInt(_self.data('maximum'))

		setTimeout(() => {
			if (_self.val() == '' || _self.val() == 0) _self.val(parseInt(_self.data('minimum')))
			if (_self.val() > maximum) _self.val(maximum)
		})
	})


	// Моб. меню
	$('header .mob_menu_btn').click((e) => {
		e.preventDefault()

		$('header .mob_menu_btn').addClass('active')
		$('body').addClass('menu_open')
		$('header .menu').addClass('show')
		$('.overlay').fadeIn(300)
	})

	$('header .menu > .close, .overlay').click((e) => {
		e.preventDefault()

		$('header .mob_menu_btn').removeClass('active')
		$('body').removeClass('menu_open')
		$('header .menu').removeClass('show')
		$('.overlay').fadeOut(300)
	})


	// Отправка форм
	$('body').on('submit', 'form.custom_submit', function (e) {
		e.preventDefault()

		Fancybox.close()

		Fancybox.show([{
			src: '#success_modal',
			type: 'inline'
		}])
	})
})



$(window).on('load', () => {
	// Выравнивание элементов в сетке
	$('.products .row').each(function () {
		productHeight($(this), parseInt($(this).css('--products_count')))
	})
})



$(window).resize(() => {
	// Выравнивание элементов в сетке
	$('.products .row').each(function () {
		productHeight($(this), parseInt($(this).css('--products_count')))
	})
})



// Выравнивание товаров
function productHeight(context, step) {
	let start = 0,
		finish = step,
		$products = context.find('.product')

	$products.find('.product_name').height('auto')

	$products.each(function () {
		setHeight($products.slice(start, finish).find('.product_name'))

		start = start + step
		finish = finish + step
	})
}