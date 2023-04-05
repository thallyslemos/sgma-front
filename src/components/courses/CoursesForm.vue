<template>
  <q-page padding>
    <q-form @submit="onSubmit" class="row q-col-gutter-sm">
      <h6>{{ title }}</h6>
      <q-input
        filled
        class="col-lg-6 col-xs-12"
        v-model="form.name"
        label="Nome do Curso"
        hint="O curso deve ter um nome exclusivo"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />

      <div class="col-12 q-gutter-sm">
        <q-btn
          label="Cadastrar"
          color="primary"
          class="float-right"
          icon="save"
          type="submit"
        />
        <q-btn
          label="Cancelar"
          color="white"
          text-color="dark"
          class="float-right"
          icon="cancel"
          @click="$router.go(-1)"
        />
      </div>
    </q-form>
  </q-page>
</template>

<script setup>
import { useQuasar } from "quasar";
import coursesService from "src/services/courses";
import { defineComponent, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const title = ref("Cadastrar Curso");
const form = ref({
  name: "",
});
const { post, getById, update } = coursesService();
const $q = useQuasar();
const router = useRouter();
const route = useRoute();

onMounted(async () => {
  if (route.params.id) {
    getCourse(route.params.id);
    title.value = "Editar Curso";
  }
});

const getCourse = async (id) => {
  try {
    const response = await getById(route.params.id);
    form.value = response;
  } catch (e) {
    console.error(e);
  }
};

const onSubmit = async () => {
  try {
    if (form.value.id) {
      console.log(form.value);
      await update(form.value);
    } else {
      await post(form.value);
    }

    $q.notify({
      message: "Curso cadastrado com sucesso!",
      icon: "check",
      color: "positive",
    });

    router.go(-1);
  } catch (e) {
    console.log(e);
    $q.notify({ message: e.message, icon: "warming", color: "negative" });
  }
};
</script>

<style></style>
