import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import MainLayout from "../components/MainLayout.vue";
import Post from "../components/DetailsView.vue";
import Intel from "../components/Intel.vue";
import Currencies from "../components/Currencies.vue";
import Chart from "../components/Chart.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "MainLayout",
    component: MainLayout,
  },
  {
    path: "/post/:id",
    name: "Post",
    component: Post,
    children: [
      {
        path: ":code/",
        name: "Intel",
        component: Intel,
      },
    ],
  },
  {
    path: "/currencies",
    name: "Currencies",
    component: Currencies,
    // children: [
    // ],
  },
  {
    path: "/chart/:code",
    name: "Chart",
    component: Chart,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
