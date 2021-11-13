import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/main",
    component: () => import("@/components/container/main-layout/MainPageLayout.vue"),
    children: [
      {
        path: "/main/density",
        name: "Density",
        components: {
          "main-container": () => import("@/views/density/Density.vue"),
        },
      },
      {
        path: "/main/density/addDensity",
        name: "AddDensity",
        components: {
          "main-container": () => import("@/views/density/AddDensity.vue"),
        },
      },
      {
        path: "/main/profile",
        name: "Profile",
        components: {
          "main-container": () => import("@/views/profile/Profile.vue"),
        },
      },
    ],
  },
  {
    path: "/login",
    component: () => import("@/views/auth/Login.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
