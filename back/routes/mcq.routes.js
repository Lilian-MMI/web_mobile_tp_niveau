const {
  getQuizzes,
  getQuiz,
  postAnswers,
} = require('../controllers/mcq.controller');

module.exports = (app) => {
  app.get('/mcq', getQuizzes);
  app.get('/mcq/:quizId', getQuiz);
  app.post('/mcq/:quizId', postAnswers);
};
