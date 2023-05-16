<template>
  <q-layout view="lHh Lpr lFf" class="shadow-2 rounded-borders">
    <q-header elevated class="bg-primary">
      <q-toolbar>
        <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
        <q-toolbar-title>SGMA</q-toolbar-title>
        <q-btn flat round dense icon="person">
          <q-menu>
            <q-list dense style="min-width: 100px">
              <q-item-label header>Usuário: {{ userName }}</q-item-label>
              <q-item clickable v-close-popup>
                <q-item-section @click="logOut()"> Sair</q-item-section>
                <q-item-section avatar>
                  <q-icon color="primary" name="logout" />
                </q-item-section>
              </q-item>

              <q-separator />
              <q-item clickable v-close-popup>
                <q-item-section>Opções...</q-item-section>
                <q-item-section avatar>
                  <q-icon color="primary" name="settings" />
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
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

<script setup>
import { defineComponent, onMounted, ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";
import { useRoute, useRouter } from "vue-router";
import { SessionStorage } from "quasar";
import { useAuthStore } from "src/stores/auth-store";
import { api } from "src/boot/axios";
const auth = useAuthStore();
const router = useRouter();

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
const logOut = async () => {
  auth.singOut();
  router.replace("/login");
};
const drawer = ref(false);
const miniState = ref(true);
const essentialLinks = linksList;
const userName = ref("");

onMounted(() => {
  let user = SessionStorage.getItem("user");
  userName.value = JSON.parse(user).name;
});
</script>
