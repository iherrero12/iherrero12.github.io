var currentRow = 0;
var currentCol = 0;
var attemptWord = '';
var objectiveWord = 'IÑIGO';

window.onload = function() {
    let gridObject = document.getElementsByClassName("letter-grid")[0];
    let keyboardRows = document.getElementsByClassName("keyboard_row");
    console.log(gridObject);

    const keyLayout = [
        ['Q','W','E','R','T','Y','U','I','O','P'],
        ['A','S','D','F','G','H','J','K','L','Ñ'],
        ['ENVIAR','Z','X','C','V','B','N','M','DEL']
    ]

    // dividir código en funciones

    /* initGame
            Checks the trip day and copies the corresponding word to objectiveWord variable
    */

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
                    winningCondition();
                } else {
                    // if it is incorrect
                    console.log("INCORRECT WORD");
                    // delete attempted word
                    attemptWord = '';                    
                    // switch to next row and reset column counter                    
                    currentCol = 0;
                    currentRow++;
                }


            } else {
                // warn the user there are not enough letters
                console.log("No hay suficientes letras colocadas");
            }
            console.log('current col:' + currentCol);
        break;
    }
}

function winningCondition() {
    console.log("YOU WIN! OBJECTIVE WORD WAS " + objectiveWord);
    // change to winning screen
    // remove all keyboard listeners
    // button to share by whatsapp
}

function colorKeys() {
    console.log('PAINT COLORS')
    // iterate words
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
            // IMPORTANT!! USE ONLY ONE CLASS FOR BOTH KEYS AND CELLS. JUST CHANGE THE BACKGROUND COLOR.
        } else {
            // if letter at i is not the same as its position check:
            if(objectiveWord.includes(attemptWord[i])) {
                // get key object
                let tmpKey = document.getElementById('key-' + attemptWord[i]);
                // change key class
                tmpKey.classList.add("exists");
                // get cell object
                let tmpCell = document.getElementById('c'+i+'r'+currentRow);
                // change cell class
                tmpCell.classList.add('exists');

            } else {
                // get key object
                let tmpKey = document.getElementById('key-' + attemptWord[i]);
                // change key class
                tmpKey.classList.add("no-exists");
                // get cell object
                let tmpCell = document.getElementById('c'+i+'r'+currentRow);
                // change cell class
                tmpCell.classList.add('no-exists');
            }
            // if that letter exists in the objective word

            // if that letter does not exist in the objective word
        }
    }
}