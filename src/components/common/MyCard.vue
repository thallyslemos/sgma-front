<template>
  <div class="q-pa-md">
    <q-card id="card" class="q-ma-md" :style="`min-height: ${120}px`">
      <q-card-section class="row bg-grey-2 q-py-sm">
        <q-icon size="md" :name="props.icon" />
        <div class="text-h6 q-ml-sm">{{ props.title }}</div>
      </q-card-section>

      <q-separator />
      <div class="q-pa-md flex flex-center">
        {{ props.description }}

        <slot />
      </div>
      <div class="q-pa-md flex flex-center">
        {{ props.content }}

        <slot />
      </div>
    </q-card>
  </div>
</template>
<script setup>
const props = defineProps({
  title: {
    type: String,
    default: "Titulo",
  },
  icon: {
    type: String,
    default: "delete",
  },
  content: {
    type: Number,
    default: null,
  },
  description: {
    type: String,
    default: "0",
  },
});
</script>

<style scoped>
#card {
  width: 100%;
  max-width: 400px;
  max-height: 100%;
  height: 200px;
  color: #010101;
  font-weight: bold;
  transition: 0.3s;
}

#card:hover {
  background-color: #00695dc5 !important;
}
</style>
