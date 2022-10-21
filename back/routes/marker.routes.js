const {
  createMarker,
  getMarkers,
  editMarker,
  deleteMarker,
} = require('../controllers/marker.controller.js');
const { verifyToken } = require('../middlewares/auth.middleware.js');
const { canWrite } = require('../middlewares/permission.middleware.js');

module.exports = (app) => {
  app.post('/markers', [verifyToken, canWrite], createMarker);
  app.get('/markers', [verifyToken], getMarkers);
  app.put('/markers/:markerId', [verifyToken, canWrite], editMarker);
  app.delete('/markers/:markerId', [verifyToken, canWrite], deleteMarker);
};
