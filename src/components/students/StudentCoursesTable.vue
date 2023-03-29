<template>
  <q-page padding>
    <h5>Alunos</h5>
    <my-table
      title="Alunos"
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
import regisrationsService from "src/services/registrations";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const { list, remove, getById } = regisrationsService();
const $q = useQuasar();
const route = useRoute();

const columns = [
  {
    name: "name",
    label: "Curso",
    field: "name",
    sortable: true,
    align: "left",
  },
  {
    name: "grade_1",
    label: "Nota 1",
    field: "grade_1",
    sortable: true,
    align: "left",
  },
  {
    name: "grade_2",
    label: "Nota 2",
    field: "grade_2",
    sortable: true,
    align: "left",
  },
  {
    name: "grade_3",
    label: "Nota 3",
    field: "grade_3",
    sortable: true,
    align: "left",
  },
  {
    name: "birth_date",
    label: "Situação",
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
const createRoute = "alunos/cadastro";
const editRoute = "alunos/cadastro";

onMounted(() => {
  getRegistrations();
});

const getRegistrations = async () => {
  try {
    const data = await getById("08cab0f0-1a82-4cd7-bee2-62e298f1a0f9");
    data.map((data) => {
      Object.defineProperty(data, "name", { value: data.course.name });
    });
    rows.value = data;
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
