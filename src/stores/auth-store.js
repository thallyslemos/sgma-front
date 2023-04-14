import { defineStore } from "pinia";
import { api } from "boot/axios";
import { ref } from "vue";

export const useAuthStore = defineStore(
  "auth",
  () => {
    const token = ref(sessionStorage.getItem("token"));
    const user = ref(sessionStorage.getItem("user"));

    function setToken(tokenValue) {
      sessionStorage.setItem("token", tokenValue);
      token.value = tokenValue;
      api.defaults.headers.common.Authorization = "Bearer " + tokenValue;
    }

    function setUser(userValue) {
      sessionStorage.setItem("user", JSON.stringify(userValue));
      user.value = userValue;
    }

    return {
      setToken,
      setUser,
    };
  }
  // {
  //   state: () => ({
  //     authUser: null,
  //   }),
  //   getters: {
  //     user: (user) => state.authUser,
  //   },
  //   actions: {
  //     async getToken() {},
  //     async login(user, password) {
  //       let payload = {
  //         username: `${user}`,
  //         password: `${password}`,
  //       };
  //       await api.post("auth/login", payload).then((response) => {
  //         const { access_token } = response.data;
  //         api.defaults.headers.common.Authorization = "Bearer " + access_token;
  //         window.sessionStorage.setItem("token", JSON.stringify(access_token));
  //       });
  //     },
  //   },
  // }
);
