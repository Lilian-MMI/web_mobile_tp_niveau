import { kyApi } from './api';

// ALL USERS
const login = (user: any) => kyApi.post('users/login', { json: user }).json();
const register = (user: any) =>
  kyApi.post('users/register', { json: user }).json();
const getCurrentUser = () => kyApi.get('users/me').json();

// ADMIN
const getUsers = () => kyApi.get('users').json();
const deleteUser = (id: string) => kyApi.delete(`users/${id}`).json();
const editUser = (user: any) =>
  kyApi.put(`users/${user._id}`, { json: user }).json();

// SUPER ADMIN
const getAdmins = () => kyApi.get('users/admins').json();
const deleteAdmin = (id: string) => kyApi.delete(`users/admins/${id}`).json();
const editAdmin = (user: any) =>
  kyApi.put(`users/admins/${user._id}`, { json: user }).json();

export {
  login,
  register,
  getCurrentUser,
  getUsers,
  deleteUser,
  editUser,
  getAdmins,
  deleteAdmin,
  editAdmin,
};
