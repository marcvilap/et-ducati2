const container = document.querySelector<HTMLElement>('#container')
const navigation = document.querySelector<HTMLElement>('#navigation-scroll')
const navDots = document.querySelectorAll<HTMLAnchorElement>('#navigation button')

const update = () => {
	if (!container || !navigation || window.innerWidth < 1280) {
		container?.style.removeProperty('transform')
		navigation?.style.removeProperty('width')
		navDots.forEach(dot => {
			dot.style.backgroundColor = '#E0D9C5'
		})
		return
	}
	const maxScroll = document.documentElement.scrollHeight - window.innerHeight
	const totalWidth = container.scrollWidth - window.innerWidth
	container.style.transform = `translateX(${-(window.scrollY / maxScroll) * totalWidth}px)`
	const scrollPercentage = (window.scrollY / maxScroll) * 100
	navigation.style.width = `${scrollPercentage}%`

	const navBar = document.querySelector<HTMLElement>('nav')
	if (navBar && navigation) {
		const fillWidth = navigation.offsetWidth

		navDots.forEach(dot => {
			const dotLeft = dot.offsetLeft
			const dotCenter = dotLeft + dot.offsetWidth / 2
			dot.style.backgroundColor = dotCenter <= fillWidth ? '#6E1B01' : '#E0D9C5'
		})
	}
}

window.addEventListener('scroll', update, { passive: true })
window.addEventListener('resize', update)
update()

document.addEventListener('click', e => {
	const button = (e.target as HTMLButtonElement).closest<HTMLButtonElement>('button[data-goto]')
	if (button && container) {
		const goTo = parseInt(button.dataset.goto || '0')
		const maxScroll = document.documentElement.scrollHeight - window.innerHeight
		const totalWidth = container.scrollWidth - window.innerWidth
		const targetScroll = (goTo * window.innerWidth) / (totalWidth / maxScroll)
		window.scrollTo({ top: targetScroll, behavior: 'smooth' })
	}
})

const revealsObserver = new IntersectionObserver(entries => {
	entries.forEach(({ isIntersecting, target }) => {
		target.classList.toggle('reveal', !isIntersecting)
		target.classList.toggle('revealed', isIntersecting)
	})
})

document.querySelectorAll('.reveal').forEach(element => revealsObserver.observe(element))
