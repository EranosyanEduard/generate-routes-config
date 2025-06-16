import _castArray from "lodash-es/castArray";
import _flatMap from "lodash-es/flatMap";
import _isEmpty from "lodash-es/isEmpty";
import _reduce from "lodash-es/reduce";
import type { DeepReadonly } from "vue";
import type { RouteConfig } from "vue-router";
import type { AsyncComponentsFs } from "../../typedef";
import { defineRouteConfig } from "../define-route-config";

function defineRouteConfigs(
  asyncComponentsFs: DeepReadonly<AsyncComponentsFs>
): RouteConfig[] {
  const nestedRouteConfigs = _reduce<AsyncComponentsFs, RouteConfig[]>(
    asyncComponentsFs,
    (acc, asyncComponentFs, viewDir) => {
      acc.push(..._castArray(defineRouteConfig(asyncComponentFs, viewDir)));
      return acc;
    },
    []
  );
  const flattedRouteConfigs = (
    routeConfigs: readonly RouteConfig[],
    rootRouteConfig?: Readonly<RouteConfig>
  ): RouteConfig[] => {
    return _flatMap(routeConfigs, (routeConfig) => {
      const name = `${rootRouteConfig?.name ?? ""}/${routeConfig.name}`;
      const path = `${rootRouteConfig?.path ?? ""}${routeConfig.path}`;
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
  return flattedRouteConfigs(nestedRouteConfigs);
}

export default defineRouteConfigs;
