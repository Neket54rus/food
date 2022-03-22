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

export default tabs
