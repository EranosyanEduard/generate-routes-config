import _reduce from "lodash-es/reduce";
import _set from "lodash-es/set";
import type { AsyncComponents, AsyncComponentsFs } from "../../typedef";

function createVirtualFs(
  asyncComponents: Readonly<AsyncComponents>
): AsyncComponentsFs {
  return _reduce(
    asyncComponents,
    (acc, asyncComponent, filePath) => {
      return _set(acc, filePath.split(/\/+/), asyncComponent);
    },
    {}
  );
}

export default createVirtualFs;
