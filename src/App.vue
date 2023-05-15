<template>
  <router-view />
</template>

<script setup>
import { useAuthStore } from "./stores/auth-store";
import { useRoute, useRouter } from "vue-router";

let auth = useAuthStore();
let token = auth.getToken();
const router = useRouter();

if (token) {
  auth.setBearerToken(token);
} else {
  sessionStorage.clear();
  router.push("/login");
}
</script>
