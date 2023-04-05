<template>
  <q-page id="loginView" class="flex flex-center">
    <transition
      appear
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <q-card class="my-card">
        <q-card-section class="q-pt-none">
          <img src="" />
          <h1>SGMA</h1>
        </q-card-section>

        <q-card-section class="q-gutter-md">
          <q-input filled v-model="credentials.user" label="Login" />
          <q-input
            type="password"
            filled
            v-model="credentials.password"
            label="Senha"
          />
        </q-card-section>
        <q-card-actions class="q-pa-md">
          <q-btn color="primary" label="Entrar" @click="login"></q-btn>
        </q-card-actions>
      </q-card>
    </transition>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { api } from "boot/axios";
import { useAuthStore } from "../stores/auth-store";
import { useRoute, useRouter } from "vue-router";

const credentials = ref({
  user: "",
  password: "",
});

const auth = useAuthStore();
const router = useRouter();

const login = async () => {
  try {
    let pass = await auth.login(
      credentials.value.user,
      credentials.value.password
    );

    router.push({ path: "/home" });
  } catch (error) {
    alert(error.message);
  }

  (credentials.value.user = ""), (credentials.value.value = "");
};
</script>

<style>
.my-card {
  display: flex;
  flex-direction: column;
  align-items: center;
}
#loginView {
  background: radial-gradient(circle, #35a2ff 0%, #014a88 100%);
}
</style>
