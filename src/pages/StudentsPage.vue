<template>
  <q-page padding>
    Students
    <q-table title="Treats" :rows="alunos" :columns="columns" row-key="name">
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn
            icon="delete"
            color="negative"
            dense
            @click="handleDeleteStudent(props.row.id)"
          />
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";
import studentsService from "src/services/studenst";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "StudentsPage",
  setup() {
    const alunos = ref([]);
    const { list, remove } = studentsService();
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

    onMounted(() => {
      getAlunos();
    });

    const getAlunos = async () => {
      try {
        const data = await list();
        alunos.value = data;
        console.log(alunos);
      } catch (e) {
        console.log(e);
      }
    };

    const $q = useQuasar();

    const handleDeleteStudent = async (id) => {
      try {
        await remove(id);
        await getAlunos();
        $q.notify({
          message: "Apagado com suceso!",
          icon: "check",
          color: "positive",
        });
      } catch (e) {
        $q.notify({
          message: "Ocorreu um erro",
          icon: "times",
          color: "positive",
        });
      }
    };

    return {
      alunos,
      columns,
      handleDeleteStudent,
    };
  },
});
</script>
