<template>
  <transition
    appear
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
  >
    <div class="q-pa-md" v-if="show">
      <div class="row justify-end q-mb-md items-center">
        <q-btn
          icon="add"
          color="primary"
          label="Cadastrar"
          @click="handleCreate()"
          style="float: left"
        />
      </div>
      <div class="row justify-between q-mb-md items-center">
        <div class="col">
          <q-table
            :title="title"
            :rows="rows"
            :columns="columns"
            :filter="filter"
            :separator="separator"
            rows-per-page-label="Quantidade por página"
            row-key="name"
            virtual-scroll
            hide-no-data
          >
            <template v-slot:top-right>
              <q-input
                dense
                debounce="300"
                v-model="filter"
                placeholder="Pesquisar"
              >
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
            </template>

            <template v-slot:body-cell-status="props">
              <q-td :props="props">
                <div>
                  <q-badge
                    :color="changeColor(props.value)"
                    :label="props.value"
                  />
                </div>
              </q-td>
            </template>

            <template v-slot:body-cell-actions="props">
              <q-td :props="props" class="q-gutter-sm">
                <q-btn
                  v-if="deleteBtn"
                  icon="delete"
                  color="negative"
                  dense
                  @click="handleDelete(props.row.id)"
                >
                  <q-tooltip> Deletar </q-tooltip>
                </q-btn>
                <q-btn
                  v-if="editBtn"
                  icon="edit"
                  color="warning"
                  dense
                  @click="handleEdit(props.row.id)"
                >
                  <q-tooltip> Editar </q-tooltip>
                </q-btn>
                <q-btn
                  v-if="infoBtn"
                  icon="collections_bookmark"
                  color="secondary"
                  dense
                  @click="handleInfo(props.row.id)"
                >
                  <q-tooltip> Módulos </q-tooltip>
                </q-btn>
              </q-td>
            </template>
          </q-table>
        </div>
      </div>
      <div class="row justify-end q-mb-md">
        <q-btn
          v-if="returnBtn"
          icon="undo"
          text-color="dark"
          label="Voltar"
          @click="router.go(-1)"
          style="float: right"
        />
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const filter = ref("");
const separator = ref("cell");
const router = useRouter();
const props = defineProps({
  handleDelete: Function,
  show: {
    type: Boolean,
    default: true,
  },
  deleteBtn: {
    type: Boolean,
    default: true,
  },
  editBtn: {
    type: Boolean,
    default: true,
  },
  returnBtn: {
    type: Boolean,
    default: true,
  },
  infoBtn: {
    type: Boolean,
    default: true,
  },
  title: {
    type: String,
    default: "default",
  },
  columns: {
    type: Array,
    default: ref([""]),
  },
  rows: {
    type: Array,
    default: ref([""]),
  },
  editRoute: {
    type: String,
    default: "",
  },
  createRoute: {
    type: String,
    default: "",
  },
  infoRoute: {
    type: String,
    default: "",
  },
});

const handleEdit = (id) => {
  const updateRoute = `${props.editRoute}`;
  router.push(`${updateRoute}/${id}`);
};
const handleCreate = () => {
  const createRoute = `${props.createRoute}`;
  router.push(createRoute);
};
const handleInfo = (id) => {
  const infoRoute = `${props.infoRoute}/${id}`;
  router.push(infoRoute);
};
const changeColor = (status) => {
  if (status == "Inapto") return "red";
  else if (status == "Incompleto") return "grey";
  else if (status == "Apto") return "green";
};
</script>
