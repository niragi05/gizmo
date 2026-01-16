import { BASE_PADDING, LEVEL_PADDING } from "./constants";

export const getItemPadding = (level: number, isFile: boolean) => {
    // files need extra padding since they don't have chevron
    const fileOffset = isFile ? 16 : 0;
    return BASE_PADDING + level * LEVEL_PADDING + fileOffset;
}