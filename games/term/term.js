const boardDisplay = document.querySelector('.board-container');
const keyboard = document.querySelector('.keyboard-container');
const messageDisplay = document.querySelector('.message-container');
const word = "EARTH";
const size = word.length;
const maxLength = 9;
const minLength = 4;
const isGameOver = false;

// TILEBOARD
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

const checkRow = () => {
    if(currentTile > (size - 1)) {
        const guess = guessRows[currentRow].join('')
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

const showMessage = (message) => {
    const messageElement= document.createElement('p')
    messageElement.textContent = message
    messageDisplay.append(messageElement)
}