<template>
  <q-page padding>
    <q-form @submit="onSubmit" class="row q-col-gutter-sm">
      <q-select
        v-if="isCreate"
        class="col-lg-6 col-xs-12"
        filled
        :options="coursesOptions"
        v-model="form.id_course"
        label="Curso"
      />
      <q-input
        type="number"
        filled
        class="col-lg-6 col-xs-12"
        v-model="form.grade_1"
        label="Nota 1"
        lazy-rules
      />
      <q-input
        type="number"
        filled
        class="col-lg-6 col-xs-12"
        v-model="form.grade_2"
        label="Nota 2"
        lazy-rules
      />
      <q-input
        type="number"
        filled
        class="col-lg-6 col-xs-12"
        v-model="form.grade_3"
        label="Nota 3"
        lazy-rules
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
import regisrationsService from "src/services/registrations";
import { defineComponent, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const form = ref({
  id_course: "",
  id_student: "",
  grade_1: null,
  grade_2: null,
  grade_3: null,
});

const isCreate = ref(true);
const coursesOptions = ref([""]);
const getCourses = async () => {
  try {
    const response = await list();
    response.map((value) => {
      coursesOptions.value.push({
        value: value.id,
        label: value.name,
      });
    });
  } catch (e) {
    console.log(e);
  }
};
const { postRegistration, updateRegistration, getOneById } =
  regisrationsService();
const { list } = coursesService();
const $q = useQuasar();
const router = useRouter();
const route = useRoute();

onMounted(async () => {
  form.value.id_student = localStorage.studentId;
  if (route.params.id) {
    getRegisters(route.params.id);
    isCreate.value = false;
  } else {
    getCourses();
  }
});

const getRegisters = async (id) => {
  try {
    const response = await getOneById(route.params.id);
    form.value = response;
  } catch (e) {
    console.error(e);
  }
};
// Refatorar manipulação das notas
const onSubmit = async () => {
  try {
    if (form.value.id) {
      await updateRegistration(form.value);
    } else {
      await postRegistration(form.value);
    }

    $q.notify({
      message: "Registro atualizado com sucesso!",
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
