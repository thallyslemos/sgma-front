<template>
  <q-page>
    <div class="col-12">
      <div class="row justify-center">
        <div class="col-md-3">
          <my-card
            title="Alunos"
            icon="school"
            :content="studdents"
            description="Alunos Cadastrados"
            @click="$router.push('/alunos')"
          />
        </div>
        <div class="col-md-3">
          <my-card
            title="Cursos"
            icon="books"
            :content="courses"
            description="Cursos Cadastrados"
            @click="$router.push('/cursos')"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import MyCard from "src/components/common/MyCard.vue";
import coursesService from "src/services/courses";
import studentsService from "src/services/studenst";
import { onMounted, ref } from "vue";
const title = "Título";

// const { list } = coursesService();
// const { list } = studentsService();
const courses = ref(null);
const studdents = ref(null);

onMounted(() => {
  getData();
});

const getData = async () => {
  const studentRes = await studentsService().list();
  const courseRes = await coursesService().list();
  courses.value = courseRes.length;
  studdents.value = studentRes.length;
};
</script>
