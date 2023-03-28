<template>
  <q-page padding>
    <q-form @submit="onSubmit" class="row q-col-gutter-sm">
      <q-input
        filled
        class="col-lg-6 col-xs-12"
        v-model="form.name"
        label="Nome do aluno"
        hint="Nome completo"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />
      <q-input
        filled
        class="col-lg-6 col-xs-12"
        v-model="form.cpf"
        label="CPF do aluno"
        hint="Apenas números"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />
      <q-input
        type="date"
        filled
        class="col-lg-6 col-xs-12"
        v-model="form.birth_date"
        hint="Data de nascimento"
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
import studentsService from "src/services/studenst";
import { defineComponent, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const form = ref({
  name: "",
  cpf: "",
  birth_date: "",
});
const { post, getById, update } = studentsService();
const $q = useQuasar();
const router = useRouter();
const route = useRoute();

onMounted(async () => {
  if (route.params.id) {
    getStudent(route.params.id);
  }
});

const getStudent = async (id) => {
  try {
    const response = await getById(route.params.id);
    form.value = response;
    form.value.birth_date = form.value.birth_date.substring(0, 10);
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
      form.value.birth_date = new Date(form.value.birth_date).toISOString();
      await post(form.value);
    }

    $q.notify({
      message: "Aluno cadastrado com sucesso!",
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
