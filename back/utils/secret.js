const jwt = require('jsonwebtoken');
const { key } = require('../configs/secret.key.js');

// 1 * 24 * 60 * 60; -> 1 days (in s)
const createToken = (id, role, expiresIn = 1 * 24 * 60 * 60) => {
  return jwt.sign(
    {
      id,
      role,
    },
    key,
    {
      expiresIn,
    }
  );
};

module.exports = {
  createToken,
};
