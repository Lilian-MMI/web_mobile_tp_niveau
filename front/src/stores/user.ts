interface IUser {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
  role: string;
  permission: string;
}

export const useUserStore = defineStore({
  id: 'userStore',

  state: () => ({
    currentUser: null as IUser | null,
    loading: false,
    error: null,
  }),

  getters: {
    isLogin(): boolean {
      return !!this.currentUser ?? false;
    },
  },

  actions: {
    SET_USER(user: IUser | null) {
      this.currentUser = user;
    },
  },
});
