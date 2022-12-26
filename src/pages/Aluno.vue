<template>
  <q-page class="flex flex-center">
    <div class="row">
      <div class="col">
        <div class="row"></div>
        <div class="q-mt-md">
          <div class="q-pa-md q-gutter-sm">
            <q-btn
              label="Cadastrar"
              color="positive"
              @click="cadastroForm = true"
            />
            <q-dialog v-model="alert">
              <q-card>
                <q-card-section>
                  <div class="text-h6">Modulos</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                  <h4>Modulos</h4>
                  {{ JSON.stringify(selected.modules) }}
                </q-card-section>

                <q-card-actions align="right">
                  <q-btn flat label="OK" color="primary" v-close-popup />
                </q-card-actions>
              </q-card>
            </q-dialog>

            <q-dialog v-model="confirmDelete" persistent>
              <q-card>
                <q-card-section>
                  <span class="q-ml-sm"
                    >Tem certeza que deseja excluir os dados do Aluno:
                    {{ selected.nome }}
                  </span>
                </q-card-section>

                <q-card-actions align="right">
                  <q-btn flat label="Cancelar" color="primary" v-close-popup />
                  <q-btn
                    flat
                    label="Sim"
                    color="primary"
                    @click="deleteAluno()"
                    v-close-popup
                  />
                </q-card-actions>
              </q-card>
            </q-dialog>

            <q-dialog v-model="editForm" persistent full-height>
              <q-card style="min-width: 350px; max-height: 80vh">
                <q-form @submit.prevent="editarAluno">
                  <q-card-section>
                    <div class="text-h6">Editar Cadastro</div>
                  </q-card-section>

                  <q-card-section class="q-pt-none">
                    <q-input
                      dense
                      v-model="selected.nome"
                      autofocus
                      label="Nome"
                    />
                  </q-card-section>
                  <q-card-section class="q-pt-none">
                    <q-input
                      dense
                      v-model="selected.cpf"
                      autofocus
                      label="CPF"
                    />
                  </q-card-section>
                  <q-card-section class="q-pt-none">
                    <q-input
                      disable
                      type="date"
                      dense
                      v-model="selected.data_nascimento"
                      autofocus
                    />
                  </q-card-section>

                  <q-card-actions align="right" class="text-primary">
                    <q-btn flat label="Cancelar" v-close-popup />
                    <q-btn flat label="Salvar Alterações" type="submit" />
                  </q-card-actions>
                </q-form>
              </q-card>
            </q-dialog>
            <q-dialog v-model="cadastroForm" persistent full-height>
              <q-card style="min-width: 350px; max-height: 80vh">
                <q-form @submit.prevent="cadastrarAluno">
                  <q-card-section>
                    <div class="text-h6">Cadastrar Aluno</div>
                  </q-card-section>

                  <q-card-section class="q-pt-none">
                    <q-input
                      dense
                      v-model="novoAluno.nome"
                      autofocus
                      label="Nome"
                    />
                  </q-card-section>
                  <q-card-section class="q-pt-none">
                    <q-input
                      dense
                      v-model="novoAluno.cpf"
                      autofocus
                      label="CPF"
                    />
                  </q-card-section>
                  <q-card-section class="q-pt-none">
                    <q-input
                      type="date"
                      dense
                      v-model="novoAluno.data_nascimento"
                      autofocus
                    />
                  </q-card-section>

                  <q-card-actions align="right" class="text-primary">
                    <q-btn flat label="Cancelar" v-close-popup />
                    <q-btn flat label="Cadastrar Aluno" type="submit" />
                  </q-card-actions>
                </q-form>
              </q-card>
            </q-dialog>
          </div>
        </div>
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
                    @click="(confirmDelete = true), (selected = props.row)"
                  />
                  <q-btn
                    icon="edit"
                    color="primary"
                    size="sm"
                    dense
                    class="q-ml-sm"
                    @click="(editForm = true), (selected = props.row)"
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
      </div>
    </div>
  </q-page>
</template>

<script>
import myTable from "../components/Table.vue";
import alunos from "src/services/alunos";
import { ref } from "vue";
import { runInThisContext } from "vm";
// import axios from "axios";

export default {
  mounted() {
    alunos.listar().then((res) => {
      this.alunosData = res.data;
    });
  },

  // updated() {
  //   alunos.listar().then((res) => {
  //     this.alunosData = res.data;
  //   });
  // },
  // components: { "app-table": myTable },
  name: "Aluno",
  methods: {
    cadastrarAluno() {
      let isoDate = new Date(this.novoAluno.data_nascimento).toISOString();
      this.novoAluno.data_nascimento = isoDate;
      // console.log(isoDate);
      // console.log(parseObj);
      let parseObj = JSON.stringify(this.novoAluno);

      alunos.salvar(this.novoAluno).then((res) => {
        alert("Cadastro Realizado!");
      });
      this.cadastroForm = false;
      this.novoAluno = "";
    },
    deleteAluno() {
      alunos.deletar(this.selected.cpf).then((res) => {
        console.log(this.selected.nome + "Deletado!");
      });
    },
    editarAluno() {
      console.log("Aluno Editado " + this.selected.nome);
    },
  },
  setup() {
    return {
      alert: ref(false),
      confirmDelete: ref(false),
      editForm: ref(false),
      cadastroForm: ref(false),
    };
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
          format: (val) => `${val}`,
          sortable: true,
        },
      ],
      selected: "",
      alunosData: [],
      novoAluno: {
        nome: "",
        cpf: "",
        data_nascimento: null,
      },
    };
  },
};
</script>

<style></style>
