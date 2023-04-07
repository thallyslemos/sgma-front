<template>
  <q-page>
    <div class="col-12">
      <div class="row justify-center">
        <my-text
          title="Sistema de Gestão de Módulos Acadêmicos"
          content="Gerencie os registros de seus e alunos e acompanhe seu desempenho com o
        SGMA!"
        />
      </div>
      <q-separator inset />

      <div class="row justify-center">
        <div class="col-md-3">
          <my-card
            title="Alunos"
            icon="school"
            :content="studdents"
            :show="!isLoading"
            description="Alunos Cadastrados"
            @click="$router.push('/alunos')"
          />
        </div>
        <div class="col-md-3">
          <my-card
            title="Cursos"
            icon="books"
            :content="courses"
            :show="!isLoading"
            description="Cursos Cadastrados"
            @click="$router.push('/cursos')"
          />
        </div>
      </div>
    </div>
    <conection-error :show="conectError" />
  </q-page>
</template>

<script setup>
import { useQuasar } from "quasar";
import ConectionError from "src/components/common/ConectionError.vue";
import MyCard from "src/components/common/MyCard.vue";
import MyText from "src/components/common/MyText.vue";
import coursesService from "src/services/courses";
import studentsService from "src/services/studenst";
import { onMounted, ref } from "vue";

const $q = useQuasar();
const courses = ref(null);
const studdents = ref(null);
const isLoading = ref(true);
const conectError = ref(false);

onMounted(() => {
  getData();
});

const getData = async () => {
  $q.loading.show({
    message: "Buscando informações no servidor...",
  });
  try {
    const studentRes = await studentsService().list();
    const courseRes = await coursesService().list();
    courses.value = courseRes.length;
    studdents.value = studentRes.length;
    isLoading.value = false;
    $q.loading.hide();
  } catch (e) {
    $q.loading.hide();
    console.log(e);
    conectError.value = true;
  }
};
</script>
