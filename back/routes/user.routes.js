const {
  registerUser,
  getCurrentUser,
  loginUser,
  getUsers,
  deleteUser,
  editUser,
  getAdmins,
  deleteAdmin,
  editAdmin,
} = require('../controllers/user.controller.js');
const {
  verifyToken,
  isAdmin,
  isSuperAdmin,
} = require('../middlewares/auth.middleware.js');

module.exports = (app) => {
  app.post('/users/register', registerUser);
  app.post('/users/login', loginUser);
  app.get('/users/me', [verifyToken], getCurrentUser);
  // ADMIN
  app.get('/users', [isAdmin], getUsers);
  app.delete('/users/:userId', [isAdmin], deleteUser);
  app.put('/users/:userId', [isAdmin], editUser);
  // SUPER-ADMIN
  app.get('/users/admins', [isSuperAdmin], getAdmins);
  app.delete('/users/admins/:adminId', [isSuperAdmin], deleteAdmin);
  app.put('/users/admins/:adminId', [isSuperAdmin], editAdmin);
};
