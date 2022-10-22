import { kyApi } from './api';

interface IUser {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
  role: string;
  permission: string;
}

// ALL USERS
const login = (user: IUser) => kyApi.post('users/login', { json: user }).json();
const register = (user: IUser) =>
  kyApi.post('users/register', { json: user }).json();
const getCurrentUser = () => kyApi.get('users/me').json();

// ADMIN
const getUsers = () => kyApi.get('users').json();
const deleteUser = (id: string) => kyApi.delete(`users/${id}`).json();
const editUser = (user: IUser) =>
  kyApi.put(`users/${user._id}`, { json: user }).json();

// SUPER ADMIN
const getAdmins = () => kyApi.get('users/admins').json();
const deleteAdmin = (id: string) => kyApi.delete(`users/admins/${id}`).json();
const editAdmin = (user: IUser) =>
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
