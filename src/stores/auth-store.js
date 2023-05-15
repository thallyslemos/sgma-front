import { defineStore } from "pinia";
import { api } from "boot/axios";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const token = ref(sessionStorage.getItem("token"));
  const user = ref(sessionStorage.getItem("user"));

  function setToken(tokenValue) {
    sessionStorage.setItem("token", tokenValue);
    token.value = tokenValue;
    setBearerToken(tokenValue);
  }

  function setBearerToken(token) {
    api.defaults.headers.common.Authorization = "Bearer " + token;
  }

  function getToken() {
    return token.value;
  }

  function setUser(userValue) {
    sessionStorage.setItem("user", JSON.stringify(userValue));
    user.value = userValue;
  }

  function singOut() {
    setToken(null);
    setUser(null);
  }

  return {
    setToken,
    setUser,
    getToken,
    setBearerToken,
    singOut,
  };
});
