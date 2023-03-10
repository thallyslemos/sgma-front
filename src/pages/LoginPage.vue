<template>
  <q-layout
    style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)"
    class="flex flex-center"
  >
    <q-card class="my-card">
      <q-card-section class="q-pt-none">
        <img src="" />
        <h1>SGMA</h1>
      </q-card-section>

      <q-card-section class="q-gutter-md">
        <q-input filled v-model="user" label="Login" />
        <q-input type="password" filled v-model="password" label="Senha" />
      </q-card-section>
      <q-card-action class="q-pa-md">
        <q-btn color="primary" label="Entrar" @click="login"></q-btn>
      </q-card-action>
    </q-card>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";
import { api } from "boot/axios";

const user = ref("");
const password = ref("");
const http = api;

async function login() {
  let credentials = {
    username: `${user.value}`,
    password: `${password.value}`,
  };
  console.log(credentials);
  let auth = await http.post("users/login", credentials);
  console.log(auth);
  (user.value = ""), (password.value = "");

  return auth;
}
</script>

<style>
.my-card {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
