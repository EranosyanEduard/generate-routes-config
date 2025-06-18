import _castArray from "lodash-es/castArray";
import _flatMap from "lodash-es/flatMap";
import _isEmpty from "lodash-es/isEmpty";
import _omit from "lodash-es/omit";
import _reduce from "lodash-es/reduce";
import type { DeepReadonly } from "vue";
import type { RouteConfig } from "vue-router";
import type { AsyncComponentsFs } from "../../typedef";
import { defineRouteConfig } from "../define-route-config";

function defineRouteConfigs(
  asyncComponentsFs: DeepReadonly<AsyncComponentsFs>
): RouteConfig[] {
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
  const flattedRouteConfigs = (
    routeConfigs: readonly RouteConfig[],
    rootRouteConfig?: Readonly<RouteConfig>
  ): RouteConfig[] => {
    const { name: rootRouteName = "", path: rootRoutePath = "" } =
      rootRouteConfig ?? {};
    return _flatMap(routeConfigs, (routeConfig) => {
      const name = `${rootRouteName === "/" ? "" : rootRouteName}${
        routeConfig.name
      }`;
      const path = `${rootRoutePath === "/" ? "" : rootRouteName}${
        routeConfig.path
      }`;
      const routeConfig_ = { ...routeConfig, name, path };
      if (_isEmpty(routeConfig_.children)) return routeConfig_;
      return [
        { ...routeConfig_, children: [] },
        ..._flatMap(routeConfig_.children, (it) =>
          flattedRouteConfigs([it], routeConfig_)
        ),
      ];
    });
  };
  return flattedRouteConfigs([routeConfig]);
}

export default defineRouteConfigs;
