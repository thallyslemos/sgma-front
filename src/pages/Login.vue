<template>
  <q-page class="felx flex-center bg-primary">
    <q-card class="loginCard">
      <img src="../assets/logo.png" ratio="1" width="200px" />
      <h3>SGMA</h3>
      <q-card-section>
        <div class="text-h5">Login</div>
      </q-card-section>

      <q-card-section class="q-pt-none full-width">
        <q-input filled v-model="login.email" label="Email" />
        <q-input
          class="q-mt-sm"
          v-model="login.password"
          filled
          label="Senha"
          :type="login.isPwd ? 'password' : 'text'"
        >
          <template v-slot:append>
            <q-icon
              :name="login.isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="login.isPwd = !login.isPwd"
            />
          </template>
        </q-input>
      </q-card-section>
      <q-card-actions class="full-width">
        <q-btn
          class="q-mx-sm"
          color="primary"
          label="Entrar"
          @click="$router.push({ name: 'Home' })"
        />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      login: {
        email: "",
        password: "",
        isPwd: true,
      },
    };
  },
};
</script>

<style scoped>
.loginCard {
  align-self: center;
  display: flex;
  flex-direction: column;
  width: 300px;
  height: auto;
  margin: auto;
  align-items: center;
  padding: 1em 0;
}
.q-btn {
  width: 100%;
}
</style>
