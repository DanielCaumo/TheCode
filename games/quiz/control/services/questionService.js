const API_KEY = 'zHrUsAYXvCDsygrhtoBqRoBAvbgHm9UvpLJ87w1c';
const API_URL = 'https://quizapi.io/api/v1/questions?apiKey=${API_KEY}';

export default function getQuestions(qtdQuestions, difficulty, category) {
  // For now, consider the data is stored on a static `users.json` file
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
