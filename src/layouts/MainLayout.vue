<template>
  <q-layout view="lHh Lpr lFf" class="shadow-2 rounded-borders">
    <q-header elevated class="bg-primary">
      <q-toolbar>
        <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
        <q-toolbar-title>SGMA</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawer"
      show-if-above
      :mini="miniState"
      @mouseover="miniState = false"
      @mouseout="miniState = true"
      :width="200"
      :breakpoint="500"
      bordered
      class="bg-grey-3"
    >
      <q-scroll-area class="fit" :horizontal-thumb-style="{ opacity: 0 }">
        <q-list>
          <q-item-label header> Menu </q-item-label>

          <EssentialLink
            v-for="link in essentialLinks"
            :key="link.title"
            v-bind="link"
          />
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";

const linksList = [
  {
    title: "Home",
    icon: "home",
    route: "/home",
  },
  {
    title: "Alunos",
    icon: "school",
    route: "/alunos",
  },
  {
    title: "Cursos",
    icon: "book",
    route: "/cursos",
  },
];

export default defineComponent({
  name: "MainLayout",

  components: { EssentialLink },

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      essentialLinks: linksList,
      drawer: ref(false),
      miniState: ref(true),
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
