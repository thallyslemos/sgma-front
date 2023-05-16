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
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: "/alunos",
    component: () => import("layouts/MainLayout.vue"),
    meta: { requiresAuth: true },
    children: [
      {
        path: "",
        name: "alunos",
        component: () => import("pages/StudentsPage.vue"),
      },
      {
        path: "/alunos/cadastro/:id?",
        name: "cadastro",
        component: () => import("pages/FormStudent.vue"),
      },
      {
        path: "/alunos/matriculas/:id?",
        name: "alunoCursos",
        component: () => import("pages/StudentCoursesPaage.vue"),
      },
      {
        path: "/alunos/matriculas/editar/:id?",
        name: "editarMatricula",
        component: () => import("pages/FormGrades.vue"),
      },
    ],
  },
  {
    path: "/cursos",
    component: () => import("layouts/MainLayout.vue"),
    meta: { requiresAuth: true },
    children: [
      {
        path: "",
        name: "cursos",
        component: () => import("pages/CoursesPage.vue"),
      },
      {
        path: "/cursos/cadastro/:id?",
        name: "cursos/cadastro",
        component: () => import("pages/FormCourse.vue"),
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
