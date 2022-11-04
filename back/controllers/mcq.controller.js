const { supabase } = require('../utils/supabase.client');

exports.getQuizzes = async (req, res) => {
  try {
    const { offset = 0, limit = 50 } = req.body;
    const { difficulty, label } = req.query;

    let quizzes = [];
    if (difficulty && label) {
      quizzes = await supabase
        .from('quizzes')
        .select('*')
        .eq('difficulty', difficulty)
        .eq('label', label)
        .range(offset, offset + limit);
    } else if (difficulty) {
      quizzes = await supabase
        .from('quizzes')
        .select('*')
        .eq('difficulty', difficulty)
        .range(offset, offset + limit);
    } else if (label) {
      quizzes = await supabase
        .from('quizzes')
        .select('*')
        .eq('label', label)
        .range(offset, offset + limit);
    } else {
      quizzes = await supabase
        .from('quizzes')
        .select('*')
        .range(offset, offset + limit);
    }

    res.status(200).json(quizzes);
  } catch (err) {
    res.status(500).send('Error getting quizzes');
  }
};

exports.getQuiz = async (req, res) => {
  try {
    const quiz = await supabase
      .from('quizzes')
      .select('*')
      .eq('_id', req.params.quizId);

    const parsedQuestion = JSON.parse(quiz.data[0].questions);

    const questions = await supabase
      .from('questions')
      .select('_id, title, choice1, choice2, choice3, choice4')
      .in('_id', parsedQuestion);

    res.status(200).json(questions);
  } catch (err) {
    res.status(500).send('Error getting quiz');
  }
};

exports.postAnswers = async (req, res) => {
  try {
    const { answers } = req.body;

    const quiz = await supabase
      .from('quizzes')
      .select('*')
      .eq('_id', req.params.quizId);

    const parsedQuestion = JSON.parse(quiz.data[0].questions);

    const { data: questions } = await supabase
      .from('questions')
      .select('*')
      .in('_id', parsedQuestion);

    let score = 0;
    let good_answers = [];
    let bad_answers = [];

    questions.forEach((question, index) => {
      if (question.answer === answers[index]) {
        score++;
        good_answers.push(question._id);
      } else {
        bad_answers.push(question._id);
      }
    });

    await supabase.from('mcq').insert([
      {
        quizz_id: req.params.quizId,
        score,
        good_answers,
        bad_answers,
        good: good_answers.length,
        bad: bad_answers.length,
      },
    ]);

    res.status(200).json({ score });
  } catch (err) {
    res.status(500).send('Error posting answers');
  }
};
