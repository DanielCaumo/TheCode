// window.addEventListener("load", function() {
//     loadGameState();
// });

var apiKey = 'be7cbf41-2b93-472c-a42b-675042ae3bd1';

async function checkWordExists(word) {
    const response = await fetch(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${apiKey}`);
    const data = await response.json();
    if (!Array.isArray(data) || data.length < 1) {
      return false;
    }
    const firstResult = data[0];
    if (!firstResult || !firstResult.meta) {
      return false;
    }
    return true;
}

// CONTAINERS
const boardDisplay = document.querySelector('.board-container');
const keyboard = document.querySelector('.keyboard-container');
const scoreDisplay = document.querySelector('.score-container-message');
const wordTitle = document.querySelector('.wordTitle');
const wordDescription = document.querySelector('.wordDescription');
const nextGameButton = document.querySelector('#nextGame');
const scoreView = document.querySelector('#running-score');
const recordView = document.querySelector('#running-record');

// SCORE
let score = 0;
let record = 0;
scoreView.textContent = score;
recordView.textContent = record;
function checkRecord(score) {
    if (score >= record){
        record = score;
        recordView.textContent = record;
    }
}

// OPTIONS
let checkedLengths = JSON.parse(localStorage.getItem('checkedLengths')) || ['4', '5', '6', '7', '8', '9'];
const lengthChecks = document.querySelectorAll('input[name="letters"]');
lengthChecks.forEach(function(lengthCheck) {
  if (checkedLengths.includes(lengthCheck.value)) {
    lengthCheck.checked = true;
  } else {
    lengthCheck.checked = false;
  }
});
lengthChecks.forEach(function(lengthCheck) {
  lengthCheck.addEventListener('change', function() {
    if (this.checked) {
      if (!checkedLengths.includes(this.value)) {
        checkedLengths.push(this.value);
      }
    } else {
      const index = checkedLengths.indexOf(this.value);
      if (index != -1) {
        checkedLengths.splice(index, 1);
      }
    }
    if (checkedLengths.length === 0) {
      checkedLengths = ['4', '5', '6', '7', '8', '9'];
      lengthChecks.forEach(function(lengthCheck) {
          lengthCheck.checked = true;
        });
    }
    localStorage.setItem('checkedLengths', JSON.stringify(checkedLengths));
});
});

// WORD
import words from './words-by-length.json' assert { type: 'json'};

const wordsByLength = {
  4: words['4'],
  5: words['5'],
  6: words['6'],
  7: words['7'],
  8: words['8'],
  9: words['9'],
};

const maxLength = 9;
const minLength = 4;

function getRandomWord(checkedLengths = ['4', '5', '6', '7', '8', '9'], wordsByLength) {
    let word = '';
    let definition = '';
  
    while (!checkedLengths.includes(word.length.toString())) {
      const wordsByLengthCopy = JSON.parse(JSON.stringify(wordsByLength));
      
      const lengthKeys = Object.keys(wordsByLengthCopy).filter(key => wordsByLengthCopy[key].length > 0);
      const lengthKey = lengthKeys[Math.floor(Math.random() * lengthKeys.length)];
      const randomWords = wordsByLengthCopy[lengthKey];
      const randomWord = randomWords[Math.floor(Math.random() * randomWords.length)];
      word = randomWord.name;
      definition = randomWord.definition;
    }
    localStorage.setItem('word', word);
    localStorage.setItem('definition', definition);
    localStorage.setItem('size', word.length);

    return { word, definition };
}

let gameWord = getRandomWord(checkedLengths, wordsByLength);
let word = gameWord.word;
let definition = gameWord.definition;
let size = word.length;

// TILEBOARD
let guessRows;

function createTileBoard(size) {
  if (size < minLength || size > maxLength) {
    console.error("Word length must be between " + maxLength + " and " + "characters");
  } else {
    guessRows = new Array(6);
    for (let i = 0; i < guessRows.length; i++) {
      guessRows[i] = new Array(size).fill('');
    }
  }

  boardDisplay.innerHTML = "";

  guessRows.forEach((guessRow, guessRowIndex) => {
    const rowElement = document.createElement('div')
    rowElement.classList.add('guess-row')
    rowElement.setAttribute('id', 'guessRow-' + guessRowIndex)
    guessRow.forEach((_guess, guessIndex) => {
      const tileElement = document.createElement('div')
      tileElement.setAttribute('id', 'guessRow-' + guessRowIndex + '-tile-' + guessIndex)
      tileElement.classList.add('tile')
      rowElement.append(tileElement)
      
      // Add a click event listener to each tile in the row
      tileElement.addEventListener('click', () => {
        currentRow = guessRowIndex;
        currentTile = guessIndex;
      });
    })
    boardDisplay.append(rowElement)
  })

  var rowContainers = document.querySelectorAll('.guess-row')

  rowContainers.forEach(function(container) {
    container.classList.add('grid-' + size + '-columns');
  });
}

createTileBoard(size);


// KEYBOARD
const keys = [
    'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P',
    'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', '«',
    'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'ENTER',
]



keys.forEach(key => {
    const buttonElement = document.createElement('button')
    buttonElement.textContent = key
    buttonElement.classList.add('letterKey')
    buttonElement.setAttribute('id', key)
    buttonElement.addEventListener('click', () => handleClick(key))
    keyboard.append(buttonElement);
})

// ACTIONS
let currentRow = 0
let currentTile = 0
const allowedKeys = ['a', 'A', 'b', 'B', 'c', 'C', 'd', 'D', 'e', 'E', 'f', 'F', 'g', 'G', 'h', 'H', 'i', 'I', 'j', 'J', 'k', 'K', 'l', 'L', 'm', 'M', 'n', 'N', 'o', 'O', 'p', 'P', 'q', 'Q', 'r', 'R', 's', 'S', 't', 'T', 'u', 'U', 'v', 'V', 'w', 'W', 'X', 'x', 'y', 'Y', 'z', 'Z', 'Enter', 'Backspace'];

document.addEventListener('keydown', handleKeyDown);

function handleKeyDown(event) {
  let key = event.key;
  if (allowedKeys.includes(key)) {
    if (key == 'Backspace') {
      key = '«';
    }
    const letter = key.toUpperCase();
    handleClick(letter);
  }
}

const handleClick = (letter) => {
    if (letter === '«') {
        removeLetter()
        return
    }
    if (letter === 'ENTER') {
        checkRow();
        return
    }
    addLetter(letter)
    localStorage.setItem('guessRows', JSON.stringify(guessRows));
}

const addLetter = (letter) => {
    if (currentTile < size && currentRow < 6) {
        const tile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile)
        tile.textContent = letter
        guessRows[currentRow][currentTile] = letter
        tile.setAttribute('data', letter)
        currentTile++
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
  const guess = guessRows[currentRow].join("");

  if (guess.length !== size) {
    showMessage("Insert a word with " + size + " characters", 2000);
    return;
  }
  
  const wordExists = await checkWordExists(guess);
  if (!wordExists) {
    showMessage("Insert a valid word", 2000);
    return;
  }

  flipTile();
  console.log("guess is " + guess, "word is " + word);
  
  if (guess == word) {
    score++;
    scoreView.textContent = score;
    localStorage.setItem('score', score);
    localStorage.setItem('record', record);
    checkRecord(score);
    showMessage('Congratulations!!!', 5000, function(){
        nextGameButton.removeAttribute("hidden");
        nextGameButton.addEventListener("click", function() {startNewGame()});
    });
    showDescription(word, definition);

    // Open the modal here
    const modalResults = document.getElementById('results-modal');
    modalResults.classList.remove('hide');
  } else {
    if (currentRow >= 5) {
      score = 0;
      scoreView.textContent = score;
      localStorage.setItem('score', score);
      checkRecord(score);
      showMessage("Game over!", 5000, function(){
          nextGameButton.removeAttribute("hidden");
          nextGameButton.addEventListener("click", function() {startNewGame()});
      });
      showDescription(word, definition);

      // Open the modal here
      const modal = document.getElementById('results-modal');
      modal.classList.remove('hide');
    }
    if (currentRow < 5) {
      currentRow++;
      currentTile = 0;
    }
  }
};

  let messageTimeout = null;

  const showMessage = (message, duration = 0, callback) => {
    clearTimeout(messageTimeout);
  
    // Remove the previous message element, if it exists
    const previousMessageElement = scoreDisplay.querySelector('p');
    if (previousMessageElement) {
      previousMessageElement.remove();
    }
  
    const messageElement = document.createElement('p');
    messageElement.textContent = message;
    scoreDisplay.append(messageElement);
  
    if (duration > 0) {
      messageTimeout = setTimeout(() => {
        messageElement.textContent = '';
        messageElement.style.display = 'none';
  
        if (callback) {
          callback();
        }
      }, duration);
    }
  };

const showDescription = (word, description, duration = 0) => {
    wordTitle.textContent = word;
    wordDescription.textContent = description;
  
    if (duration > 0) {
      setTimeout(() => {
        descriptionElement.textContent = '';
        descriptionElement.style.display = 'none';
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
    const matchedIndices = []
  
    rowTiles.forEach(tile => {
      guess.push({letter: tile.getAttribute('data'), color: 'grey-overlay'})
    })
  
    guess.forEach((guess, index) => {
      if (guess.letter == word[index]) {
        guess.color = 'green-overlay'
        checkWord = checkWord.replace(guess.letter, '')
        matchedIndices.push(index)
      }
    })
  
    guess.forEach((guess, index) => {
      if (matchedIndices.includes(index)) {
        return
      }
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

function startNewGame() {
    const rowTiles = document.querySelectorAll('.tile');
    const keyButtons = document.querySelectorAll('.letterKey');
    nextGameButton.setAttribute("hidden", "true");
    wordTitle.innerHTML = "";
    wordDescription.innerHTML = "";
    rowTiles.forEach(tile => {
        tile.innerHTML = "";
        tile.classList.remove('flip');
        tile.classList.remove('grey-overlay');
        tile.classList.remove('yellow-overlay');
        tile.classList.remove('green-overlay');
    })
    keyButtons.forEach(key => {
        key.classList.remove('grey-overlay');
        key.classList.remove('yellow-overlay');
        key.classList.remove('green-overlay');
    })
    currentRow = 0
    currentTile = 0
    const newGameWord = getRandomWord(checkedLengths, wordsByLength);
    word = newGameWord.word;
    definition = newGameWord.definition;
    size = word.length;
    createTileBoard(size);
}