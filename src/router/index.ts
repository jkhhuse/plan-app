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
    path: "/register",
    component: () => import("@/views/auth/Register.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
