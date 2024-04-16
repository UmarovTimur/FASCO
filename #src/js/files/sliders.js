/*
Документация по работе в шаблоне: 
Документация слайдера: https://swiperjs.com/
Сниппет(HTML): swiper
*/

// Подключаем слайдер Swiper из node_modules
// При необходимости подключаем дополнительные модули слайдера, указывая их в {} через запятую
// Пример: { Navigation, Autoplay }
// import Swiper, { Navigation, Autoplay } from 'swiper';
/*
Основниые модули слайдера:
Navigation, Pagination, Autoplay, 
EffectFade, Lazy, Manipulation
Подробнее смотри https://swiperjs.com/
*/

// Стили Swiper
// Базовые стили
// import "../../scss/base/swiper.scss";
// Полный набор стилей из scss/libs/swiper.scss
// import "../../scss/libs/swiper.scss";
// Полный набор стилей из node_modules
// import 'swiper/css';

import circleCursor from "./script.js";

function initSliders() {
	if (document.querySelector('.customers__slider')) {
		// Создаем слайдер
		const customersSlider = new Swiper('.customers__slider', {
			// Подключаем модули слайдера
			// для конкретного случая
			// modules: [Navigation],
			// observe: true,
			// observeParents: true,
			// Optional parameters
			slidesPerView: 1.01,
			centeredSlides: !0,
			// spaceBetween: 10,
			autoHeight: true,
			speed: 800,


			//touchRatio: 0,
			simulateTouch: false,
			loop: true,
			//preloadImages: false,
			//lazy: true,

			effect: 'coverflow',
			coverflowEffect: {
				rotate: 0,
				scale: 1,

				stretch: -1,
				depth: 6,
				modifier: 50,
				slideShadows: 0,

			},
			autoplay: {
				delay: 3000,
				disableOnInteraction: true,
			},

			/*
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
			*/

			// scrollbar: {
			// 	el: '.swiper-scrollbar',
			// 	draggable: true,
			// },

			// Кнопки "влево/вправо"
			navigation: {
				prevEl: '.customers__slider .swiper-button-prev',
				nextEl: '.customers__slider .swiper-button-next',
			},

			// Брейкпоинты
			breakpoints: {
				480: {
					slidesPerView: 1.1,

					coverflowEffect: {
						stretch: 6,
						depth: 2,
						modifier: 50,
						slideShadows: 0,
					},
				},
				768: {
					slidesPerView: 1.2,

					coverflowEffect: {
						stretch: 6,
						depth: 2,
						modifier: 50,
						slideShadows: 0,
					},
				},
				992: {
					slidesPerView: 1.2,

					coverflowEffect: {
						stretch: 6,
						depth: 2,
						modifier: 40,
					},
				},
				1460: {
					slidesPerView: 1.67,
					coverflowEffect: {

						stretch: 7,
						depth: 8,
						modifier: 50,
						slideShadows: 0,

					},
				}
			},
			// События
			on: {
				init: function () {
					document.querySelector(".customers__slider .swiper-button-prev").click();
				},
			}

		});


	}

	if (document.querySelector('#timerSlider')) {
		const customersSlider = new Swiper('#timerSlider', {

			autoHeight: false,
			parallax: true,
			spaceBetween: 24,
			slidesPerView: 2.1,
			loop: !0,
			speed: 800,

			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
			navigation: {
				prevEl: '.timer__slider-button-prev .swiper-button-prev',
				nextEl: '.timer__slider-button-next .swiper-button-next',
			},


			breakpoints: {
				480: {

				},
				768: {

				},
				992: {

				},
				1460: {
					allowTouchMove: false,

				}
			},
		});
	}
	const timerSliderItem = document.querySelector('.timer__slider-item');
	document.querySelector('.timer__slider-pagination').style.left = `${timerSliderItem.offsetWidth + 24}px`;

}
// Скролл на базе слайдера (по классу swiper_scroll для оболочки слайдера)
function initSlidersScroll() {
	let sliderScrollItems = document.querySelectorAll('.swiper_scroll');
	if (sliderScrollItems.length > 0) {
		for (let index = 0; index < sliderScrollItems.length; index++) {
			const sliderScrollItem = sliderScrollItems[index];
			const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar');
			const sliderScroll = new Swiper(sliderScrollItem, {
				observer: true,
				observeParents: true,
				direction: 'vertical',
				slidesPerView: 'auto',
				freeMode: {
					enabled: true,
				},
				scrollbar: {
					el: sliderScrollBar,
					draggable: true,
					snapOnRelease: false
				},
				mousewheel: {
					releaseOnEdges: true,
				},
			});
			sliderScroll.scrollbar.updateSize();
		}
	}
}

window.addEventListener("load", function (e) {
	// Запуск инициализации слайдеров
	initSliders();
	// Запуск инициализации скролла на базе слайдера (по классу swiper_scroll)
	//initSlidersScroll();
});