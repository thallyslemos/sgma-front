<template>
  <q-page class="flex flex-center">
    <h1>Aluno</h1>
    <app-table />
  </q-page>
</template>

<script>
import myTable from "../components/Table.vue";
export default {
  components: { "app-table": myTable },
  name: "Aluno",
};
</script>

<style></style>
