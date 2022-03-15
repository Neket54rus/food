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
//Вешаем обработчик на window, тем самым JS ждет полного рендера DOM-дерева
window.addEventListener("DOMContentLoaded", () => {
	const tabs = document.querySelectorAll(".tabheader__item"), //получаем все кнопки
		tabsContent = document.querySelectorAll(".tabcontent"), //получаем все табы
		tabsParent = document.querySelector(".tabheader__items") //получаем родителя кнопок

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
			tab.classList.remove("tabheader__item_active") //удаляем у каждой кнопки класс активности
		})
	}

	//функция по показу табов и добавлению кнопке класса активности
	//функция принимает в себя индекс. Индекс нужен для определения кокой таб нужно показывать
	function showTabContent(index) {
		// tabsContent[index].style.display = "block" //ставим табу с индексом display в block
		tabsContent[index].classList.remove("hide") //удаляем у таба с индексом скласс .hide
		tabsContent[index].classList.add("show", "fade") //обавляем классы .show и .fade табу с индексом

		tabs[index].classList.add("tabheader__item_active") //добавлем класс активности кнопке с индексом
	}

	hideTabContent() //запускаем функцию по скрытию всех табов
	showTabContent(0) //запускаем функцию по показу первого таба

	//функционал по переключению табов
	//на родителя кнопок добавлем обработчик события click. обработчик принимает в себя event
	tabsParent.addEventListener("click", (event) => {
		const target = event.target //создаем переменную таргет, чтобы не писать каждый раз event.target

		//создаем условие. Если target(элемент по которому мы кликнули существует) &&(и) target.classList.contains("tabheader__item")(элемент по которому мы кликнули имеет класс "tabheader__item" - класс нашей кнопки) то...
		if (target && target.classList.contains("tabheader__item")) {
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
	const deadline = "2022-05-20" //создаем конечную дату

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
	setClock(".timer", deadline) //запуск таймера
})
