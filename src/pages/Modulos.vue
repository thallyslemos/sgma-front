<template>
  <q-page class="flex flex-center">
    <h1>Modulos</h1>
    <app-table />
  </q-page>
</template>

<script>
import myTable from "../components/Table.vue";
export default {
  components: { "app-table": myTable },
  name: "Modulos",
};
</script>

<style></style>
