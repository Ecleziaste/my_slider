"use strict";

const track = document.querySelector ('.slider__track');
const item = document.querySelector ('.slider__item');
    //оформили массив на основе объекта 
let itemss = document.querySelectorAll ('.slider__item');
let items = Array.from(itemss);
const btnPrev = document.querySelector ('.btn__prev');
const btnNext = document.querySelector ('.btn__next');
const btns = document.querySelectorAll ('.slider__buttons');
const dot = document.querySelector ('.dot');
const dots = document.querySelectorAll ('.dot');
    //создаем индекс массива items
    //точка отсчета, также начальный слайд и индекс слайда (изменяемая переменная)
let slideIndex = 1;
    //готовим переменные для манипуляций с массивом. не понадобилось, но пусть будут для удобства понимания в основной ф-ии
let lastSlide = items[items.length-1];
let firstSlide = items[0];

    // навешиваем ивент листенеры на кнопки, чтобы активировать ф-ии
btnNext.addEventListener('click', () => {
    switchSlide(1);
    currentDot(slideIndex);
    disableBtns();
    rightAnimation();
});

btnPrev.addEventListener('click', () => {
    switchSlide(-1);
    currentDot(slideIndex);
    disableBtns();
    leftAnimation();
});


//Functions Expressions
    // в зависимости от нажатой кнопки передаем n = 1 или n = -1 внутрь основной ф-ии showSlide,
    // изменяя значение slideIndex на единицу в ту или иную сторону. мы отталкиваемся от SlideIndex с помощью кнопок на единицу
const switchSlide = (n) => {
    showSlide(slideIndex += n);
};
    // функции для отображения предыдущего и следующего слайда относительно отображаемого в текущий момент в основной ф-ии
const displayNext = () => {
    items[slideIndex].style.display = "flex";
};
const displayPrevious = () => {
    items[slideIndex-2].style.display = "flex";
};
    //перебираем форычем все элементы массива dots и убираем у всех детей класс окрашивания,
    //потом добавляем его нужному диву
const currentDot = (slideIndex) => {
    dots.forEach ((dot) => {
        dot.classList.remove ('black__dot');
    });
    dots[slideIndex-1].classList.add ('black__dot');
};

    //ф-ии включения/отключения кнопок
const disableBtns = () => {
    btnPrev.disabled = true;
    btnNext.disabled = true;
};
const enableBtns = () => {
    btnPrev.disabled = false;
    btnNext.disabled = false;
};

    //увеличиваем или уменьшаем скорость анимации меняя второй параметр метода setInterval и меняя позицию на большее/меньшее значение
    //меняя значение переменной pos, мы меняем начальную позицию выезжаемого слайда относительно контейнера слайда(окошка)
    // максимальная плавность движения при изменении pos на единицу(pos += 1; pos -= 1; )
    //упрощенно:  speed- скорость выполнения шагов(1 макс.), smooth - точность шага (1 макс.)
const leftAnimation = (multiply = 1, smooth = 4, speed = 2) => {
    let pos = -track.clientWidth * multiply;
    // let pos = -500;
    let animate = setInterval(function(){
        if ( pos >= -smooth ) {
        clearInterval(animate);
        enableBtns()
        }
        pos += smooth; 
        track.style.transform = `translateX(${pos}px)`;
    }, speed);
};

const rightAnimation = (multiply = 1, smooth = 4, speed = 2) => {
    let pos = track.clientWidth * multiply;
    // let pos = 500;
    let animate = setInterval(function(){
        if ( pos <= smooth ) {
        clearInterval(animate);
        enableBtns()
        }
        pos -= smooth; 
        track.style.transform = `translateX(${pos}px)`;
    // track.style.transform = "translateX("+pos+"px)";
    }, speed);
};

// dots.forEach ((dot) => {
//     dot.addEventListener('click', (j) => {
//  currentSlide(j)
// });
// });


const currentSlide = (j) => {
    
    let i = slideIndex;

    if ( j === slideIndex ) {
        showSlide(j);
        currentDot(j);
    }   else if ( j > i ) {
        currentDot(j);
        let currentSlideAnim = setInterval(function(){
            i++;
            if( i >= j ){
                clearInterval(currentSlideAnim);
            }
            switchSlide(1);
            rightAnimation(1, 10, 1);
            }, 50);
        
    }   else if ( j < i ) {
        currentDot(j);
        let currentSlideAnim = setInterval(function(){
            i--;
            if( i <= j ){
                clearInterval(currentSlideAnim);
            }
            switchSlide(-1);
            leftAnimation(1, 10, 1);
            }, 50);
        }; 
        
};

// const currentSlide = (j) => {
//     showSlide(j);
//     let dotNumber = j;
//     return dotNumber;
// };

    // Основная функция.
    // В зависимости от slideIndex мы отображаем только 1 элемент массива items, остальным ставим display none
    // в условиях присваиваем значение slideIndex n ради ф-ии currentDot и дальнейших расчетов
    // UPD: з0чем, если можно справиться, используя значение, уже хранящееся в slideIndex


const showSlide = (n) => {
    //UPD: присвоение slideIndex = n; ради передачи значений из html элементов п по клику, по сути это присвоение и было передаваемо в старой версии ф-ии currentSlide  
    items.forEach ((item) => {
        item.style.display = "none";
    });
    
    if ( n > items.length ) {
        slideIndex = 1;
        items[slideIndex-1].style.display = "flex";

        lastSlide.style.display = "flex";
        track.style.justifyContent = "flex-start";
        track.style.flexDirection = "row-reverse";
    }   else if ( n < 1 ) {
        slideIndex = items.length;
        items[slideIndex-1].style.display = "flex";
        
        firstSlide.style.display = "flex";
        track.style.justifyContent = "flex-end";
        track.style.flexDirection = "row-reverse";
        // items.push(firstSlide);
    }   else {
        slideIndex = n;
        items[slideIndex-1].style.display = "flex";
        track.style.flexDirection = "row";
    };

    if ( slideIndex != 1 && slideIndex != items.length ) {
        track.style.justifyContent = "center";
        displayPrevious();
        displayNext();
    }   else if ( slideIndex <= 2 & (n > items.length) == false ) {
        track.style.justifyContent = "flex-start";
        displayNext();
    }   else if ( slideIndex >= items.length & (n < 1) == false ) {
        track.style.justifyContent = "flex-end";
        displayPrevious();
    }; 
};
        
//Functions Call
    // показываем слайд, соответствующий текущему slideIndex и окрашиваем точку
showSlide(slideIndex);
currentDot(slideIndex);


    // возможно, нужно было отображать всю ленту слайдов и двигать её (кроме тех случаев, когда надо показывать крайние слайды и осуществляется преход с первого на последний/с последнего на первый),
    // чтобы слайдер кооректно работал при 1-2 дивах всего, а не от трёх. Отображение, зависящее от track.clientWidth может быть решением проблемы,
    // то есть мы двигаем ленту слайдов на эту велииу по оси X, когда переходим на последний и первый с краёв - копируем, добавлем 1ый/последний в массив и удаляем потом, когда анимация закончена