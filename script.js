'use strict'

window.onload = function() {
    
    let halfOF = document.querySelectorAll('.halfOF');
    halfOF[0].style.setProperty('transform', 'translateX(-120%) rotate(-10deg)');
    halfOF[1].style.setProperty('transform', 'translateX(120%) rotate(10deg)');
    
    setTimeout(function() {
        let parentnode = halfOF[0].parentNode;
        
        halfOF[0].parentNode.removeChild(halfOF[0]);
        halfOF[1].parentNode.removeChild(halfOF[1]);
        parentnode.parentNode.removeChild(parentnode);
    }, 600)
    

    const body = document.querySelector('body'),
          background = document.querySelector('.background'),
          html = document.querySelector('html'),

          someImageBlock = document.querySelector('.someImage'),
          someTextBlock = document.querySelector('.someTextBlock'),
          
          main = document.querySelectorAll('.main'),

          boltBlock = document.querySelector('.bolt'),
          lineBlock = document.querySelector('.line');

    
    
    background.style.setProperty('--bodyHeight', `${body.clientHeight}px`);

    
    
    
    setTimeout(function() {
        boltBlock.style.setProperty('transform', 'translateX(0)')
    }, 2000)

    
    
    
    
    setInterval(function() {
        var height = Math.max( body.scrollHeight, body.offsetHeight,
                           html.clientHeight, html.scrollHeight, html.offsetHeight );

        let YCoord = window.pageYOffset,
            heightOfScreen = document.querySelectorAll('.main')[0].clientHeight;

        if (YCoord > 600) {
           someImageBlock.style.setProperty('transform', 'translateX(0)');
           someImageBlock.style.opacity = 1;
           someTextBlock.style.setProperty('transform', 'translateX(0)');
           someTextBlock.style.opacity = 1;
    }}, 500);
    
    const arrows = document.querySelectorAll('.arrow'),
          slider = document.querySelector('.blocks-slider'),
          ownSlides = document.querySelectorAll('.slide');
    let   mainHere = document.querySelector('#blackedSection');

    arrows[0].addEventListener('click', moveLeft) //left arrow click
    arrows[1].addEventListener('click', moveRight) //right arrow


    let position = 0; //началнья позиция 
    let absolutePosition; //нынешняя позиция
    slider.style.setProperty('--MovingSlider', 'translateX(0px)'); // установка слайдера в начальную позицию

    const slideWidth = ownSlides[0].clientWidth;
    let percentOfSliding = (mainHere.clientWidth / 2); //нахождение центра экрана и умножение на -1 для движения влево
    console.log(percentOfSliding)

    let slideNumberBlock = document.querySelector('.slideNumber'),
        allSlideCountBlock = document.querySelector('.allSlideCount');

    for (let n = 0; n < ownSlides.length; n++) {
        ownSlides[n].style.setProperty('--scale', 'scale(0.84)')
        ownSlides[n].style.background = 'url(img/slide' + (n + 1) + '.jpg)';
        ownSlides[n].style.backgroundSize = 'contain';
        ownSlides[n].style.setProperty('filter', 'contrast(0.5)');
    }
    ownSlides[0].style.setProperty('filter', 'contrast(1)')
    ownSlides[0].style.setProperty('--scale', 'scale(1)') 
    slider.style.setProperty('left', mainHere.clientWidth / 2 - 400 / 2 + 'px');
    arrows[0].style.opacity = "0.3";
    arrows[0].style.cursor = "default";

    allSlideCountBlock.innerHTML = '&ensp;/ ' + ownSlides.length;


    function moveRight() { // при клике на правую стрелку
        if (position < ownSlides.length - 1) { 
            position++ //добавляется позиция
            absolutePosition = slideWidth * position * -1; //позиция умножается на центра экрана

            slideNumberBlock.innerHTML = position + 1;

            slider.style.setProperty('--MovingSlider', 'translateX(' + absolutePosition + 'px)'); //да

            for (let n = 0; n < ownSlides.length; n++) {
                ownSlides[n].style.setProperty('--scale', 'scale(0.9)')
                ownSlides[n].style.setProperty('filter', 'contrast(0.5)')
            }
            ownSlides[position].style.setProperty('--scale', 'scale(1)'); // активный блок увеличивается
            ownSlides[position].style.setProperty('filter', 'contrast(1)')

            if (position == ownSlides.length - 1) {
                arrows[1].style.opacity = "0.3";
                arrows[1].style.cursor = "default";
            } else {
                arrows[1].style.opacity = "1"; arrows[1].style.cursor = "pointer";
                arrows[0].style.opacity = "1"; arrows[0].style.cursor = "pointer";
            }
        }
    }

    function moveLeft() { // левая стрелка
        if (position > 0) {
            position--
            absolutePosition = slideWidth * position * -1;

            slider.style.setProperty('--MovingSlider', 'translateX(' + absolutePosition + 'px)');

            slideNumberBlock.innerHTML = position + 1;

            for (let n = 0; n < ownSlides.length; n++) {
                ownSlides[n].style.setProperty('--scale', 'scale(0.9)')
                ownSlides[n].style.setProperty('filter', 'contrast(0.5)')
            }
            ownSlides[position].style.setProperty('--scale', 'scale(1)')
            ownSlides[position].style.setProperty('filter', 'contrast(1)')
            if (position == 0) {
                arrows[0].style.opacity = "0.3";
                arrows[0].style.cursor = "default";
            } else {
                arrows[0].style.opacity = "1"; arrows[0].style.cursor = "pointer";
                arrows[1].style.opacity = "1"; arrows[1].style.cursor = "pointer";
            }
        }
    }
    
    const popup = document.querySelectorAll('.popupMenuNavigation'),
          navButton = document.querySelectorAll('.navigationButton'),
          backPopup = document.querySelector('.backgroundForPopUp');
    
    navButton[0].addEventListener('click', openFirstPopUp);
    navButton[1].addEventListener('click', openSecondPopUp);
    backPopup.addEventListener('click', closeFirstPopUp);
    backPopup.addEventListener('click', closeSecondPopUp);
    popup[0].addEventListener('click', closeFirstPopUp);
    popup[1].addEventListener('click', closeSecondPopUp);
    
//    open 1
    function openFirstPopUp() {
        console.log('start')
        navButton[0].removeEventListener('click', openFirstPopUp);
        backPopup.removeEventListener('click', closeFirstPopUp);
        popup[0].removeEventListener('click', closeFirstPopUp);
        backPopup.style.top = 0;
        popup[0].style.setProperty('transform', 'translateY(var(--mainMargin)) perspective(1200px) rotateX(0deg)');
        backPopup.style.background = 'rgba(0, 0, 0, 0.7)';
        backPopup.style.display = 'block';
        backPopup.style.zIndex = 98;
        setTimeout(function() {
            console.log('end')
            backPopup.addEventListener('click', closeFirstPopUp);
            navButton[0].addEventListener('click', openFirstPopUp);
            popup[0].addEventListener('click', closeFirstPopUp);
        }, 1000)
    }
    
//    close 1
    function closeFirstPopUp() {
        backPopup.removeEventListener('click', closeFirstPopUp);
        navButton[0].removeEventListener('click', openFirstPopUp);
        popup[0].removeEventListener('click', closeFirstPopUp);
        popup[0].style.setProperty('transform', '');
        backPopup.style.background = 'rgba(0, 0, 0, 0)';
        backPopup.style.display = 'none';
        backPopup.style.zIndex = 0;
        setTimeout(function() {
            navButton[0].addEventListener('click', openFirstPopUp);
            backPopup.addEventListener('click', closeFirstPopUp);
            popup[0].addEventListener('click', closeFirstPopUp);
        }, 1000);
    }
    
    
//    open 2
    function openSecondPopUp() {
        navButton[1].removeEventListener('click', openSecondPopUp);
        backPopup.removeEventListener('click', closeSecondPopUp);
        popup[1].removeEventListener('click', closeSecondPopUp);
        backPopup.style.top = 'calc(' + document.querySelector('body').offsetHeight + 'px - 100vh)';
        popup[1].style.setProperty('transform', 'translateX(0) perspective(1000px) rotateX(0deg)');
        backPopup.style.background = 'rgba(0, 0, 0, 0.7)';
        backPopup.style.display = 'block';
        backPopup.style.zIndex = 98;
        setTimeout(function() {
            backPopup.addEventListener('click', closeSecondPopUp);
            navButton[1].addEventListener('click', openSecondPopUp);
            popup[1].addEventListener('click', closeSecondPopUp);
        }, 1000)
    }
    
    
//    close 2
    function closeSecondPopUp() {
        navButton[1].removeEventListener('click', openSecondPopUp);
        backPopup.removeEventListener('click', closeSecondPopUp);
        popup[1].removeEventListener('click', closeSecondPopUp);
        popup[1].style.setProperty('transform', '');
        backPopup.style.background = 'rgba(0, 0, 0, 0)';
        backPopup.style.display = 'none';
        backPopup.style.zIndex = 0;
        setTimeout(function() {
            navButton[1].addEventListener('click', openSecondPopUp);
            backPopup.addEventListener('click', closeSecondPopUp);
            popup[1].addEventListener('click', closeSecondPopUp);
        }, 1000);
    }
    
    
    
}
    