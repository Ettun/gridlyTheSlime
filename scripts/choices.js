let advanceClick = false;

const populateQuestions = function(slide) {
    const choiceContainer = document.getElementById('choiceContainer');
    const selectedChoice = choices[slide];
    if (choices[slide] && choices[slide].options) {
        for (x = 0; x < choiceContainer.children.length; x++) {
            choiceContainer.children[x].children[1].textContent = selectedChoice.options[x];
        }
    }
}

const heartbreak = function() {
    const heartBox = document.getElementById('heartbox');
    heartBox.removeChild(heartBox.children[0]);
    if (heartBox.children.length === 0) {
        const gridly = document.getElementById('gridly');
        const gridlies = document.getElementsByClassName('gridly');
        gridlies[2].classList.add('dead');
        gridly.classList.add('dead');        
        const death = document.createElement('img');
        death.src = 'assets/skull.png';
        heartBox.appendChild(death);
        const endTitle = document.getElementById('endTitle');
        endTitle.textContent = "The End";
    }
}

const selectChoice = function(choice) {
    if (advanceClick) return;
    const positions = choices[slide].options[choice].split(' / ');
    positions.forEach((position, index) => {
        styleUpdate(null, gridProps[index], position);
    })
    if (parseInt(choice, 0) !== choices[slide].answer) {
        document.getElementById('gridly').classList.add('pain');
        heartbreak();
    } else {
        document.getElementById('gridly').classList.add('joy');
    }

    advanceClick = true;
}