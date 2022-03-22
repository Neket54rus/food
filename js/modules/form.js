import { postData } from "../services/services"

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

			postData("http://localhost:3000/requests", json)
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
export default form
