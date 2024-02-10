import type { MediaQueries } from "./types";

export const defaultUnits: Partial<Record<keyof MediaQueries, string>> = {
    width: "px",
    minWidth: "px",
    maxWidth: "px",
    height: "px",
    minHeight: "px",
    maxHeight: "px",
    resolution: "dpi",
    minResolution: "dpi",
    maxResolution: "dpi",
};
