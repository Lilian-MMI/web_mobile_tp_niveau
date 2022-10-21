const User = require('../models/user.model.js');
const { createToken } = require('../utils/secret.js');

/* Custom handle errors */
const handleErrors = (err) => {
  let errors = {};

  if (err.message === 'unknow user') {
    errors.user = 'Utilisateur et/ou mot de passe erronés';
  }

  if (err.code === 11000) {
    err.keyValue.username &&
      (errors.username = "Ce nom d'utilisateur est déjà utilisé");
  }

  if (err.message.includes('users validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return Object.keys(errors).length ? errors : err.message;
};

exports.registerUser = async (req, res) => {
  try {
    const input = ({ firstName, lastName, username, password } = req.body);
    const user = new User(input);
    const savedUser = await user.save();

    const { password: userPassword, ...userWithoutPassword } = savedUser._doc;

    res.status(200).json(userWithoutPassword);
  } catch (err) {
    res.status(500).send({ errors: handleErrors(err) });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const input = ({ username, password } = req.body);
    const user = await User.login(input);

    const { password: userPassword, ...userWithoutPassword } = user._doc;

    res.status(200).json({
      user: userWithoutPassword,
      token: createToken(user._id, user.role),
    });
  } catch (err) {
    res.status(500).send(handleErrors(err));
  }
};

exports.getCurrentUser = async (req, res) => {
  const user = await User.findById(req.userId);

  const { password: userPassword, ...userWithoutPassword } = user._doc;

  res.json({ user: userWithoutPassword });
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({
      role: 'user',
    });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).send(handleErrors(err));
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findOne({
      _id: req.params.userId,
      role: 'user',
    });
    await user.remove();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).send(handleErrors(err));
  }
};

exports.editUser = async (req, res) => {
  try {
    const user = await User.findOne({
      _id: req.params.userId,
      role: 'user',
    });
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.username = req.body.username;
    user.permission = req.body.permission;
    const savedUser = await user.save();
    res.status(200).json(savedUser);
  } catch (err) {
    res.status(500).send(handleErrors(err));
  }
};

exports.getAdmins = async (req, res) => {
  try {
    const users = await User.find({
      role: 'admin',
    });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).send(handleErrors(err));
  }
};

exports.deleteAdmin = async (req, res) => {
  try {
    const user = await User.findOne({
      _id: req.params.adminId,
      role: 'admin',
    });
    await user.remove();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).send(handleErrors(err));
  }
};

exports.editAdmin = async (req, res) => {
  try {
    const user = await User.findOne({
      _id: req.params.adminId,
      role: 'admin',
    });
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.username = req.body.username;
    user.permission = req.body.permission;
    user.role = req.body.role;
    const savedUser = await user.save();
    res.status(200).json(savedUser);
  } catch (err) {
    res.status(500).send(handleErrors(err));
  }
};
