export const isEmpty = (arr) => !Array.isArray(arr) || arr.length === 0;

export const isPid = (pid) => pid && /^\d+$/i.test(pid.toString());

export const isImageFile = (fileName) =>
  /^[a-z1-9-]+\.(jpe?g|png)$/i.test(fileName);

//NO dirty
export const hasFileName = (fileName) =>
  fileName &&
  fileName.length > 0 &&
  fileName !== null &&
  fileName !== undefined &&
  fileName !== "null" &&
  fileName !== "undefined";

export const shoudlFallback = (fallback) => fallback && Boolean(fallback);
