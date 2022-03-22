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
export default slider
