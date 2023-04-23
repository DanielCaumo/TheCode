var apiKey = 'be7cbf41-2b93-472c-a42b-675042ae3bd1';

async function checkWordExists(word) {
    const response = await fetch(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${apiKey}`);
    const data = await response.json();
    return Array.isArray(data) && data.length > 0;
}

async function test(tested) {
    const wordExists = await checkWordExists(tested);
    if(!wordExists) {
        console.log("palavra não existe")
        showMessage('Insert a valid word', 2000);
        return;
    } else {
        console.log("palavra existe")
    }
}

const tested = "bbbbb"
test(tested);

// CONTAINERS
const boardDisplay = document.querySelector('.board-container');
const keyboard = document.querySelector('.keyboard-container');
const messageDisplay = document.querySelector('.message-container');

// WORD
const maxLength = 9;
const minLength = 4;
import words from './words.json' assert { type: 'json'};
function getRandomWord() {
    const randomIndex = Math.floor(Math.random() * words.length);
    const randomWord = words[randomIndex];
    const word = randomWord.name;
    const definition = randomWord.definition;
    return { word, definition };
}
const { word, definition } = getRandomWord();
const size = word.length;

// TILEBOARD
let guessRows;
if (size < minLength || size > maxLength) {
    console.error("Word length must be between " + maxLength + " and " + "characters");
  } else {
    guessRows = new Array(6);
    for (let i = 0; i < guessRows.length; i++) {
      guessRows[i] = new Array(size).fill('');
    }
}

guessRows.forEach((guessRow, guessRowIndex) => {
    const rowElement = document.createElement('div')
    rowElement.classList.add('guess-row')
    rowElement.setAttribute('id', 'guessRow-' + guessRowIndex)
    guessRow.forEach((_guess, guessIndex) => {
        const tileElement = document.createElement('div')
        tileElement.setAttribute('id', 'guessRow-' + guessRowIndex + '-tile-' + guessIndex)
        tileElement.classList.add('tile')
        rowElement.append(tileElement)
    })
    boardDisplay.append(rowElement)
})

var rowContainers = document.querySelectorAll('.guess-row')

rowContainers.forEach(function(container) {
    container.classList.add('grid-' + size + '-columns');
});

// KEYBOARD
const keys = [
    'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P',
    'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L',
    'enter', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '«',
]

keys.forEach(key => {
    const buttonElement = document.createElement('button')
    buttonElement.textContent = key
    buttonElement.setAttribute('id', key)
    buttonElement.addEventListener('click', () => handleClick(key))
    keyboard.append(buttonElement);
})

// ACTIONS
const isGameOver = false;
let currentRow = 0
let currentTile = 0

const handleClick = (letter) => {
    console.log('clicked', letter)
    if (letter === '«') {
        removeLetter()
        console.log(guessRows)
        return
    }
    if (letter === 'enter') {
        checkRow();
        console.log('check row')
        return
    }
    addLetter(letter)
}

const addLetter = (letter) => {
    if (currentTile < size && currentRow < 6) {
        const tile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile)
        tile.textContent = letter
        guessRows[currentRow][currentTile] = letter
        tile.setAttribute('data', letter)
        currentTile++
        console.log(guessRows)
    }
}

const removeLetter = () => {
    if (currentTile > 0) {
        currentTile--
        const tile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile)
        tile.textContent = ''
        guessRows[currentRow][currentTile] = ''
        tile.setAttribute('data', '')
    }
}

const checkRow = async () => {
    console.log(currentRow)
    if(currentTile > (size - 1)) {
        const guess = guessRows[currentRow].join('')

        const wordExists = await checkWordExists(guess);
        if(!wordExists) {
            showMessage('Insert a valid word', 2000);
            return;
        }
        
        flipTile()
        console.log('guess is ' + guess, 'wordle is ' + word)
        if(guess == word) {
            showMessage('Congratulations!')
            isGameOver = true
        } else {
            if (currentRow >= 5) {
                isGameOver = true
                showMessage('Game Over')
                return
            }
            if (currentRow < 5) {
                currentRow++
                currentTile = 0
            }
        } 
    }
}

const showMessage = (message, duration = 0) => {
    const messageElement= document.createElement('p');
    messageElement.textContent = message;
    messageDisplay.append(messageElement)
  
    if (duration > 0) {
      setTimeout(() => {
        messageElement.textContent = '';
        messageElement.style.display = 'none';
      }, duration);
    }
  };

const addColorToKey = (keyLetter, color) => {
    const key = document.getElementById(keyLetter)
    key.classList.add(color)
}

const flipTile = () => {
    const rowTiles = document.querySelector('#guessRow-' + currentRow).childNodes
    let checkWord = word
    const guess = []
    
    rowTiles.forEach(tile => {
        guess.push({letter: tile.getAttribute('data'), color: 'grey-overlay'})
    })

    guess.forEach((guess, index) => {
        if (guess.letter == word[index]) {
            guess.color = 'green-overlay'
            checkWord = checkWord.replace(guess.letter, '')
        }
    })

    guess.forEach(guess => {
        if (checkWord.includes(guess.letter)) {
            guess.color = 'yellow-overlay'
            checkWord = checkWord.replace(guess.letter, '')
        }
    })

    rowTiles.forEach((tile, index) => {
        setTimeout(() => {
            tile.classList.add('flip')
            tile.classList.add(guess[index].color)
            addColorToKey(guess[index].letter, guess[index].color)
        }, 500 * index)
    })
}