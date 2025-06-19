import _flatMap from "lodash-es/flatMap";
import _isEmpty from "lodash-es/isEmpty";
import _omit from "lodash-es/omit";
import type { DeepReadonly } from "vue";
import type { RouteConfig } from "vue-router";

function flatRouteConfigs(
  routeConfig: DeepReadonly<RouteConfig>
): RouteConfig[] {
  const go = (
    routeConfigs: ReadonlyArray<DeepReadonly<RouteConfig>>,
    rootRouteConfig?: DeepReadonly<RouteConfig>
  ): RouteConfig[] => {
    const { name: rootName = "", path: rootPath = "" } =
      rootRouteConfig ?? {};
    return _flatMap(routeConfigs, (routeConfig) => {
      const name = `${rootName === "/" ? "" : rootName}${
        routeConfig.name
      }`;
      const path = `${rootPath === "/" ? "" : rootName}${
        routeConfig.path
      }`;
      const routeConfig_ = _omit({ ...routeConfig, name, path }, ['children']);
      if (_isEmpty(routeConfig.children)) return routeConfig_;
      return [
        routeConfig_,
        ..._flatMap(routeConfig.children, (it) =>
          go([it], routeConfig_)
        ),
      ];
    });
  };
  return go([routeConfig]);
}

export default flatRouteConfigs;
