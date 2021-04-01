import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import MainLayout from "../components/MainLayout.vue";
import Post from "../components/Post.vue";

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
  },
];

const router = new VueRouter({
  routes,
});

export default router;
