import _castArray from "lodash-es/castArray";
import _omit from "lodash-es/omit";
import _reduce from "lodash-es/reduce";
import type { DeepReadonly } from "vue";
import type { RouteConfig } from "vue-router";
import type { AsyncComponentsFs } from "../../typedef";
import { defineRouteConfig } from "../define-route-config";

function defineRouteConfigs(
  asyncComponentsFs: DeepReadonly<AsyncComponentsFs>
): RouteConfig {
  const routeConfig = {
    children: _reduce<AsyncComponentsFs, RouteConfig[]>(
      _omit(asyncComponentsFs, ["Index.vue"]),
      (acc, asyncComponentFs, viewDir) => {
        acc.push(..._castArray(defineRouteConfig(asyncComponentFs, viewDir)));
        return acc;
      },
      []
    ),
    component: asyncComponentsFs["Index.vue"],
    name: "/",
    path: "/",
  } as const satisfies RouteConfig;
  return routeConfig;
}

export default defineRouteConfigs;
