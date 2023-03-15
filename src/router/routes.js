const routes = [
  {
    path: "/",
    redirect: "login",
  },
  {
    path: "/login",
    component: () => import("layouts/CommonLayout.vue"),
    children: [
      {
        path: "",
        name: "login",
        component: () => import("pages/LoginPage.vue"),
      },
    ],
  },
  {
    path: "/home",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "home",
        component: () => import("pages/IndexPage.vue"),
      },
    ],
  },
  {
    path: "/alunos",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "alunos",
        component: () => import("pages/StudentsPage.vue"),
      },
      {
        path: "/formStudent/:id?",
        name: "formStudent",
        component: () => import("pages/FormStudent.vue"),
      },
    ],
  },
  // {
  //   path: "/alunos",
  //   component: () => import("layouts/MainLayout.vue"),
  //   children: [{ path: "", component: () => import("pages/StudentsPage.vue") }],
  // },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
