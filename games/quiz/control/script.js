const API_KEY = `zHrUsAYXvCDsygrhtoBqRoBAvbgHm9UvpLJ87w1c`;
const API_URL = `https://quizapi.io/api/v1/questions?apiKey=${API_KEY}`;

//Função para buscar as questôes na API
function getQuestions(qtdQuestions, difficulty, category) {
  let FINAL_URL = `${API_URL}&limit=${qtdQuestions}`;
  if (difficulty) {
    FINAL_URL.concat(`&difficulty=${difficulty}`);
  }
  if (category) {
    FINAL_URL.concat(`&category=${category}`);
  }
  return (
    fetch(FINAL_URL)
      // the JSON body is taken from the response
      .then((res) => res.json())
      .then((res) => {
        // The response has an `any` type, so we need to cast
        // it to the `User` type, and return it from the promise
        return res;
      })
  );
}

const question = document.getElementById('question');
const opt1 = document.getElementById('opt1');
const opt2 = document.getElementById('opt2');
const opt3 = document.getElementById('opt3');
const opt4 = document.getElementById('opt4');
const opt5 = document.getElementById('opt5');
const opt6 = document.getElementById('opt6');

let questionArray = [];
if (question) {
  getQuestions(1, undefined, undefined).then((questions) => {
    questionArray.push(questions[0]);
    console.log(questionArray[0]);
    //POPULA QUESTAO COM TEXTO
    question.innerHTML = questionArray[0].question.toString();
    let answers = questionArray[0].answers;
    console.log(answers);

    //POPULA RESPOSTAS COM TEXTO E MOSTRA A DIV DA RESPOSTA
    if (answers.answer_a) {
      opt1.parentElement.style.display = 'block';
      opt1.innerHTML = answers.answer_a
        .toString()
        .replace('<', '&lt;')
        .replace('>', '&gt;');
    }
    if (answers.answer_b) {
      opt2.parentElement.style.display = 'block';
      opt2.innerHTML = answers.answer_b
        .toString()
        .replace('<', '&lt;')
        .replace('>', '&gt;');
    }
    if (answers.answer_c) {
      opt3.parentElement.style.display = 'block';
      opt3.innerHTML = answers.answer_c
        .toString()
        .replace('<', '&lt;')
        .replace('>', '&gt;');
    }
    if (answers.answer_d) {
      opt4.parentElement.style.display = 'block';
      opt4.innerHTML = answers.answer_d
        .toString()
        .replace('<', '&lt;')
        .replace('>', '&gt;');
    }
    if (answers.answer_e) {
      opt5.parentElement.style.display = 'block';
      opt5.innerHTML = answers.answer_e
        .toString()
        .replace('<', '&lt;')
        .replace('>', '&gt;');
    }
    if (answers.answer_f) {
      opt6.parentElement.style.display = 'block';
      opt6.innerHTML = answers.answer_f
        .toString()
        .replace('<', '&lt;')
        .replace('>', '&gt;');
    }
  });
}

let selectedAnswer;

function selectOpt1() {
  clearColors();
  console.log('Option 1 selected!');
  opt1.parentElement.style.backgroundColor = 'var(--yellow)';
  opt1.style.backgroundColor = 'var(--yellow)';
  selectedAnswer = 'answer_a';
}

function selectOpt2() {
  clearColors();
  console.log('Option 2 selected!');
  opt2.parentElement.style.backgroundColor = 'var(--yellow)';
  opt2.style.backgroundColor = 'var(--yellow)';
  selectedAnswer = 'answer_b';
}

function selectOpt3() {
  clearColors();
  console.log('Option 3 selected!');
  opt3.parentElement.style.backgroundColor = 'var(--yellow)';
  opt3.style.backgroundColor = 'var(--yellow)';
  selectedAnswer = 'answer_c';
}

function selectOpt4() {
  clearColors();
  console.log('Option 4 selected!');
  opt4.parentElement.style.backgroundColor = 'var(--yellow)';
  opt4.style.backgroundColor = 'var(--yellow)';
  selectedAnswer = 'answer_d';
}

function selectOpt5() {
  clearColors();
  console.log('Option 5 selected!');
  opt5.parentElement.style.backgroundColor = 'var(--yellow)';
  opt5.style.backgroundColor = 'var(--yellow)';
  selectedAnswer = 'answer_e';
}

function selectOpt6() {
  clearColors();
  console.log('Option 6 selected!');
  opt6.parentElement.style.backgroundColor = 'var(--yellow)';
  opt6.style.backgroundColor = 'var(--yellow)';
  selectedAnswer = 'answer_f';
}

function skip() {
  console.log('Question Skiped!');
}

function answer() {
  console.log('Question Answered!');
  if (selectedAnswer === questionArray[0].correct_answer) {
    console.log('CORRECT ANSWER!');
  } else {
    console.log('WRONG ANSWER!');
  }
}

function clearColors() {
  opt1.parentElement.style.backgroundColor = 'var(--base3)';
  opt1.style.backgroundColor = 'var(--base3)';

  opt2.parentElement.style.backgroundColor = 'var(--base3)';
  opt2.style.backgroundColor = 'var(--base3)';

  opt3.parentElement.style.backgroundColor = 'var(--base3)';
  opt3.style.backgroundColor = 'var(--base3)';

  opt4.parentElement.style.backgroundColor = 'var(--base3)';
  opt4.style.backgroundColor = 'var(--base3)';

  opt5.parentElement.style.backgroundColor = 'var(--base3)';
  opt5.style.backgroundColor = 'var(--base3)';

  opt6.parentElement.style.backgroundColor = 'var(--base3)';
  opt6.style.backgroundColor = 'var(--base3)';
}
