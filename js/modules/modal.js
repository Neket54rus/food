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
export default modal
