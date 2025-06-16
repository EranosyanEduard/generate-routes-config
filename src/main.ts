import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import "./router";
import { genRouteConfigs } from "./router/gen-route-configs";
import type { AsyncComponents } from "./router/gen-route-configs/typedef";

const asyncComponents: readonly AsyncComponents[] = [
  import.meta.glob<true, string, AsyncComponents[keyof AsyncComponents]>([
    "./tasks/common/views/**/Index.vue",
  ]),
  import.meta.glob<true, string, AsyncComponents[keyof AsyncComponents]>([
    "./tasks/admin/views/**/Index.vue",
  ]),
];

const routes = genRouteConfigs(asyncComponents);
console.log(routes);

new Vue({
  router: new VueRouter({
    mode: "history",
    base: import.meta.env.BASE_URL,
    routes,
  }),
  render: (h) => h(App),
}).$mount("#app");
