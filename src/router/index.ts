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
      /** Density */
      {
        path: "/main/density",
        name: "Density",
        components: {
          "main-container": () => import("@/views/density/Density.vue"),
        },
      },
      {
        path: "/main/density/displayDensity",
        name: "DisplayDensity",
        components: {
          "main-container": () => import("@/views/density/DisplayDensity.vue"),
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
        path: "/main/density/updateDensity/:uuid/:measureTime/:measureValue",
        name: "EditDensity",
        components: {
          "main-container": () => import("@/views/density/EditDensity.vue"),
        },
      },
      {
        path: "/main/density/addDiet/:date",
        name: "addDiet",
        components: {
          "main-container": () => import("@/views/density/AddDiet.vue"),
        },
      },
      {
        path: "/main/density/editDiet/:dietId/:date",
        name: "EditDiet",
        components: {
          "main-container": () => import("@/views/density/AddDiet.vue"),
        },
      },
      {
        path: "/main/density/displayDiet",
        name: "DisplayDiet",
        components: {
          "main-container": () => import("@/views/density/DisplayDiet.vue"),
        },
      },
      /** Food */
      {
        path: "/main/food",
        name: "Food",
        components: {
          "main-container": () => import("@/views/food/Food.vue"),
        },
      },
      /** CookBook */
      {
        path: "/main/cookbook",
        name: "Cookbook",
        components: {
          "main-container": () => import("@/views/cookbook/Cookbook.vue"),
        },
      },
      /** profile */
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
