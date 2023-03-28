<template>
  <div v-if="show">
    <q-table
      :title="title"
      :rows="rows"
      :columns="columns"
      :filter="filter"
      :separator="separator"
      rows-per-page-label="Quantidade por página"
      row-key="name"
      virtual-scroll
    >
      <template v-slot:top-left>
        <q-input dense debounce="300" v-model="filter" placeholder="Pesquisar">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <template v-slot:top-right>
        <q-space />
        <q-btn color="primary" label="Cadastrar" @click="handleCreate()" />
      </template>
      <template v-slot:body-cell-actions="props">
        <q-td :props="props" class="q-gutter-sm">
          <q-btn
            icon="delete"
            color="negative"
            dense
            @click="handleDelete(props.row.id)"
          />
          <q-btn
            icon="edit"
            color="info"
            dense
            @click="handleEdit(props.row.id)"
          />
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const filter = ref("");
const separator = ref("cell");
const $q = useQuasar();
const router = useRouter();
const props = defineProps({
  handleDelete: Function,
  show: {
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
});

const handleEdit = async (id) => {
  const updateRoute = `${props.editRoute}`;
  await router.push(`${updateRoute}/${id}`);
};
const handleCreate = async () => {
  const createRoute = `${props.createRoute}`;
  await router.push(createRoute);
};
</script>
