<template>
  <q-page padding>
    <my-table
      title="Cursos"
      :columns="columns"
      :rows="rows"
      :create-route="createRoute"
      :edit-route="editRoute"
      :handle-delete="confirmDelete"
      :return-btn="false"
      :info-btn="false"
      :show="!isLoading"
    />
    <conection-error :show="conectError" />
  </q-page>
</template>
<script setup>
import { useQuasar } from "quasar";
import MyTable from "src/components/MyTable.vue";
import coursesService from "src/services/courses";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import ConectionError from "../common/ConectionError.vue";

const { list, remove } = coursesService();
const $q = useQuasar();

const columns = [
  {
    name: "name",
    label: "Nome",
    field: "name",
    sortable: true,
    align: "left",
  },
  {
    name: "students",
    label: "Alunos Matriculados",
    field: (row) => {
      return row._count.coursesStudents;
    },
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
ConectionError;
const isLoading = ref(true);
const conectError = ref(false);
const rows = ref([""]);
const createRoute = "cursos/cadastro";
const editRoute = "cursos/cadastro";

onMounted(() => {
  getAlunos();
});

const getAlunos = async () => {
  $q.loading.show({
    message: "Buscando informações no servidor...",
  });
  try {
    const data = await list();

    rows.value = data;
    isLoading.value = false;
    $q.loading.hide();
  } catch (e) {
    console.log(e);
    $q.loading.hide();
    conectError.value = true;
  }
};
const confirmDelete = (id) => {
  $q.dialog({
    title: "Confirmar Exclusão?",
    message: "Essa ação não poderá ser desfeita!",
    ok: {
      push: true,
      color: "positive",
      label: "Confirmar",
    },
    cancel: {
      push: true,
      color: "negative",
      label: "Cancelar",
    },
    ersistent: true,
  }).onOk(() => {
    handleDelete(id);
  });
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
    $q.notify({ message: e.message, icon: "warning", color: "negative" });
  }
};
</script>
