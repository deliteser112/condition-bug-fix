import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/condiciones/:id",
    name: "Conditions",
    component: () => import("../views/ConditionsList.vue"),
  },
  {
    path: "/condiciones-detalle/:id",
    name: "ConditionsEdit",
    component: () => import("../views/Conditions.vue"),
  },
  {
    path: "/condiciones-crear/:id",
    name: "ConditionsCreate",
    component: () => import("../views/Conditions.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
