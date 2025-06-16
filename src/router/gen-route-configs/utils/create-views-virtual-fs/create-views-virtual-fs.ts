import _mapKeys from "lodash-es/mapKeys";
import _merge from "lodash-es/merge";
import type { AsyncComponents, AsyncComponentsFs } from "../../typedef";
import { createVirtualFs } from "../create-virtual-fs";

function createViewsVirtualFs(
  arrOfAsyncComponents: readonly AsyncComponents[]
): AsyncComponentsFs {
  return arrOfAsyncComponents.reduce((acc, asyncComponents) => {
    const asyncComponents_ = _mapKeys(asyncComponents, (_, filePath) => {
      const [, viewFilePath = filePath] = filePath.split("/views/", 2);
      return viewFilePath;
    });
    return _merge(acc, createVirtualFs(asyncComponents_));
  }, {});
}

export default createViewsVirtualFs;
