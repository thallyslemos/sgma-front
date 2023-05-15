<template>
  <transition
    appear
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
  >
    <div class="row justify-center" hidden>
      <div class="q-pa-md q-gutter-lg items-center" v-if="props.show">
        <q-banner class="bg-grey-4 text-dark shadow-6 BANNER">
          <q-icon name="cloud_off" size="4em" />
          Houve um erro ao carregar os dados dos servidor...

          <q-spinner-gears size="4em" />
        </q-banner>
      </div>
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
<style scoped>
.BANNER {
  max-width: 500px;
}
</style>
