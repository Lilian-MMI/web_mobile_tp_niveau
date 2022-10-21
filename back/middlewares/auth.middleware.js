const jwt = require('jsonwebtoken');
const { key } = require('../configs/secret.key.js');

verifyToken = (req, res, next) => {
  const token = req.headers['x-api-key'];

  if (!token) {
    return res.status(403).send({
      message: 'No token provided!',
    });
  }

  jwt.verify(token, key, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: 'Unauthorized!',
      });
    }

    req.userId = decoded.id;
    next();
  });
};

isAdmin = (req, res, next) => {
  const token = req.headers['x-api-key'];

  if (!token) {
    return res.status(403).send({
      message: 'No token provided!',
    });
  }

  jwt.verify(token, key, (err, decoded) => {
    if (err || decoded.role !== 'admin') {
      return res.status(401).send({
        message: 'Unauthorized!',
      });
    }

    req.userId = decoded.id;
    next();
  });
};

isSuperAdmin = (req, res, next) => {
  const token = req.headers['x-api-key'];

  if (!token) {
    return res.status(403).send({
      message: 'No token provided!',
    });
  }

  jwt.verify(token, key, (err, decoded) => {
    if (err || decoded.role !== 'super-admin') {
      return res.status(401).send({
        message: 'Unauthorized!',
      });
    }

    req.userId = decoded.id;
    next();
  });
};

const authJwt = {
  verifyToken,
  isAdmin,
  isSuperAdmin,
};

module.exports = authJwt;
