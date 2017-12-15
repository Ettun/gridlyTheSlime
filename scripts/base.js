let slide = 0;

const choices = [
    {},
    { 
        answer: 1, 
        layout:{
            guards: [],
            towers: ['f']
        },
        options: ['1 / 1 / 1 / 1', '2 / 2 / 2 / 3', '3 / 2 / 3 / 3', '5 / 1 / 1 / 1'] 
    },
    { 
        answer: 3, 
        layout:{
            guards: ['f', 'p'],
            towers: ['o']
        },
        options: ['2 / 3 / 2 / 3', '1 / 4 / 2 / 3', '3 / 3 / 5 / 5', '4 / 2 / 4 / 4'] 
    },
    { 
        answer: 0, 
        layout:{
            guards: ['e', 'o', 'd', 'g'],
            towers: ['b', 'f', 'm']
        },
        options: ['5 / 2 / 1 / 2', '0 / 3 / 0 / 5', '1 / 2 / 3 / 4', '1 / 5 / 5 / 1'] 
    },
    { 
        answer: 1, 
        layout:{
            guards: ['e', 'o', 'p'],
            towers: ['b', 'g', 'l']
        },
        options: ['a / y-end / b / z-end', 'a / x / d / z-end', 'a  / x / d-end / z', 'b / y / b-end / y-end'] 
    },
    { 
        answer: 2, 
        layout:{
            guards: ['b', 'e', 'l', 'n'],
            towers: ['f', 'k']
        },
        options: ['d  / w / span / span 2', 'd / z-end / span 3 / 1', 'b / x / span 3 / span 2', 'b  / x / span 3 / span'] 
    }
]

let slideLength = choices.length;
const gridProps = [
    'grid-row-start',
    'grid-column-start',
    'grid-row-end',
    'grid-column-end'
]

document.onkeydown = (event) => {
    if (event.which === 39) {
        nextSlide()
    }

    if (event.which === 37) {
        prevSlide();
    }
}

const prepNextSlide = function() {
    document.getElementById('gridly').classList.remove('pain');           
    document.getElementById('gridly').classList.remove('joy');
    advanceClick = false;   
}

const nextSlide = function() {
    prepNextSlide();
    if (slide === slideLength - 1) {
        slide ++;
        orderSlides();      
    } else if (slide < slideLength) {
        slide ++;
        onResetClick();
        populateQuestions(slide);          
        orderSlides();            
    }
}

const prevSlide = function() {
    prepNextSlide(); 
    if (slide > 0) {
        slide --;
        onResetClick();
        populateQuestions(slide);
        orderSlides();
    }
}

const orderSlides = function() {
    const slideList = document.getElementsByClassName('gameSlide');            
    switch (slide) {
        case 0:
            for (x = 0; x < slideList.length; x++) {    
                slideList[x].style.display = 
                    slideList[x].getAttribute('data-group') === 'group1' ? 'flex' : 'none';   
            }
            break;
        case slideLength:
            for (x = 0; x < slideList.length; x++) {    
                slideList[x].style.display = 
                    slideList[x].getAttribute('data-group') === 'group3' ? 'flex' : 'none';   
            }
            break;
        default:
            for (x = 0; x < slideList.length; x++) {    
                slideList[x].style.display = 
                    slideList[x].getAttribute('data-group') === 'group2' ? 'flex' : 'none';   
            }
            break;    
    }

    const gridContainer = document.getElementById('bottomGrid');
    if (!choices[slide] || !choices[slide].layout) return;

    gridContainer.style.gridRowGap = slide === slideLength - 1 ? "0" : "16px";
    gridContainer.style.gridColumnGap = slide === slideLength - 1 ? "0" : "16px";

    if (slide === slideLength - 1 || slide === slideLength - 2) {
        document.getElementById('roadmap').style.display = 'block';
    } else {
        document.getElementById('roadmap').style.display = 'none';        
    }

    const articles = gridContainer.getElementsByTagName('article');

    for (x = 0; x < articles.length; x++) {    
        articles[x].classList.remove('guard');
        articles[x].classList.remove('tower');
    }

    choices[slide].layout.guards.forEach((pos) => {
        gridContainer.getElementsByClassName(pos)[0].classList.add('guard');
    })

    choices[slide].layout.towers.forEach((pos) => {
        gridContainer.getElementsByClassName(pos)[0].classList.add('tower');
    })
}

const styleUpdate = function(event, property, value) {
    const gridly = document.getElementById('gridly');
    const newValue = event ? event.target.textContent : value;
    if (newValue) {
        gridly.style[property] = newValue; 
        if (value) {
            document.getElementById(property).textContent = newValue;                   
        }
    }
}

const onResetClick = function() {
    const gridly = document.getElementById('gridly');
    gridly.style[gridProps[0]] = 1;
    gridly.style[gridProps[1]] = 1;
    gridly.style[gridProps[2]] = 1;
    gridly.style[gridProps[3]] = 1;   
    
    document.getElementById('grid-row-start').textContent = 1;
    document.getElementById('grid-row-end').textContent = 1;
    document.getElementById('grid-column-start').textContent = 1;    
    document.getElementById('grid-column-end').textContent = 1;
}

window.onload = function() {
    document.getElementsByClassName('gameSlide')[0].style.display = 'flex';    
}
