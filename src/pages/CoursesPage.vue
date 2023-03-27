<template>
  <q-page padding>
    <my-table title="Alunos" :columns="columns" :rows="rows" />
  </q-page>
</template>
<script setup>
import { useQuasar } from "quasar";
import MyTable from "src/components/MyTable.vue";
import studentsService from "src/services/studenst";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const { list, remove } = studentsService();
const $q = useQuasar();
const route = useRoute();

const columns = [
  {
    name: "name",
    label: "Nome",
    field: "name",
    sortable: true,
    align: "left",
  },
  {
    name: "cpf",
    label: "CPF",
    field: "cpf",
    sortable: true,
    align: "left",
  },
  {
    name: "birth_date",
    label: "Data de Nascimento",
    field: "birth_date",
    sortable: true,
    align: "left",
  },
  {
    name: "actions",
    label: "Ações",
    field: "actions",
    sortable: true,
    align: "left",
  },
];
const rows = ref([""]);

onMounted(() => {
  getAlunos();
});

const getAlunos = async () => {
  try {
    const data = await list();
    rows.value = data;
    rows.value.map((data) => {
      data.birth_date = data.birth_date.substring(0, 10);
    });
  } catch (e) {
    console.log(e);
  }
};
</script>
