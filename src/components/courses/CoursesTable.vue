<template>
  <q-page padding>
    <h5>Cursos</h5>
    <my-table
      title="Cursos"
      :columns="columns"
      :rows="rows"
      :create-route="createRoute"
      :edit-route="editRoute"
      :handle-delete="confirmDelete"
    />
  </q-page>
</template>
<script setup>
import { useQuasar } from "quasar";
import MyTable from "src/components/MyTable.vue";
import coursesService from "src/services/courses";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const { list, remove } = coursesService();
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
  })
    .onOk(() => {
      console.log("confirm");
      handleDelete(id);
    })
    .onCancel(() => {
      console.log("cancel");
    })
    .onDismiss(() => {
      console.log("dismis?");
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
