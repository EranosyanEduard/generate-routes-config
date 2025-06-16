import type { RouteConfig } from "vue-router";
import type { AsyncComponents } from "./typedef";
import { createViewsVirtualFs, defineRouteConfigs } from "./utils";

function genRouteConfigs(
  arrOfAsyncComponents: readonly AsyncComponents[]
): RouteConfig[] {
  return defineRouteConfigs(createViewsVirtualFs(arrOfAsyncComponents));
}

export default genRouteConfigs;
