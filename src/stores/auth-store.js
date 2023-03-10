import { defineStore } from "pinia";
import { api } from "boot/axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    authUser: null,
  }),
  getters: {
    user: (user) => state.authUser,
  },
  actions: {
    async getToken() {},
    async login(user, password) {
      let credentials = {
        username: `${user}`,
        password: `${password}`,
      };
      let auth = await api.post("users/login", credentials);

      this.authUser = auth.data;
      return auth;
    },
  },
});
