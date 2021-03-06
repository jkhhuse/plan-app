import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/main",
    component: () =>
      import(
        /* webpackChunkName: "MainPageLayout" */ "@/components/container/main-layout/MainPageLayout.vue"
      ),
    children: [
      /** Density */
      {
        path: "/main/density",
        name: "Density",
        components: {
          "main-container": () => import(/* webpackChunkName: "Density" */ "@/views/density/Density.vue"),
        },
      },
      {
        path: "/main/density/displayDensity",
        name: "DisplayDensity",
        components: {
          "main-container": () =>
            import(/* webpackChunkName: "DisplayDensity" */ "@/views/density/DisplayDensity.vue"),
        },
      },
      {
        path: "/main/density/addDensity",
        name: "AddDensity",
        components: {
          "main-container": () =>
            import(/* webpackChunkName: "AddDensity" */ "@/views/density/AddDensity.vue"),
        },
      },
      {
        path: "/main/density/updateDensity/:uuid/:measureTime/:measureValue",
        name: "EditDensity",
        components: {
          "main-container": () =>
            import(/* webpackChunkName: "EditDensity" */ "@/views/density/EditDensity.vue"),
        },
      },
      {
        path: "/main/density/addDiet/:date",
        name: "addDiet",
        components: {
          "main-container": () => import(/* webpackChunkName: "AddDietDate" */ "@/views/density/AddDiet.vue"),
        },
      },
      {
        path: "/main/density/editDiet/:dietId/:date",
        name: "EditDiet",
        components: {
          "main-container": () => import(/* webpackChunkName: "AddDiet" */ "@/views/density/AddDiet.vue"),
        },
      },
      {
        path: "/main/density/displayDiet",
        name: "DisplayDiet",
        components: {
          "main-container": () =>
            import(/* webpackChunkName: "DisplayDiet" */ "@/views/density/DisplayDiet.vue"),
        },
      },
      /** Food */
      {
        path: "/main/food",
        name: "Food",
        components: {
          "main-container": () => import(/* webpackChunkName: "Food" */ "@/views/food/Food.vue"),
        },
      },
      /** CookBook */
      {
        path: "/main/cookbook",
        name: "Cookbook",
        components: {
          "main-container": () => import(/* webpackChunkName: "Cookbook" */ "@/views/cookbook/Cookbook.vue"),
        },
      },
      /** profile */
      {
        path: "/main/system",
        name: "System",
        components: {
          "main-container": () => import(/* webpackChunkName: "System" */ "@/views/system/System.vue"),
        },
      },
      {
        path: "/main/system/profile",
        name: "Profile",
        components: {
          "main-container": () => import(/* webpackChunkName: "Profile" */ "@/views/system/Profile.vue"),
        },
      },
    ],
  },
  {
    path: "/login",
    component: () => import(/* webpackChunkName: "Login" */ "@/views/auth/Login.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
