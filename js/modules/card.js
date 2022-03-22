import { getResource } from "../services/services"

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

	getResource("http://localhost:3000/menu").then((res) => {
		res.forEach(({ img, title, descr, price }) => {
			new Card(img, title, descr, price, ".menu__field .container").createCard()
		})
	})
}
export default card
