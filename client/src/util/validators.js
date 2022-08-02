export const hasPid = (pid) => pid !== null || pid !== undefined || pid !== "null" || pid !== "undefined";

export const hasImg = (img) => img && img.length > 0;

export const hasImgData = (imgData) => imgData && imgData.images && Object.keys(imgData.images[0]).length === 0;

export const isEmpty = (arr) => arr && arr.length === 0;

export const isPid = (pid) => /\d+/gi.test(+pid);
