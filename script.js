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
            heightOfScreen = document.querySelectorAll('.main')[0].clientHeight - 600;

        if (YCoord > heightOfScreen) {
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

    slider.style.width = 350 * ownSlides.length + 'px';
    setInterval(function() {
        if (window.innerWidth < 1200) {
            slider.style.setProperty('left', window.innerWidth / 2 - 400 / 2 + 'px')
        } if (window.innerWidth < 600) {
            slider.style.setProperty('left', window.innerWidth / 2 - 390 / 2 + 'px')
        } if (window.innerWidth > 1200) {
            slider.style.setProperty('left', mainHere.clientWidth / 2 - 375  / 2 + 'px')
        }  
    }, 1000);
    let position = 0; //началнья позиция 
    let absolutePosition; //нынешняя позиция
    slider.style.setProperty('--MovingSlider', 'translateX(0px)'); // установка слайдера в начальную позицию

    const slideWidth = ownSlides[0].clientWidth;
    let percentOfSliding = (mainHere.clientWidth / 2); //нахождение центра экрана и умножение на -1 для движения влево

    let slideNumberBlock = document.querySelector('.slideNumber'),
        allSlideCountBlock = document.querySelector('.allSlideCount');

    for (let n = 0; n < ownSlides.length; n++) {
        ownSlides[n].style.setProperty('--scale', 'scale(0.84)')
        ownSlides[n].style.background = 'url(img/slide' + (n + 1) + '.jpg)';
        ownSlides[n].style.backgroundSize = 'contain';
        ownSlides[n].style.setProperty('filter', 'contrast(0.5)');
        ownSlides[n].classList.add('righted')
    }
    
    document.querySelectorAll('.lefted').forEach(element => element.addEventListener('click', moveLeft))
    document.querySelectorAll('.righted').forEach(element => element.addEventListener('click', moveRight))
    
    ownSlides[0].style.setProperty('filter', 'contrast(1)')
    ownSlides[0].style.setProperty('--scale', 'scale(1)')
    ownSlides[0].classList.remove('righted')
    arrows[0].style.opacity = "0.3";
    arrows[0].style.cursor = "default";
    slider.style.setProperty('left', mainHere.clientWidth / 2 - 400 / 2 + 'px');
    
    

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
                
                if (n < position) {
                    ownSlides[n].classList.add('lefted');
                    ownSlides[n].classList.remove('righted');
                } if (n > position) {
                    ownSlides[n].classList.add('righted');
                    ownSlides[n].classList.remove('lefted');
                } if (n == position) {
                    ownSlides[n].classList.remove('righted');
                    ownSlides[n].classList.remove('lefted');
                }
                
                ownSlides[n].removeEventListener('click', moveRight)
                ownSlides[n].removeEventListener('click', moveLeft)
            }
            
            document.querySelectorAll('.lefted').forEach(element => element.addEventListener('click', moveLeft))
            document.querySelectorAll('.righted').forEach(element => element.addEventListener('click', moveRight))

            
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
                
                if (n < position) {
                    ownSlides[n].classList.add('lefted');
                    ownSlides[n].classList.remove('righted');
                } if (n > position) {
                    ownSlides[n].classList.add('righted');
                    ownSlides[n].classList.remove('lefted');
                } if (n == position) {
                    ownSlides[n].classList.remove('righted');
                    ownSlides[n].classList.remove('lefted');
                }
                
                ownSlides[n].removeEventListener('click', moveRight)
                ownSlides[n].removeEventListener('click', moveLeft)
            }
            
            document.querySelectorAll('.lefted').forEach(element => element.addEventListener('click', moveLeft))
            document.querySelectorAll('.righted').forEach(element => element.addEventListener('click', moveRight))
            
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
    
    let readyUp = 1;
    let readyDown = 1;
    
    navButton[0].addEventListener('click', openFirstPopUp);
    navButton[1].addEventListener('click', openSecondPopUp);
    
    
    popup[0].addEventListener('click', closeFirstPopUp);
    popup[1].addEventListener('click', closeSecondPopUp);
    
    function resizingPopUp() {
        if (document.querySelector('#footerContainer').clientWidth > 1200) {
            popup[1].style.left = 'calc(50% - ' + document.querySelector('#footerContainer').clientWidth + 'px / 2 / 2)';
            popup[0].style.left = 'calc(50% - ' + document.querySelector('#footerContainer').clientWidth + 'px / 2 / 2)';
        } if (document.querySelector('#footerContainer').clientWidth < 1200) {
            popup[1].style.left = 'calc(50% - 600px / 2)';
            popup[0].style.left = 'calc(50% - 600px / 2)';
            popup[1].style.width = '600px';
            popup[0].style.width = '600px';
        } if (document.querySelector('#footerContainer').clientWidth < 600) {
            popup[1].style.left = '0';
            popup[1].style.width = '100vw';
            popup[0].style.left = '0';
            popup[0].style.width = '100vw';
        }
    }
    
    resizingPopUp()
    
    window.addEventListener('resize', resizingPopUp);
    
//    backPopup.style.width = 'calc(100vw - ' + window.innerWidth - body.clientWidth + 'px)';
    
    
    
    
    

    
    function scrollLock() {
        const scrollWidth = (window.innerWidth - background.clientWidth) + 'px';
        
        body.style.paddingRight = scrollWidth;
        html.classList.add('disableScrollClass');
        body.classList.add('disableScrollClass');
        
        let allMains = document.querySelectorAll('.main');
        let allMainsl = document.querySelectorAll('.mainl');
        allMains.addElement = document.querySelectorAll('.mainl');
        background.style.setProperty('transform', `translateX(${scrollWidth * 2})`);
        for (let index = 0; index < allMains.length; index++) {
            allMains[index].style.setProperty('transform', `translateX(${scrollWidth * 2})`)
            for (let index = 0; index < allMainsl.length; index++) {
                allMains.addElement[index].style.setProperty('transform', `translateX(${scrollWidth * 2})`)
            }
        }
    }
    
    function scrollUnlock() {
        const scrollWidth = window.innerWidth - background.clientWidth + 'px';
        
        body.style.paddingRight = '0';
        html.classList.remove('disableScrollClass');
        body.classList.remove('disableScrollClass');
        
        let allMains = document.querySelectorAll('.main');
        let allMainsl = document.querySelectorAll('.mainl');
        allMains.addElement = document.querySelectorAll('.mainl');
        background.style.setProperty('transform', `translateX(${0})`);
        for (let index = 0; index < allMains.length; index++) {
            allMains[index].style.setProperty('transform', `translateX(0)`)
            for (let index = 0; index < allMainsl.length; index++) {
                allMains.addElement[index].style.setProperty('transform', `translateX(0)`)
            }
        }
    }
    
    //
    
//    let themeButton = document.querySelector(".themeButton"),
//        isDark = 
//    themeButton.addEventListener('click', changingTheme);
    
    
    
    
    
    
    
    
    
//    open 1
    function openFirstPopUp() {
        if (readyUp == 1) {
            readyUp = 0;
            
            if (window.innerWidth < 610) {
                popup[0].style.setProperty('width', '100vw')
                popup[0].style.setProperty('height', '90vh')
                popup[0].style.left = '0';
            } else {
                popup[0].style.setProperty('width', '600px')
                popup[0].style.setProperty('height', '600px')
            };
            
            scrollLock()
    //        navButton[0].removeEventListener('click', openFirstPopUp);
    //        backPopup.removeEventListener('click', closeFirstPopUp);
    //        popup[0].removeEventListener('click', closeFirstPopUp);
            window.scrollBy(0, -1000);
            backPopup.style.top = 0;
            popup[0].style.setProperty('transform', 'translateY(var(--mainMargin)) perspective(1200px) rotateX(0deg)');
            backPopup.style.background = 'rgba(0, 0, 0, 0.7)';
//            backPopup.style.display = 'block';
            backPopup.style.zIndex = 98;
            backPopup.style.opacity = 1;
            backPopup.addEventListener('click', closeFirstPopUp);
            
            
            setTimeout(function() {
//                backPopup.addEventListener('click', closeFirstPopUp);
//                navButton[0].addEventListener('click', openFirstPopUp);
//                popup[0].addEventListener('click', closeFirstPopUp);
                readyUp = 1;
            }, 1000)
            
        }
    }
    
//    close 1
    function closeFirstPopUp() {
        if (readyUp == 1) {
            readyUp = 0;
            
            scrollUnlock()
//        backPopup.removeEventListener('click', closeFirstPopUp);
//        navButton[0].removeEventListener('click', openFirstPopUp);
//        popup[0].removeEventListener('click', closeFirstPopUp);
            popup[0].style.setProperty('transform', '');
            backPopup.style.background = 'rgba(0, 0, 0, 0)';
//            backPopup.style.display = 'none';
            backPopup.style.opacity = 0;
            
            
            setTimeout(function() {
//                navButton[0].addEventListener('click', openFirstPopUp);
//                backPopup.addEventListener('click', closeFirstPopUp);
//                popup[0].addEventListener('click', closeFirstPopUp);
                backPopup.style.zIndex = 0;
                readyUp = 1;
            }, 1000);
        }
    }
    
    
//    open 2
    function openSecondPopUp() {
        if (readyDown == 1) {
            readyDown = 0;
            
            window.scrollBy(0, body.clientHeight);
            scrollLock()
            
            if (window.innerWidth < 610) {
                popup[1].style.setProperty('width', '100vw')
                popup[1].style.setProperty('height', '80vh')
                popup[1].style.left = '0';
            } else {
                popup[1].style.setProperty('height', '600px');
                popup[1].style.setProperty('width', '600px');
            };    
//            navButton[1].removeEventListener('click', openSecondPopUp);
//            backPopup.removeEventListener('click', closeSecondPopUp);
//            popup[1].removeEventListener('click', closeSecondPopUp);
            backPopup.style.top = 'calc(600px + 100vh + 80vh + 900px + 600px - 100vh)';
            popup[1].style.setProperty('transform', 'translateX(0) perspective(1000px) rotateX(0deg)');
            backPopup.style.background = 'rgba(0, 0, 0, 0.7)';
//            backPopup.style.display = 'block';
            backPopup.style.zIndex = 98;
            backPopup.style.opacity = 1;
            backPopup.addEventListener('click', closeSecondPopUp);
            setTimeout(function() {
//                backPopup.addEventListener('click', closeSecondPopUp);
//                navButton[1].addEventListener('click', openSecondPopUp);
//                popup[1].addEventListener('click', closeSecondPopUp);
                readyDown = 1;
            }, 1000)
        }
    }
    
    
//    close 2
    function closeSecondPopUp() {
        if (readyDown == 1) {
            readyDown = 0;
            
            scrollUnlock()
            
            popup[1].style.setProperty('height', '0')
//            navButton[1].removeEventListener('click', openSecondPopUp);
//            backPopup.removeEventListener('click', closeSecondPopUp);
//            popup[1].removeEventListener('click', closeSecondPopUp);
            popup[1].style.setProperty('transform', '');
            backPopup.style.background = 'rgba(0, 0, 0, 0)';
//          backPopup.style.display = 'none';
            backPopup.style.opacity = 0;
            setTimeout(function() {
//                navButton[1].addEventListener('click', openSecondPopUp);
//                backPopup.addEventListener('click', closeSecondPopUp);
//                popup[1].addEventListener('click', closeSecondPopUp);
                readyDown = 1;
                backPopup.style.zIndex = 0;
            }, 900);
        }
    }
}
    
