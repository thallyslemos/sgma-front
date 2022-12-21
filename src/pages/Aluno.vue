<template>
  <q-page class="flex flex-center">
    <div class="row">
      <div class="col">
        <div class="row"></div>
        <div class="q-mt-md">
          <div class="q-pa-md q-gutter-sm">
            <q-btn label="Modulos" color="primary" @click="alert = true" />
            <q-btn label="Deletar" color="negative" @click="confirm = true" />
            <q-btn label="Cadastrar" color="positive" @click="prompt = true" />
            <q-btn label="Editar" color="secondary" @click="prompt = true" />
            <q-input type="text" label="Pesquisar" color="primary" />

            <q-dialog v-model="alert">
              <q-card>
                <q-card-section>
                  <div class="text-h6">Alert</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                  <h4>Modulos</h4>
                  {{ JSON.stringify(select[0]) }}
                </q-card-section>

                <q-card-actions align="right">
                  <q-btn flat label="OK" color="primary" v-close-popup />
                </q-card-actions>
              </q-card>
            </q-dialog>

            <q-dialog v-model="confirm" persistent>
              <q-card>
                <q-card-section class="row items-center">
                  <q-avatar
                    icon="signal_wifi_off"
                    color="primary"
                    text-color="white"
                  />
                  <span class="q-ml-sm"
                    >You are currently not connected to any network.</span
                  >
                </q-card-section>

                <q-card-actions align="right">
                  <q-btn flat label="Cancel" color="primary" v-close-popup />
                  <q-btn
                    flat
                    label="Turn on Wifi"
                    color="primary"
                    v-close-popup
                  />
                </q-card-actions>
              </q-card>
            </q-dialog>

            <q-dialog v-model="prompt" persistent full-height>
              <q-card style="min-width: 350px; max-height: 80vh">
                <q-form @submit.prevent="salvar">
                  <q-card-section>
                    <div class="text-h6">Cadastrar Aluno</div>
                  </q-card-section>

                  <q-card-section class="q-pt-none">
                    <q-input
                      dense
                      v-model="novoAluno.nome"
                      autofocus
                      label="Nome"
                      @keyup.enter="prompt = false"
                    />
                  </q-card-section>
                  <q-card-section class="q-pt-none">
                    <q-input
                      dense
                      v-model="novoAluno.cpf"
                      autofocus
                      label="CPF"
                      @keyup.enter="prompt = false"
                    />
                  </q-card-section>
                  <q-card-section class="q-pt-none">
                    <q-input
                      disable
                      type="date"
                      dense
                      v-model="novoAluno.data_nascimento"
                      autofocus
                      @keyup.enter="prompt = false"
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
        <q-layout class="row">
          <q-table
            title="Alunos"
            :data="alunos"
            :columns="columns"
            row-key="nome"
            class="col"
            separator="cell"
            selection="single"
            :selected.sync="select"
          />
        </q-layout>
        <div class="row"></div>
      </div>
    </div>
  </q-page>
</template>

<script>
import myTable from "../components/Table.vue";
import alunos from "src/services/alunos";
import { ref } from "vue";
// import axios from "axios";

export default {
  mounted() {
    alunos.listar().then((res) => {
      this.alunos = res.data;
      console.log(res.data);
    });
  },
  // components: { "app-table": myTable },
  name: "Aluno",
  methods: {
    salvar() {
      // let isoDate = new Date(this.novoAluno.data_nascimento).toISOString();
      // this.novoAluno.data_nascimento = isoDate;
      // console.log(isoDate);
      // console.log(parseObj);
      let parseObj = JSON.stringify(this.novoAluno);

      alunos.salvar(parseObj).then((res) => {
        this.alert("Cadastro Realizado!");
      });
    },
  },
  setup() {
    return {
      alert: ref(false),
      confirm: ref(false),
      prompt: ref(false),
    };
  },
  data() {
    return {
      columns: [
        {
          name: "nome",
          label: "Nome do Aluno",
          field: "nome",
          align: "left",
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
          align: "left",
          format: (val) => `${val}`,
          sortable: true,
        },
      ],
      alunos: [],
      select: [],
      novoAluno: {
        nome: "",
        cpf: "",
        data_nascimento: "",
      },
    };
  },
};
</script>

<style></style>
