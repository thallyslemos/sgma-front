<template>
  <q-page padding>
    <my-table
      title="Boletim"
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
    name: "status",
    label: "Situação",
    field: "status",
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
const createRoute = "/alunos/matriculas/editar";
const editRoute = "/alunos/matriculas/editar";

onMounted(() => {
  getRegistrations(route.params.id);
});

const getRegistrations = async (id) => {
  try {
    const data = await getById(id);
    data.map((data) => {
      Object.defineProperty(data, "name", { value: data.course.name });

      Object.defineProperty(data, "status", {
        value: getStatus(data.grade_1, data.grade_2, data.grade_3),
      });
    });
    rows.value = data;
  } catch (e) {
    console.log(e);
  }
};

const getStatus = (grade_1, grade_2, grade_3) => {
  if (!(grade_1 && grade_2 && grade_3)) {
    return "Incompleto";
  } else {
    const averge = (grade_1 + grade_2 + grade_3) / 3;
    if (averge < 5) {
      return "Inapto";
    } else {
      return "Apto";
    }
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
    $q.notify({ message: e.message, icon: "warming", color: "negative" });
  }
};
</script>
