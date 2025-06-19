import _castArray from "lodash-es/castArray";
import _every from "lodash-es/every";
import _isFunction from "lodash-es/isFunction";
import _isObject from "lodash-es/isObject";
import _pickBy from "lodash-es/pickBy";
import _reduce from "lodash-es/reduce";
import type { DeepReadonly } from "vue";
import type { RouteConfig } from "vue-router";
import type { RouteConfigSingleView } from "vue-router/types/router";
import zod from "zod";
import type { AsyncComponentsFs } from "../../typedef";

function defineRouteConfig(
  asyncComponentFs: DeepReadonly<AsyncComponentsFs[keyof AsyncComponentsFs]>,
  viewDir: string
): RouteConfig | RouteConfig[] {
  return _reduce<
    AsyncComponentsFs[keyof AsyncComponentsFs],
    RouteConfigSingleView
  >(
    asyncComponentFs,
    (acc, asyncComponentFs, filePath) => {
      if (_isFunction(asyncComponentFs)) {
        acc.beforeEnter = (to, from, next) => {
          const params = _pickBy(to.params, (_, key) =>
            key.toLowerCase().endsWith("id")
          );
          const canNext = _every(params, (value) => {
            return zod.coerce
              .number()
              .int()
              .or(zod.string().uuid())
              .safeParse(value).success;
          });
          next(canNext && undefined);
        };
        acc.component = asyncComponentFs;
        acc.name = `/${viewDir}`;
        acc.path = `/${viewDir}`;
        acc.props = (route) => ({ ...route.params });
      } else if (_isObject(asyncComponentFs)) {
        acc.children!.push(
          ..._castArray(defineRouteConfig(asyncComponentFs, filePath))
        );
      }
      return acc;
    },
    { children: [], name: "", path: "" }
  );
}

export default defineRouteConfig;
