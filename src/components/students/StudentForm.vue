<template>
  <q-page padding>
    <transition
      appear
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <q-form @submit="onSubmit" class="col">
        <p class="text-h6">{{ title }}</p>
        <q-separator inset class="q-ma-md" />
        <div class="row q-col-gutter-sm">
          <q-input
            filled
            dense
            class="col-md-4 col-xs-12"
            v-model="form.name"
            label="Nome do aluno"
            hint="Nome completo"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 2) || 'Digite o nome do aluno',
            ]"
          />
          <q-input
            filled
            dense
            class="col-md-4 col-xs-12"
            v-model="form.cpf"
            label="CPF do aluno"
            hint="Apenas números"
            lazy-rules
            mask="###.###.###-##"
            :rules="[
              (val) => (val && val.length > 13) || 'Digite o CPF do aluno',
            ]"
          />
          <q-input
            type="date"
            filled
            dense
            class="col-md-4 col-xs-12"
            v-model="form.birth_date"
            hint="Data de nascimento"
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 0) ||
                'Digite a data de nascimento do aluno',
            ]"
          />
          <div class="col-12 q-mt-md q-gutter-sm">
            <q-space />
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
        </div>
      </q-form>
    </transition>
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
const { post, getById, updateStudent } = studentsService();
const $q = useQuasar();
const router = useRouter();
const route = useRoute();

const title = ref("Cadastrar aluno");

onMounted(async () => {
  if (route.params.id) {
    getStudent(route.params.id);
    title.value = "Editar Daados do Aluno";
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
    form.value.birth_date = new Date(form.value.birth_date).toISOString();
    if (form.value.id) {
      await updateStudent(form.value);
    } else {
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
    $q.notify({ message: e.message, icon: "warning", color: "negative" });
  }
};
</script>
