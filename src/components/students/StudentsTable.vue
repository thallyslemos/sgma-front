<template>
  <q-page padding>
    <my-table
      title="Alunos"
      :columns="columns"
      :rows="rows"
      :create-route="createRoute"
      :edit-route="editRoute"
      :info-route="infoRoute"
      :handle-delete="confirmDelete"
      :return-btn="false"
      :show="!isLoading"
    />
    <conection-error :show="conectError" />
  </q-page>
</template>
<script setup>
import { useQuasar } from "quasar";
import MyTable from "src/components/MyTable.vue";
import studentsService from "src/services/studenst";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import ConectionError from "../common/ConectionError.vue";

const { list, remove } = studentsService();
const $q = useQuasar();
const conectError = ref(false);
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
    field: (row) => {
      return row.birth_date.substring(0, 10).split("-").reverse().join("/");
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
const isLoading = ref(true);
const rows = ref([""]);
const createRoute = "alunos/cadastro";
const editRoute = "alunos/cadastro";
const infoRoute = "alunos/matriculas";

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
    $q.loading.hide();
    console.log(e);
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
    console.log("confirm");
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
    $q.notify({ message: e.message, icon: "warming", color: "negative" });
  }
};
</script>
