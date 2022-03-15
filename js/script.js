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
})
