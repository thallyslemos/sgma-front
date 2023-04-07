<template>
  <transition
    appear
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
  >
    <div class="column q-pa-md items-center text-blue-grey text-bold">
      <h4>{{ props.title }}</h4>
      <p>
        {{ props.content }}
      </p>
    </div>
  </transition>
</template>
<script setup>
const props = defineProps({
  title: {
    type: String,
    default: "Título",
  },
  content: {
    type: String,
    default: "Conteúdo",
  },
});
</script>
