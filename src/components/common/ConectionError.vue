<template>
  <transition
    appear
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
  >
    <div class="q-pa-md q-gutter-lg" v-if="props.show">
      <q-banner class="bg-grey-4 text-dark shadow-6">
        <q-icon name="cloud_off" size="4em" />
        Houve um erro ao carregar os dados dos servidor...

        <q-spinner-gears size="4em" />
      </q-banner>
    </div>
  </transition>
</template>
<script setup>
const props = defineProps({
  show: {
    type: Boolean,
    default: true,
  },
});
</script>
