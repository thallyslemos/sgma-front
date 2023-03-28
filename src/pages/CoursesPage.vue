<template>
  //Tabela de cursos aqui
  <q-page padding>
    <my-table
      title="Alunos"
      :columns="columns"
      :rows="rows"
      :create-route="createRoute"
      :edit-route="editRoute"
      :handle-delete="handleDelete"
    />
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
const createRoute = "formStudent";
const editRoute = "formStudent";

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
const handleDelete = async (id) => {
  try {
    await remove(id);
    const data = await list();
    rows.value = data;
    $q.notify({
      message: "Aluno excluido com sucesso!",
      icon: "check",
      color: "positive",
    });
  } catch (e) {
    $q.notify({ message: e.message, icon: "warming", color: "negative" });
  }
};
</script>
