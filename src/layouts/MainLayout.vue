<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title> SGMA </q-toolbar-title>

        <div>SGMA v 1.0</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <div v-for="(link, index) in linksList" :key="index">
          <q-item clickable :to="{ name: `${link.name}` }" exact>
            <q-item-section avatar>
              <q-icon :name="link.icon" />
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ link.title }}</q-item-label>
              <q-item-label caption>
                {{ link.caption }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </div>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
const linksList = [
  {
    title: "Home",
    caption: "github.com/quasarframework",
    icon: "code",
    name: "Home",
  },
  {
    title: "Aluno",
    caption: "quasar.dev",
    icon: "school",
    name: "Aluno",
  },
  {
    title: "Modulos",
    caption: "quasar.dev",
    icon: "school",
    name: "Modulos",
  },
];

export default {
  name: "MainLayout",
  components: {},
  data() {
    return {
      linksList,
      leftDrawerOpen: false,
    };
  },
};
</script>
