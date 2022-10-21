const User = require('../models/user.model');

const canWrite = (req, res, next) => {
  const userId = req.userId;

  if (!userId) {
    return res.status(403).send({
      message: 'No token provided!',
    });
  }

  User.findById(userId, (err, user) => {
    if (err) {
      return res.status(500).send({
        message: 'Error retrieving user with id ' + userId,
      });
    }

    if (!user) {
      return res.status(404).send({
        message: 'User not found with id ' + userId,
      });
    }

    if (user.permission !== 'edit') {
      return res.status(400).send({
        message: 'Not authorized to write, read only',
      });
    }

    next();
  });
};

const permissionMiddleware = {
  canWrite,
};

module.exports = permissionMiddleware;
