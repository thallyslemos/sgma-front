<!-- <template>
  <q-page class="flex flex-center">
    <h1>Modulos</h1>
    <app-table />
  </q-page>
</template>

<script>
import myTable from "../components/Table.vue";
export default {
  components: { "app-table": myTable },
  name: "Modulos",
};
</script>

<style></style> -->
<template>
  <div class="q-pa-md">
    <q-table
      title="Gerenciamento de Alunos"
      :data="alunosData"
      :columns="columns"
      row-key="name"
      :filter="filter"
    >
      <template v-slot:top-right>
        <q-input
          borderless
          dense
          debounce="300"
          v-model="filter"
          placeholder="Search"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <template v-slot:body-cell-acoes="props">
        <q-td :props="props">
          <div>
            <q-btn
              icon="delete"
              color="negative"
              size="sm"
              dense
              class="q-ml-sm"
            />
            <q-btn
              icon="edit"
              color="primary"
              size="sm"
              dense
              class="q-ml-sm"
            />
            <q-btn
              icon="book"
              color="secondary"
              size="sm"
              dense
              class="q-ml-sm"
            />
          </div>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script>
import alunos from "src/services/alunos";

export default {
  mounted() {
    alunos.listar().then((res) => {
      this.alunosData = res.data;
      console.log(res.data);
    });
  },
  data() {
    return {
      filter: "",
      columns: [
        {
          name: "nome",
          label: "Nome do Aluno",
          align: "left",
          field: (row) => row.nome,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "cpf",
          label: "CPF",
          field: "cpf",
          align: "left",
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "data_nascimento",
          label: "Data de Nascimento",
          field: "data_nascimento",
          align: "left",
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "acoes",
          label: "Ações",
          align: "right",
        },
      ],

      alunosData: [],
    };
  },
};
</script>

<style>
.my-table-details {
  font-size: 0.85em;
  font-style: italic;
  max-width: 200px;
  white-space: normal;
  color: #555;
  margin-top: 4px;
}
</style>
