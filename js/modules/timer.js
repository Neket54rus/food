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
export default timer
