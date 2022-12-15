<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-card class="my-card" style="width: 300px; height: auto; margin auto">
      <img src="../assets/logo.png" ratio="1" width="200px" />
      <h1>SGMA</h1>
      <q-card-section>
        <div class="text-h6">Login</div>
        <div class="text-subtitle2">by John Doe</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        {{ lorem }}
      </q-card-section>
    </q-card>

    <q-card class="my-card">
      <q-img src="https://cdn.quasar.dev/img/parallax2.jpg">
        <div class="absolute-bottom text-subtitle2 text-center">Title</div>
      </q-img>
    </q-card>
  </div>
</template>

<script>
export default {
  name: "Login",
};
</script>

<style></style>
