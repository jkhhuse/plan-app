import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/main",
    component: () => import("@/components/container/main-layout/MainPageLayout.vue"),
    children: [
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
