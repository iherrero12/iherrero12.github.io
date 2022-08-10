var currentRow = 0;
var currentCol = 0;
var attemptWord = '';
var shareIcons = '';
var objectiveWord = '';

const yellowBox = '%F0%9F%9F%A8';
const whiteBox = '%E2%AC%9C';
const greenBox = '%F0%9F%9F%A9';
const lineBreak = '%0A';

const d = new Date();
const dailyWords = [
    'SCAPE',
    'HORNY',
    'FURER',
    'CROCS',
    'RANAS',
    'BEBEB',
    'SWISH',
    'FURRO'
]

window.onload = function() {
    let gridObject = document.getElementsByClassName("letter-grid")[0];
    let keyboardRows = document.getElementsByClassName("keyboard_row");

    const keyLayout = [
        ['Q','W','E','R','T','Y','U','I','O','P'],
        ['A','S','D','F','G','H','J','K','L','Ñ'],
        ['ENVIAR','Z','X','C','V','B','N','M','DEL']
    ]

    // dividir código en funciones

    /* initGame
            Checks the trip day and copies the corresponding word to objectiveWord variable.
    */
    initGame();

    // initLetterBoxes
    // initKeyboard

    for(let i=0; i<6 ; i++) {
        for(let j=0; j<5; j++) {
            // console.log("col " + i + "fila" + j);
            
            let box = document.createElement("div");
            box.setAttribute('id', 'c'+j+'r'+i);
            box.setAttribute('class', 'letter-box')
            box.setAttribute('justify-text', 'center');
            // box.innerHTML = 'c'+j+'r'+i;
            
            gridObject.appendChild(box);
        }
    }

    for(let row=0; row<keyLayout.length; row++) {
        for(let i=0; i<keyLayout[row].length; i++) {
            let key = document.createElement("button");
            key.setAttribute('id', 'key-' + keyLayout[row][i])
            key.setAttribute('class', 'key');
            key.setAttribute('background-color', 'red');
            key.innerHTML = keyLayout[row][i];

            

            keyboardRows[row].appendChild(key);
        }
    }

    // add keyPressHandler to keyboard
    let keys = document.getElementsByClassName('key');
    for(let i=0; i<keys.length; i++) {
        keys[i].addEventListener("click", function(){keyPressHandler(this.innerHTML)});
    }


}

function initGame() {
    let day = d.getDate();  // 1-31

    if(day == 31) { objectiveWord = dailyWords[0]; }
    else if(day >= 1 && day <= 7) { objectiveWord = dailyWords[day]; } 
    else { objectiveWord = 'IÑIGO' }
}

// handle game logic when key is pressed

function keyPressHandler(keyId) {
    // console.log(keyId);

    switch(keyId.length) {
        case 1:
            if(currentCol<5) {  // if there can still be put letters
                // get cell object
                let cell = document.getElementById('c'+currentCol+'r'+currentRow);
                // change cell text to match the pressed key
                cell.innerHTML = keyId;
                cell.classList.add('filled-letter-box');
                // add the new letter to the attempted word
                attemptWord += keyId;
                // move to next column
                currentCol++;
                console.log('current col:' + currentCol);
                console.log('attemped word: ' + attemptWord);
            }


            break;
        case 3:
            if(currentCol>0) {  // if there is a letter that can be deleted
                // get cell object
                let cell = document.getElementById('c'+ (currentCol-1) +'r'+currentRow)
                // delete cell content
                cell.innerHTML = '';
                cell.classList.remove('filled-letter-box');
                // delete letter from the attempted word
                attemptWord = attemptWord.slice(0, -1);
                // return to previous column
                currentCol--;

                console.log('current col:' + currentCol);
                console.log('attemped word: ' + attemptWord);
            }

            break;
        case 6:
            if(currentCol==5) {
                // color keys according to color schema
                colorKeys(); // and cells too

                // check win condition
                if(attemptWord == objectiveWord) {
                    // if it is correct, end game
                    // call winning condition function
                    setTimeout(winCondition, 1300);
                } else {
                    // if it is incorrect
                    console.log("INCORRECT WORD");
                    // delete attempted word
                    attemptWord = '';         
                    // check if player has lost
                    if(currentRow == 5) {
                        setTimeout(looseCondition(), 1300);
                    } else {
                        // switch to next row and reset column counter                    
                        currentCol = 0;
                        currentRow++;
                    }   
                }
            } else {
                // warn the user there are not enough letters
                console.log("No hay suficientes letras colocadas");
                showNotification('¡No hay suficientes letras!');
            }
            console.log('current col:' + currentCol);
        break;
    }
}

function winCondition() {
    showNotification('¡Felicidades!');
    endGame();

    // change to winning screen
    // remove all keyboard listeners
    // button to share by whatsapp
}

function looseCondition() {
    showNotification('La palabra era ' + objectiveWord);
    endGame();
}

function endGame() {
    // disable keyboard
    //showEndScreen();
    let grid = document.getElementsByClassName('letter-grid')[0];
    let keyboard = document.getElementsByClassName('keyboard')[0];
    grid.classList.add('show-end-screen');
    keyboard.classList.add('show-end-screen');
    setTimeout(removeGameObjects, 1000, grid, keyboard);
    
}

function removeGameObjects(grid, keyboard) {
    grid.remove();
    keyboard.remove();
    displayStats();
}

function displayStats() {
    let wrapper = document.getElementsByClassName('wrapper')[0];
    let screen = document.createElement('div');
    let endscreenTitle = document.createElement('h1');
    let whatsappLink = document.createElement('button');
    let whatsappLogo = document.createElement('i');
    let url = 'https://api.whatsapp.com/send?text=' + 'Tranquility%20Base%20Cafe' + lineBreak + 'Día%20' + d.getDate() + lineBreak + shareIcons;
    let google = 'https://google.com';

    whatsappLink.setAttribute('class', 'share-btn');
    whatsappLink.setAttribute('onclick', "window.open('" + url + "', '_blank')" );
    whatsappLogo.setAttribute('class', 'fa-brands fa-whatsapp');
    whatsappLink.appendChild(whatsappLogo);

    // ver resultado con emojis
    //let result = document.createElement('p');
    //result.innerHTML = 

    // botón para copiar resultado
    // botón para compartir en whatsapp

    endscreenTitle.innerHTML = 'Tranquility Base Wordle';

    screen.appendChild(endscreenTitle);
    screen.appendChild(whatsappLink);

    screen.setAttribute('class', 'end-screen');

    wrapper.setAttribute('display', 'flex');
    wrapper.setAttribute('flex-direction', 'column');
    wrapper.appendChild(screen);

    
}

function showNotification(text) {
    let notification = document.getElementsByClassName('alert')[0];
    notification.children[0].innerHTML = text;
    notification.classList.add('showAlert');
    notification.classList.remove('hide');
    notification.classList.add('show');
    setTimeout(hideNotification, 1500);
}

function hideNotification() {
    let notification = document.getElementsByClassName('alert')[0];
    notification.classList.remove('show');
    notification.classList.add('hide');

}

function showEndScreen() {
    let endscreen = document.getElementById('end-screen');
    console.log(endscreen);
    //endscreen.classList.add('show-end-screen');
    endscreen.classList.remove('hide');
    endscreen.classList.add('show');
}

/*function hideEndScreen() {
    let notification = document.getElementsByClassName('end-screen')[0];
    notification.classList.remove('show');
    notification.classList.add('hide');

}*/

function colorKeys() {
    console.log('PAINT COLORS')
    let message = '';

    // iterate letters
    for(let i=0; i<5; i++) {
        // if the letter at i position is equal in both words
        if(attemptWord[i] == objectiveWord[i]) {
            console.log('position ' + i + ' is correct');
            // get key object
            let tmpKey = document.getElementById('key-' + attemptWord[i]);
            // change key class
            tmpKey.classList.remove("exists")
            tmpKey.classList.add("correct");
            // get cell object
            let tmpCell = document.getElementById('c'+i+'r'+currentRow);
            // change cell class
            tmpCell.classList.remove('exists');
            tmpCell.classList.add('correct');

            // store icon in share message
            message += greenBox

            // IMPORTANT!! USE ONLY ONE CLASS FOR BOTH KEYS AND CELLS. JUST CHANGE THE BACKGROUND COLOR.
        } else {
            // if letter at i is not the same as its position check:
            if(objectiveWord.includes(attemptWord[i])) {
                // the letter is not in it's position
                // in which positions does the letter exist?


                // the letter has been found to be in another box which has not been discovered yet


                // get key object
                let tmpKey = document.getElementById('key-' + attemptWord[i]);
                // change key class
                tmpKey.classList.add("exists");
                // get cell object
                let tmpCell = document.getElementById('c'+i+'r'+currentRow);
                // change cell class
                tmpCell.classList.add('exists');
                
                // store icon in share message
                message += yellowBox;

            } else {
                // get key object
                let tmpKey = document.getElementById('key-' + attemptWord[i]);
                // change key class
                tmpKey.classList.add("no-exists");
                // get cell object
                let tmpCell = document.getElementById('c'+i+'r'+currentRow);
                // change cell class
                tmpCell.classList.add('no-exists');

                // store icon in share message
                message += whiteBox;
            }
            // if that letter exists in the objective word

            // if that letter does not exist in the objective word
        }
    }
    shareIcons += message + lineBreak;
}