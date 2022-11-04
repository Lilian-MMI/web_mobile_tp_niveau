const {
  getWeather,
  getMCQ,
} = require('../controllers/dashboard.controller.js');
const { isAdmin } = require('../middlewares/auth.middleware.js');

module.exports = (app) => {
  app.get('/dashboard/weather', [isAdmin], getWeather);
  app.get('/dashboard/mcq', [isAdmin], getMCQ);
};
