import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import MainLayout from "../components/MainLayout.vue";
import Post from "../components/DetailsView.vue";
import Intel from "../components/Intel.vue";

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
];

const router = new VueRouter({
  routes,
});

export default router;
