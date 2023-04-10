<template>
  <q-page id="loginView" class="flex flex-center">
    <transition
      appear
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <q-card class="my-card q-pa-md shadow-12">
        <q-card-section class="q-pt-none">
          <img src="" />
          <h2 class="text-weight-bolder text-primary">SGMA</h2>
        </q-card-section>

        <q-card-section class="q-gutter-sm">
          <q-input
            dense
            v-model="credentials.user"
            label="Login"
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 3) || 'Digite um nome de usuário válido',
            ]"
          >
            <template v-slot:append>
              <q-icon name="person" />
            </template>
          </q-input>
          <q-input
            :type="isPwd ? 'password' : 'text'"
            dense
            v-model="credentials.password"
            label="Senha"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 3) || 'Digite uma senha válida',
            ]"
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
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
import { useAuthStore } from "../stores/auth-store";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";

const credentials = ref({
  user: "",
  password: "",
});
const isPwd = ref(true);
const $q = useQuasar();
const auth = useAuthStore();
const router = useRouter();

const login = async () => {
  try {
    let pass = await auth.login(
      credentials.value.user,
      credentials.value.password
    );

    router.push({ path: "/home" });
  } catch (e) {
    $q.notify({ message: e.message, icon: "warning", color: "negative" });
  }

  (credentials.value.user = ""), (credentials.value.password = "");
};
</script>

<style>
.my-card {
  display: flex;
  flex-direction: column;
  align-items: center;
}
#loginView {
  background: radial-gradient(circle, #26a69a 0%, #014a88 100%);
}
</style>
