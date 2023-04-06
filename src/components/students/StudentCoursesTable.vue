<template>
  <q-page padding>
    <my-table
      title="Boletim"
      :columns="columns"
      :rows="rows"
      :create-route="createRoute"
      :edit-route="editRoute"
      :handle-delete="confirmDelete"
      :info-btn="false"
      :show="!isLoading"
    />
  </q-page>
</template>
<script setup>
import { useQuasar } from "quasar";
import MyTable from "src/components/MyTable.vue";
import regisrationsService from "src/services/registrations";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const { remove, getById } = regisrationsService();
const $q = useQuasar();
const route = useRoute();

const columns = [
  {
    name: "name",
    label: "Curso",
    field: (row) => {
      return row.course.name;
    },
    sortable: true,
    align: "left",
  },
  {
    name: "grade_1",
    label: "Nota 1",
    field: (row) => {
      return row.grade_1;
    },
    sortable: true,
    align: "left",
  },
  {
    name: "grade_2",
    label: "Nota 2",
    field: (row) => {
      return row.grade_2;
    },
    sortable: true,
    align: "left",
  },
  {
    name: "grade_3",
    label: "Nota 3",
    field: (row) => {
      return row.grade_3;
    },
    sortable: true,
    align: "left",
  },
  {
    name: "status",
    label: "Situação",
    field: (row) => {
      let status;
      if (!(row.grade_1 && row.grade_2 && row.grade_3)) {
        status = "Incompleto";
      } else {
        let averge = (row.grade_1 + row.grade_2 + row.grade_3) / 3;
        if (averge < 5) {
          status = "Inapto";
        } else {
          status = "Apto";
        }
      }
      return status;
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
const createRoute = "/alunos/matriculas/editar";
const editRoute = "/alunos/matriculas/editar";

onMounted(() => {
  getRegistrations(route.params.id);
  localStorage.studentId = route.params.id;
});

const getRegistrations = async (id) => {
  $q.loading.show({
    message: "Buscando informações no servidor...",
  });

  try {
    const data = await getById(id);

    rows.value = data;
    isLoading.value = false;
    $q.loading.hide();
  } catch (e) {
    isLoading.value = false;
    $q.loading.hide();
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
  }).onOk(() => {
    handleDelete(id);
  });
};

const handleDelete = async (id) => {
  try {
    await remove(id);
    await getRegistrations(route.params.id);
    $q.notify({
      message: "Registro excluido com sucesso!",
      icon: "check",
      color: "positive",
    });
  } catch (e) {
    $q.notify({ message: e.message, icon: "warming", color: "negative" });
  }
};
</script>
