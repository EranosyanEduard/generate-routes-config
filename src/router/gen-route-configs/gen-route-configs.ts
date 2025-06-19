import type { RouteConfig } from "vue-router";
import type { AsyncComponents } from "./typedef";
import {
  createViewsVirtualFs,
  defineRouteConfigs,
  flatRouteConfigs,
} from "./utils";

function genRouteConfigs(
  arrOfAsyncComponents: readonly AsyncComponents[],
  config: {
    processRouteName: (
      routePath: NonNullable<RouteConfig["name"]>
    ) => NonNullable<RouteConfig["name"]>;
    processRoutePath: (
      routePath: NonNullable<RouteConfig["path"]>
    ) => NonNullable<RouteConfig["path"]>;
  } | null = null
): RouteConfig[] {
  const { processRouteName, processRoutePath } = config ?? {
    processRouteName: (routeName) => {
      return routeName.replace(/(^\/+|\/+$)/g, "").replace(/\/+:?/g, "-");
    },
    processRoutePath: (routePath) => {
      return routePath.replace(/:\w+/g, (match) => `${match}(\\d+)`);
    },
  };
  const routeConfigs = flatRouteConfigs(
    defineRouteConfigs(createViewsVirtualFs(arrOfAsyncComponents))
  );
  return routeConfigs.map((routeConfig) => {
    routeConfig.name = processRouteName(routeConfig.name!);
    routeConfig.path = processRoutePath(routeConfig.path);
    return routeConfig;
  });
}

export default genRouteConfigs;
