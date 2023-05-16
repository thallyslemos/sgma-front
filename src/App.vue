<template>
  <router-view />
</template>

<script setup>
import { useAuthStore } from "./stores/auth-store";
import { useRoute, useRouter } from "vue-router";

const auth = useAuthStore();
const token = auth.getToken();
const router = useRouter();

if (token) {
  auth.setBearerToken(token);
} else {
  sessionStorage.clear();
  router.replace("/login");
}
</script>
