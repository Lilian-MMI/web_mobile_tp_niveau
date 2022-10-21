export const useUserStore = defineStore({
  id: 'userStore',

  state: () => ({
    currentUser: null as any,
    loading: false,
    error: null,
  }),

  getters: {
    isLogin(): boolean {
      return this.currentUser ?? false;
    },
  },

  actions: {
    SET_USER(user: any) {
      this.currentUser = user;
    },
  },
});
