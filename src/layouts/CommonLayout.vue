<template>
  <q-layout view="lHh Lpr lFf" class="shadow-2 rounded-borders">
    <q-header elevated class="bg-primary">
      <q-toolbar>
        <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
        <q-toolbar-title>Header</q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "CommonLayout",

  components: {},

  setup() {},
});
</script>
