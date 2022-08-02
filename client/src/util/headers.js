export const setHeaders = () => {
  const headers = new Headers();
  headers.append("Cache-Control", "no-cache");
  headers.append("Accept", "application/json");
  return headers;
};
