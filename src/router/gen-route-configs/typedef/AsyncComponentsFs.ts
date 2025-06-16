import type { AsyncComponent } from "vue";

export interface AsyncComponentsFs {
  [key: string]: AsyncComponent | AsyncComponentsFs;
}
