/*=============== Preloader ===============*/
document.body.onload = function() {

    setTimeout(function(){
        var preloader = document.getElementById('preloader')
        if( !preloader.classList.contains('done'))
        {
            preloader.classList.add('done');
        }
    },1000);

}

/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

const linkAction = () =>{
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))



// Р”Р»СЏ СЏР·С‹РєРѕРІ ///////////////////////////////////////


const languageMenu = document.getElementById('language-menu'),
      languageToggle = document.getElementById('language-toggle'),
      languageClose = document.getElementById('language-close')

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if(languageToggle){
    languageToggle.addEventListener('click', () =>{
        languageMenu.classList.add('language-show')
    })
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if(languageClose){
    languageClose.addEventListener('click', () =>{
        languageMenu.classList.remove('language-show')
    })
}

/*=============== REMOVE MENU MOBILE ===============*/
const languageLink = document.querySelectorAll('.language__link')

const linkLanguageAction = () =>{
    const navMenu = document.getElementById('language-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('language-show')
}
languageLink.forEach(n => n.addEventListener('click', linkLanguageAction))



/*=============== SWiper ===============*/
$(document).ready(function(){
    $("#testimonial-slider").owlCarousel({
        items:1,
        itemsDesktop:[1000,2],
        itemsDesktopSmall:[980,1],
        itemsTablet:[768,1],
        pagination:true,
        navigation:true,
        navigationText:["<",">"],
        autoPlay:true
    });
  });

/*=============== SWIPER TESTIMONIAL ===============*/




/*=============== РђРєС‚РёРІРЅС‹Рµ Р»РёРЅРєРё РґР»СЏ РїРѕРєР°Р·Р° ===============*/
const sections = document.querySelectorAll('section[id]')
    
const scrollActive = () =>{
  	const scrollY = window.pageYOffset

	sections.forEach(current =>{
		const sectionHeight = current.offsetHeight,
			  sectionTop = current.offsetTop - 58,
			  sectionId = current.getAttribute('id'),
			  sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

		if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
			sectionsClass.classList.add('active-link')
		}else{
			sectionsClass.classList.remove('active-link')
		}                                                    
	})
}
window.addEventListener('scroll', scrollActive)

document.addEventListener('DOMContentLoaded', () => {
    const scrollUpElement = document.getElementById('scroll-up');

    // Функция для отображения/скрытия кнопки прокрутки вверх в зависимости от позиции прокрутки
    const scrollUp = () => {
        if (scrollUpElement) {
            if (window.scrollY >= 350) {
                scrollUpElement.classList.add('show-scroll');
            } else {
                scrollUpElement.classList.remove('show-scroll');
            }
        }
    };

    // Привязка обработчика события прокрутки к окну
    window.addEventListener('scroll', scrollUp);

    // Начальная проверка в случае, если страница загружена с позицией прокрутки
    scrollUp();
});

/*=============== DARK LIGHT THEME ===============*/ 
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'ri-sun-line'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'ri-moon-line' : 'ri-sun-line'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'ri-sun-line' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})
// Функция для переключения темы









/*=============== CHANGE BACKGROUND HEADER ===============*/
const scrollHeader = () =>{
    const header = document.getElementById('header')
    // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
    this.scrollY >= 50 ? header.classList.add('bg-header') 
                       : header.classList.remove('bg-header')
}
window.addEventListener('scroll', scrollHeader)

/*=============== SCROLL REVEAL РђРЅРёРјР°С†РёСЏ ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400,
    // reset: true,
})


sr.reveal('.home__data, .projects__container, .footer__container')
sr.reveal('.home__info', {delay: 600, origin: 'bottom', interval: 1000})  // div
sr.reveal('.skills__content:nth-child(1), .contact__content:nth-child(1)', {origin: 'left'})
sr.reveal('.skills__content:nth-child(2), .contact__content:nth-child(2)', {origin: 'right'})
sr.reveal('.qualification__content, .services__card', {interval: 100})




