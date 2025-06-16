import type { ImportedComponent } from "vue/types/options";

export type AsyncComponents = Record<string, () => Promise<ImportedComponent>>;
