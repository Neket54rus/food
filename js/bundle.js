/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {
	const result = document.querySelector(".calculating__result span")

	let sex, height, weight, age, ratio

	if (localStorage.getItem("sex")) {
		sex = localStorage.getItem("sex")
	} else {
		sex = "female"
		localStorage.setItem("sex", "female")
	}

	if (localStorage.getItem("ratio")) {
		ratio = localStorage.getItem("ratio")
	} else {
		ratio = 1.375
		localStorage.setItem("ratio", 1.375)
	}

	function initLocalSettings(selector, activeClass) {
		const elem = document.querySelectorAll(selector)

		elem.forEach((item) => {
			item.classList.remove(activeClass)
			if (item.getAttribute("data-ratio") == localStorage.getItem("ratio")) {
				item.classList.add(activeClass)
			}

			if (item.getAttribute("id") == localStorage.getItem("sex")) {
				item.classList.add(activeClass)
			}
		})
	}
	initLocalSettings(".calculating__choose div", "calculating__choose-item_active")
	initLocalSettings(".calculating__choose_big div", "calculating__choose-item_active")

	function calcTotal() {
		if (!sex || !height || !weight || !age || !ratio) {
			result.textContent = "____"
			return
		}

		if (sex == "female") {
			result.textContent = Math.round((447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio)
		} else {
			result.textContent = Math.round((88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio)
		}
	}
	calcTotal()

	function getStaticInformation(parentSelector, activeClass) {
		const elements = document.querySelectorAll(`${parentSelector} div`)

		elements.forEach((item) => {
			item.addEventListener("click", (e) => {
				if (e.target.getAttribute("data-ratio")) {
					ratio = +e.target.getAttribute("data-ratio")
					localStorage.setItem("ratio", ratio)
				} else {
					sex = e.target.getAttribute("id")
					localStorage.setItem("sex", sex)
				}

				elements.forEach((item) => item.classList.remove(activeClass))
				e.target.classList.add(activeClass)

				calcTotal()
			})
		})
	}
	getStaticInformation("#gender", "calculating__choose-item_active")
	getStaticInformation(".calculating__choose_big", "calculating__choose-item_active")

	function getDinamicInformation(selector) {
		const input = document.querySelector(selector)

		input.addEventListener("input", () => {
			if (input.value.match(/\D/g)) {
				input.value = input.value.replace(/\D/g, "")
			}

			switch (input.getAttribute("id")) {
				case "height":
					height = +input.value
					break
				case "weight":
					weight = +input.value
					break
				case "age":
					age = +input.value
					break
			}

			calcTotal()
		})
	}
	getDinamicInformation("#height")
	getDinamicInformation("#weight")
	getDinamicInformation("#age")
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);


/***/ }),

/***/ "./js/modules/card.js":
/*!****************************!*\
  !*** ./js/modules/card.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function card() {
	//создание класса
	class Card {
		//конструктор принимает в себя пусть к фото, заголовок, описание, цену и селектор родителя
		constructor(img, title, descr, price, parentSelector) {
			this.img = img //получаем путь
			this.title = title //получаем заголовок
			this.descr = descr //получаем описание
			this.price = price //получаем цену
			this.parent = document.querySelector(parentSelector) //получаем родителя
			this.changeUsd() //функция по переводу из usd в rub
		}

		//метод по переводу из usd в rub
		changeUsd() {
			this.price = this.price * 100 //нашу цену умножаем на 100 и записываем в нашу цену
		}

		//метод по созданию сарты
		createCard() {
			//вставляем в родителя нашу верстку
			this.parent.innerHTML += `
				<div class="menu__item">
					<img src="${this.img}" alt="vegy" />
					<h3 class="menu__item-subtitle">${this.title}</h3>
					<div class="menu__item-descr">
						${this.descr}
					</div>
					<div class="menu__item-divider"></div>
					<div class="menu__item-price">
						<div class="menu__item-cost">Цена:</div>
						<div class="menu__item-total"><span>${this.price}</span> руб/день</div>
					</div>
				</div>
			`
		}
	}

	(0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)("http://localhost:3000/menu").then((res) => {
		res.forEach(({ img, title, descr, price }) => {
			new Card(img, title, descr, price, ".menu__field .container").createCard()
		})
	})
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (card);


/***/ }),

/***/ "./js/modules/form.js":
/*!****************************!*\
  !*** ./js/modules/form.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function form() {
	const forms = document.querySelectorAll("form") // получение всех форм на странице
	const modalWindow = document.querySelector(".modal")

	//содаем объект с ответами для пользователя
	const message = {
		load: "img/form/spinner.svg",
		success: "Спасибо! Мы скоро с вами свяжемся!",
		fail: "Произошла ошибка, попробуйте позже(",
	}

	//Функция по показу модального окна после отправки. Функция принимает в себя сообщение для пользователя
	function showThanksModal(message) {
		const prevModalDialog = document.querySelector(".modal__dialog") //получаем внутренности модального окна

		prevModalDialog.classList.add("hide") //скрываем его
		modalWindow.style.display = "block" //устанавилваем модальному окну display в block тем самым показываем модальное окно
		document.body.style.overflow = "hidden" //убираем возможность прокрутки

		//создаем блок для текста
		const thanksModal = document.createElement("div")
		thanksModal.classList.add("modal__dialog") //даем класс как у внутреннего модального окна
		//вставляем верствку
		thanksModal.innerHTML = `
			<div class="modal__content">
				<div class="modal__close">&times;</div>
				<div class="modal__title">${message}</div>
			</div>
		`

		document.querySelector(".modal").append(thanksModal) //вставляем в модальное окно

		// таймер на удаление модального окна
		setTimeout(() => {
			thanksModal.remove()
			prevModalDialog.classList.remove("hide")
			prevModalDialog.classList.add("show")

			modalWindow.style.display = "none" //показываем модальное окно
			document.body.style.overflow = "" //включаем возможность прокрутки
		}, 4000)
	}

	//функция отправки данных. Функция принимает в себя форму, с которой нужно отправить данные
	function postForm(form) {
		//устанавливаем обраотчик на кнопку отправки формы
		form.addEventListener("submit", (e) => {
			e.preventDefault() //убираем перезагрузку страницы

			// создаем переменную со спиннером
			const statusMessage = document.createElement("img")
			// присваиваем путь к спиннеру
			statusMessage.src = message.load
			//ставим по центру
			statusMessage.style.cssText = `
				display: block;
				margin: 0 auto;
			`
			//вставляем в форму
			form.insertAdjacentElement("afterend", statusMessage)

			const formData = new FormData(form) //создаем объект со значениями из формы
			console.log(formData)
			// настройки для json
			const json = JSON.stringify(Object.fromEntries(formData.entries()))
			console.log(json)

			;(0,_services_services__WEBPACK_IMPORTED_MODULE_0__.postData)("http://localhost:3000/requests", json)
				.then((response) => {
					console.log(response) // показываем данные в консоле
					showThanksModal(message.success) //показываем модальное окно с успехом
					statusMessage.remove() //удаляем модальное окно с спинером
				})
				.catch(() => {
					showThanksModal(message.fail) // при ошибке выводим блок с ошибкой
				})
				.finally(() => {
					form.reset() // в любом случае обнуляем форму
				})
		})
	}

	//перебираем се формы на странице и запускаем функцию на каждую из них
	forms.forEach((item) => {
		postForm(item)
	})
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (form);


/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function modal() {
	const modalWindow = document.querySelector(".modal") //получаем модальное окно со страницы
	const modalBtn = document.querySelectorAll("[data-modal]") //получаем кнопки для открытия модального окна
	const modalCloseBtn = document.querySelector(".modal__close") //получаем кнопку для закрытия модалки

	//перебираем все кнопки выводим каждую отдельно
	modalBtn.forEach((btn) => {
		//на каждую кнопку навешиваем клик
		btn.addEventListener("click", () => {
			modalWindow.style.display = "block" //устанавилваем модальному окну display в block тем самым показываем модальное окно
			document.body.style.overflow = "hidden" //убираем возможность прокрутки
			clearInterval(modalTimer) //отключаем показ модального окна через время, если пользователь сам открыл его
		})
	})

	//навешиваем обработчик клика на модальное окно
	modalWindow.addEventListener("click", (e) => {
		//условие: если элемент на который мы нажали имеет класс modal или modal__close, то закрываем модальное окно
		if (e.target == modalWindow || e.target == modalCloseBtn || e.target.classList.contains("modal__close")) {
			modalWindow.style.display = "none" //показываем модальное окно
			document.body.style.overflow = "" //включаем возможность прокрутки
		}
	})

	//убираем модальное окна при нажатии на esc
	document.addEventListener("keydown", (e) => {
		if (e.code === "Escape" && window.getComputedStyle(modalWindow).display == "block") {
			modalWindow.style.display = "none" //показываем модальное окно
			document.body.style.overflow = "" //включаем возможность прокрутки
		}
	})

	//Установка интервала на открытие модального окна
	const modalTimer = setInterval(() => {
		modalWindow.style.display = "block" //устанавилваем модальному окну display в block тем самым показываем модальное окно
		document.body.style.overflow = "hidden" //убираем возможность прокрутки
	}, 50000)

	function showModalByScroll() {
		if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
			modalWindow.style.display = "block" //устанавилваем модальному окну display в block тем самым показываем модальное окно
			document.body.style.overflow = "hidden" //убираем возможность прокрутки
			window.removeEventListener("scroll", showModalByScroll)
		}
	}

	window.addEventListener("scroll", showModalByScroll)
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);


/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider({ container, slideSelector, nextArrowSelector, prevArrowSelector, totalCounterSelector, currentSelector, wrapperSelector, fieldSelector }) {
	const slides = document.querySelectorAll(slideSelector),
		slider = document.querySelector(container),
		prev = document.querySelector(prevArrowSelector),
		next = document.querySelector(nextArrowSelector),
		total = document.querySelector(totalCounterSelector),
		current = document.querySelector(currentSelector),
		slidesWrapper = document.querySelector(wrapperSelector),
		slidesField = document.querySelector(fieldSelector),
		width = window.getComputedStyle(slidesWrapper).width
	let slideIndex = 1
	let offset = 0

	if (slides.length < 10) {
		total.textContent = `0${slides.length}`
		current.textContent = `0${slideIndex}`
	} else {
		total.textContent = slides.length
		current.textContent = slideIndex
	}

	slidesField.style.width = 100 * slides.length + "%"
	slidesField.style.display = "flex"
	slidesField.style.transition = "0.5s all"

	slidesWrapper.style.overflow = "hidden"

	slides.forEach((slide) => {
		slide.style.width = width
	})

	next.addEventListener("click", () => {
		if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
			offset = 0
		} else {
			offset += +width.slice(0, width.length - 2)
		}
		slidesField.style.transform = `translateX(-${offset}px)`

		if (slideIndex == slides.length) {
			slideIndex = 1
		} else {
			slideIndex++
		}

		if (slides.length < 10) {
			current.textContent = `0${slideIndex}`
		} else {
			current.textContent = slideIndex
		}

		//точки на слайдере
		dots.forEach((item) => (item.style.opacity = "0.5"))
		dots[slideIndex - 1].style.opacity = "1"
	})

	prev.addEventListener("click", () => {
		if (offset == 0) {
			offset = +width.slice(0, width.length - 2) * (slides.length - 1)
		} else {
			offset -= +width.slice(0, width.length - 2)
		}
		slidesField.style.transform = `translateX(-${offset}px)`

		if (slideIndex == 1) {
			slideIndex = slides.length
		} else {
			slideIndex--
		}

		if (slides.length < 10) {
			current.textContent = `0${slideIndex}`
		} else {
			current.textContent = slideIndex
		}

		//точки на слайдере
		dots.forEach((item) => (item.style.opacity = "0.5"))
		dots[slideIndex - 1].style.opacity = "1"
	})

	const dots = []

	slider.style.position = "relative"

	const indicators = document.createElement("ol")
	indicators.classList.add("carousel-indicators")

	slider.append(indicators)

	for (let i = 0; i < slides.length; i++) {
		const dot = document.createElement("li")
		dot.classList.add("dot")
		dot.setAttribute("data-slide-to", i + 1)

		if (i == 0) {
			dot.style.opacity = 1
		}

		indicators.append(dot)

		dots.push(dot)
	}

	dots.forEach((item) => {
		item.addEventListener("click", (e) => {
			const slideTo = e.target.getAttribute("data-slide-to")

			slideIndex = slideTo

			offset = (slideTo - 1) * +width.slice(0, width.length - 2)
			slidesField.style.transform = `translateX(-${offset}px)`

			if (slides.length < 10) {
				current.textContent = `0${+slideTo}`
			} else {
				current.textContent = +slideTo
			}

			dots.forEach((item) => (item.style.opacity = "0.5"))
			dots[slideIndex - 1].style.opacity = "1"
		})
	})
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);


/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsBtnSelector, tabsSelector, tabsParentSelector, activeSelector) {
	//Вешаем обработчик на window, тем самым JS ждет полного рендера DOM-дерева
	const tabs = document.querySelectorAll(tabsBtnSelector), //получаем все кнопки
		tabsContent = document.querySelectorAll(tabsSelector), //получаем все табы
		tabsParent = document.querySelector(tabsParentSelector) //получаем родителя кнопок

	// создаем функцию по скрытию табов и удалению класса активности у кнопок
	function hideTabContent() {
		/* перебираем все табы и выводи каждый таб отдельно */
		tabsContent.forEach((tabContent) => {
			// tabContent.style.display = "none" //каждому табу устанавливаем display в none
			tabContent.classList.remove("show", "fade") //у каждого таба удаляем класс .show и .fade
			tabContent.classList.add("hide") //каждому табу добавляем класс .hide
		})

		//перебираем все кнопки и выводим каждую
		tabs.forEach((tab) => {
			tab.classList.remove(activeSelector) //удаляем у каждой кнопки класс активности
		})
	}

	//функция по показу табов и добавлению кнопке класса активности
	//функция принимает в себя индекс. Индекс нужен для определения кокой таб нужно показывать
	function showTabContent(index) {
		// tabsContent[index].style.display = "block" //ставим табу с индексом display в block
		tabsContent[index].classList.remove("hide") //удаляем у таба с индексом скласс .hide
		tabsContent[index].classList.add("show", "fade") //обавляем классы .show и .fade табу с индексом

		tabs[index].classList.add(activeSelector) //добавлем класс активности кнопке с индексом
	}

	hideTabContent() //запускаем функцию по скрытию всех табов
	showTabContent(0) //запускаем функцию по показу первого таба

	//функционал по переключению табов
	//на родителя кнопок добавлем обработчик события click. обработчик принимает в себя event
	tabsParent.addEventListener("click", (event) => {
		const target = event.target //создаем переменную таргет, чтобы не писать каждый раз event.target

		//создаем условие. Если target(элемент по которому мы кликнули существует) &&(и) target.classList.contains("tabheader__item")(элемент по которому мы кликнули имеет класс "tabheader__item" - класс нашей кнопки) то...
		if (target && target.classList.contains(tabsBtnSelector.slice(1))) {
			clearInterval(timerId) // отключаем слайдер после нажатия на кнопки
			//перебираем наши кнопки, выводим каждую кнопку и ее индекс
			tabs.forEach((tab, index) => {
				//условие: если tab(кнопка которую мы получили после перебора) ==(равен) target(элемент по которому мы кликнули) то...
				if (tab == target) {
					hideTabContent() //запускаем функцию скрытия всего контента
					showTabContent(index) //запускаем функцию показа нужного таба, передаем индекс кнопки, он равен индексу таба.
				}
			})
		}
	})

	let counter = 0 //создаем счетчик для слайдера
	//создаем интервал
	const timerId = setInterval(() => {
		//условие: если счетчик будет равен 4, то присваиваем счетчику 0 и начинаем слайдер с перовго слайда
		if (counter == 4) {
			//проверка
			counter = 0 //присваивание
		}

		hideTabContent() //запуск функции по скрытию табов
		showTabContent(counter) //функция по показу табов, принмает значение счетчика
		counter++ //увеличиваем счетчик на 1
	}, 2000) //интервал 2 сек
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);


/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(id, deadline) {
	//функция по получению оставшегося времени
	//функция принимает в себя конечную дату
	function getTimeRemaining(endtime) {
		const t = Date.parse(endtime) - Date.parse(new Date()), //получаем разницу между конечной даты и нашей даты
			days = Math.floor(t / (1000 * 60 * 60 * 24)), //переводим в дни
			hours = Math.floor((t / (1000 * 60 * 60)) % 24), //переводим в часы
			minutes = Math.floor((t / 1000 / 60) % 60), //переводим в минуты
			seconds = Math.floor((t / 1000) % 60) //переводим в секунды

		//выводим массив с нашими числами
		return {
			total: t,
			days: days,
			hours: hours,
			minutes: minutes,
			seconds: seconds,
		}
	}

	//функци по установки нуля
	function getZero(num) {
		//функция принимает в себя цифру
		//условие: если число будет меньше 10, то функция возвращает строку с нулем и нашем числом, если нет, то возвращает просто число
		if (num >= 0 && num < 10) {
			return `0${num}`
		} else {
			return num
		}
	}

	//функция по установки таймера
	//функция принимает в себя селектор родителя и конечной даты
	function setClock(selector, endTime) {
		const timer = document.querySelector(selector), //получаем родителя со страницы
			days = timer.querySelector("#days"), //получаем день со страницы
			hours = timer.querySelector("#hours"), //получаем часы со страницы
			minutes = timer.querySelector("#minutes"), //получаем минуты со страницы
			seconds = timer.querySelector("#seconds"), //получаем секунды со страницы
			timeInterval = setInterval(updateClock, 1000) //устанавливаем обновление таймера на странице каждую секунду

		updateClock() //запускаем функцию по обновлению таймера

		//функция по обновлению таймера
		function updateClock() {
			const t = getTimeRemaining(endTime) // принимаем с числами из функции getTimeRemaining

			days.textContent = getZero(t.days) //обновляем на страницы дни
			hours.textContent = getZero(t.hours) //обновляем на страницы часы
			minutes.textContent = getZero(t.minutes) //обновляем на страницы минуты
			seconds.textContent = getZero(t.seconds) //обновляем на страницы секунды

			//останавливаем интервал, если время равно 0
			if (t.total <= 0) {
				clearInterval(timeInterval)
			}
		}
	}
	setClock(id, deadline) //запуск таймера
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);


/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getResource": () => (/* binding */ getResource),
/* harmony export */   "postData": () => (/* binding */ postData)
/* harmony export */ });
const postData = async (url, data) => {
	const res = await fetch(url, {
		method: "POST",
		headers: {
			"Content-type": "application/json",
		},
		body: data,
	})

	return await res.json()
}

const getResource = async (url) => {
	const res = await fetch(url)

	if (!res.ok) {
		throw new Error(`Could not fetch ${url}, status: ${res.status}`)
	}

	return await res.json()
}




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_card__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/card */ "./js/modules/card.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_form__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/form */ "./js/modules/form.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");

;






//Вешаем обработчик на window, тем самым JS ждет полного рендера DOM-дерева
window.addEventListener("DOMContentLoaded", () => {
	// // табы Никита
	// const tabs = document.querySelectorAll(".tabcontent") //получаем табы со страницы
	// const tabsBtn = document.querySelectorAll(".tabheader__item") //получаем кнопки для переключения табов

	// //Создаем функцию скрытие всех табов и удаления класса активности у кнопок
	// function hideTabs(tabs, tabsBtn) { //функция принимает в себя псевдомассив наших табов и псевдомассив с кнопками
	// 	tabs.forEach((item) => { //перебираем псевдомассив наших табов и выводим каждый таб отдельно
	// 		item.classList.add("hide") //добавляем класс .hide
	// 		item.classList.remove("show") //удаляем класс .show
	// 	})

	// 	tabsBtn.forEach((item) => { //перебираем наши кнопки для табов
	// 		item.classList.remove("tabheader__item_active") //удаляем класс активности .tabheader__item_active
	// 	})
	// }

	// //Создаем функцию по показу табов и добавлению класса активности нужной кнопке
	// function showTab(tabs, btns, index = 0) { //функция принимает в себя псевдомассив наших табов и псевдомассив с кнопками, а также номер таба, который будет по умолчанию включен
	// 	tabs[index].classList.remove("hide") //удаляем класс .hide у таба с нашим индексом
	// 	tabs[index].classList.add("show") //добавляем класс .show у таба с нашим индексом

	// 	btns[index].classList.add("tabheader__item_active") //добааляем класс активности .tabheader__item_active конпке с нашим индексом
	// }

	// //функционал по переключению табов
	// tabsBtn.forEach((item, index) => { //перебираем наши кнопки и выводим каждую кнопку и ее индекс отдельно
	// 	item.addEventListener("click", () => { //навешиваем на каждую кнопку обработчик клика
	// 		hideTabs(tabs, tabsBtn) //запускаем функцию по скрытию всех табов
	// 		showTab(tabs, tabsBtn, index) //запускаем функцию по показу нажатого таба. Передаем index нажатой кнопки, тем самым показываем нужный таб
	// 	})
	// })

	// hideTabs(tabs, tabsBtn) //запускаем функцию по скрытию всех табов
	// showTab(tabs, tabsBtn) //запускаем функцию по показу первого таба

	//табы с курса
	(0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])(".tabheader__item", ".tabcontent", ".tabheader__items", "tabheader__item_active")

	//Создание таймера
	//таймер Никита
	// const endDate = new Date("2022-05-20") //устанавливаем конечную дату
	// const endDateMls = endDate.getTime() //переводим конечную дату в мил/сек
	// const days = document.querySelector("#days") //получаем элемент с днем
	// const hours = document.querySelector("#hours") //получаем элемент с часами
	// const minutes = document.querySelector("#minutes") //получаем элемент с минутами
	// const seconds = document.querySelector("#seconds") //получаем элемент с секундами

	// //Функция по установки нуля
	// function setZero(num) {
	// 	//функция принимает в себя цифру
	// 	//условие: если число будет меньше 10, то функция возвращает строку с нулем и нашем числом, если нет, то возвращает просто число
	// 	if (num < 10) {
	// 		return `0${num}`
	// 	} else {
	// 		return num
	// 	}
	// }

	// //создаем интервал обновления таймера
	// setInterval(() => {
	// 	let date = new Date() //получаем наше время
	// 	let dateMlsec = date.getTime() //переводим наше время в мил/сек
	// 	let sec = Math.floor(((endDateMls - dateMlsec) / 1000) % 60) //получаем секунды
	// 	let min = Math.floor(((endDateMls - dateMlsec) / 1000 / 60) % 60) //получаем минуты
	// 	let hour = Math.floor(((endDateMls - dateMlsec) / 1000 / 60 / 60) % 24) //получаем часы
	// 	let day = Math.floor((endDateMls - dateMlsec) / 1000 / 60 / 60 / 24) //получаем дни

	// 	days.textContent = setZero(day) //вставляем нове значение дня в элемент с днем
	// 	hours.textContent = setZero(hour) //вставляем нове значение часа в элемент с часами
	// 	minutes.textContent = setZero(min) //вставляем нове значение минут в элемент с минутами
	// 	seconds.textContent = setZero(sec) //вставляем нове значение секунд в элемент с секундами
	// }, 1000) //обновление каждую секунду

	//таймер курс
	;(0,_modules_timer__WEBPACK_IMPORTED_MODULE_2__["default"])(".timer", "2023-01-01")

	//модальное окно
	;(0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__["default"])()
	// // Модалньное окно с помощью функции-конструктора
	// function Modal(modalSelector, btnSelector, closeBtnSelector) {
	// 	this.modal = document.querySelector(modalSelector)
	// 	this.btn = document.querySelectorAll(btnSelector)
	// 	this.closeBtn = document.querySelector(closeBtnSelector)

	// 	this.openModal = function () {
	// 		this.btn.forEach((btn) => {
	// 			btn.addEventListener("click", () => {
	// 				this.modal.style.display = "block"
	// 				document.body.style.overflow = "hidden"
	// 			})
	// 		})
	// 	}

	// 	this.closeModal = function () {
	// 		this.closeBtn.addEventListener("click", () => {
	// 			this.modal.style.display = "none"
	// 			document.body.style.overflow = ""
	// 		})
	// 	}

	// 	this.init = function () {
	// 		this.openModal()
	// 		this.closeModal()
	// 	}
	// }

	// const modal1 = new Modal(".modal", "[data-modal]", ".modal__close")
	// modal1.init()

	//Создание карточек с помощью классов
	;(0,_modules_card__WEBPACK_IMPORTED_MODULE_1__["default"])()

	// отправка с формы
	;(0,_modules_form__WEBPACK_IMPORTED_MODULE_4__["default"])()

	//Слайдер Никита
	// const nextBtn = document.querySelector(".offer__slider-next")
	// const prevBtn = document.querySelector(".offer__slider-prev")
	// const currentSlideNumber = document.querySelector("#current")
	// const slides = document.querySelectorAll(".offer__slide")
	// let slideIndex = 3

	// document.querySelector("#total").textContent = getZero(slides.length)

	// function plusSlide() {
	// 	if (slideIndex >= slides.length) {
	// 		slideIndex = 0
	// 	}
	// 	slideIndex++
	// 	currentSlideNumber.textContent = getZero(slideIndex)
	// 	hideSlide()
	// 	showSlide(slideIndex)
	// }

	// function minusSlide() {
	// 	if (slideIndex <= 1) {
	// 		slideIndex = slides.length + 1
	// 	}
	// 	slideIndex--
	// 	currentSlideNumber.textContent = getZero(slideIndex)
	// 	hideSlide()
	// 	showSlide(slideIndex)
	// }

	// function hideSlide() {
	// 	slides.forEach((item) => {
	// 		item.classList.remove("show")
	// 		item.classList.add("hide")
	// 	})
	// }

	// function showSlide(i) {
	// 	slides[i - 1].classList.remove("hide")
	// 	slides[i - 1].classList.add("show")
	// }

	// nextBtn.addEventListener("click", () => {
	// 	plusSlide()
	// })

	// prevBtn.addEventListener("click", () => {
	// 	minusSlide()
	// })

	// hideSlide()
	// showSlide(slideIndex)

	//Слайдер курс
	;(0,_modules_slider__WEBPACK_IMPORTED_MODULE_5__["default"])({
		container: ".offer__slider",
		slideSelector: ".offer__slide",
		nextArrowSelector: ".offer__slider-next",
		prevArrowSelector: ".offer__slider-prev",
		totalCounterSelector: "#total",
		currentSelector: "#current",
		wrapperSelector: ".offer__slider-wrapper",
		fieldSelector: ".offer__slider-inner",
	})

	//простой слайдер
	// function showSlides(n) {
	// 	if (n > slides.length) {
	// 		slideIndex = 1
	// 	}

	// 	if (n < 1) {
	// 		slideIndex = slides.length
	// 	}

	// 	slides.forEach((item) => (item.style.display = "none"))

	// 	slides[slideIndex - 1].style.display = "block"

	// if (slides.length < 10) {
	// 	current.textContent = `0${slideIndex}`
	// } else {
	// 	current.textContent = slideIndex
	// }
	// }
	// showSlides(slideIndex)
	// if (slides.length < 10) {
	// 	total.textContent = `0${slides.length}`
	// } else {
	// 	total.textContent = slides.length
	// }

	// function plusSlides(n) {
	// 	showSlides((slideIndex += n))
	// }

	// prev.addEventListener("click", () => {
	// 	plusSlides(-1)
	// })

	// next.addEventListener("click", () => {
	// 	plusSlides(1)
	// })

	//Создание точек для слайдера Никита(быстрый варик)
	// const sliderWrapper = document.querySelector(".offer__slider")
	// sliderWrapper.style.position = "relative"

	// const dotWrapper = document.createElement("div")
	// dotWrapper.classList.add("carousel-indicators")

	// sliderWrapper.append(dotWrapper)

	// for (let i = 0; i < slides.length; i++) {
	// 	const dot = document.createElement("div")
	// 	dot.classList.add("dot")
	// 	dot.setAttribute("data-slide", i)

	// 	dotWrapper.append(dot)
	// }

	// document.querySelectorAll(".dot")[0].style.opacity = "1"

	// dotWrapper.addEventListener("click", (e) => {
	// 	if (e.target && e.target.classList.contains("dot")) {
	// 		document.querySelectorAll(".dot").forEach((item) => (item.style.opacity = "0.5"))
	// 		e.target.style.opacity = "1"

	// 		offset = e.target.getAttribute("data-slide") * +width.slice(0, width.length - 2)
	// 		slidesField.style.transform = `translateX(-${offset}px)`

	// 		if (slides.length < 10) {
	// 			current.textContent = `0${+e.target.getAttribute("data-slide") + 1}`
	// 		} else {
	// 			current.textContent = +e.target.getAttribute("data-slide") + 1
	// 		}
	// 	}
	// })

	//калькулятор Никита
	// const sex = document.querySelectorAll("#gender div"),
	// 	active = document.querySelectorAll(".calculating__choose_big div"),
	// 	inputs = document.querySelector(".calculating__choose_medium"),
	// 	result = document.querySelector(".calculating__result span")

	// let activeSex = "female",
	// 	activeSport = 1.375,
	// 	height,
	// 	weight,
	// 	age,
	// 	res

	// function calcKcal() {
	// 	const input = inputs.querySelectorAll("input")
	// 	if (input[0].value != "" && input[1].value != "" && input[2].value != "") {
	// 		if (activeSex == "male") {
	// 			res = (88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * activeSport
	// 			result.textContent = Math.round(res)
	// 		} else if (activeSex == "female") {
	// 			res = (447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * activeSport
	// 			result.textContent = Math.round(res)
	// 		}
	// 	} else {
	// 		result.textContent = "__"
	// 	}
	// }

	// sex.forEach((item) => {
	// 	item.addEventListener("click", (e) => {
	// 		sex.forEach((item) => item.classList.remove("calculating__choose-item_active"))
	// 		e.target.classList.add("calculating__choose-item_active")
	// 		activeSex = e.target.getAttribute("id")
	// 		calcKcal()
	// 	})
	// })

	// active.forEach((item) => {
	// 	item.addEventListener("click", (e) => {
	// 		active.forEach((item) => item.classList.remove("calculating__choose-item_active"))
	// 		e.target.classList.add("calculating__choose-item_active")
	// 		activeSport = +e.target.getAttribute("data-active")
	// 		calcKcal()
	// 	})
	// })

	// inputs.querySelector("#height").addEventListener("input", (e) => {
	// 	height = +e.target.value
	// 	calcKcal()
	// })

	// inputs.querySelector("#weight").addEventListener("input", (e) => {
	// 	weight = +e.target.value
	// 	calcKcal()
	// })

	// inputs.querySelector("#age").addEventListener("input", (e) => {
	// 	age = +e.target.value
	// 	calcKcal()
	// })

	//калькулятор курс
	;(0,_modules_calc__WEBPACK_IMPORTED_MODULE_6__["default"])()
})

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map