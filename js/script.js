"use strict"
import tabs from "./modules/tabs"
import card from "./modules/card"
import timer from "./modules/timer"
import modal from "./modules/modal"
import form from "./modules/form"
import slider from "./modules/slider"
import calc from "./modules/calc"
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
	tabs(".tabheader__item", ".tabcontent", ".tabheader__items", "tabheader__item_active")

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
	timer(".timer", "2023-01-01")

	//модальное окно
	modal()
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
	card()

	// отправка с формы
	form()

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
	slider({
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
	calc()
})
