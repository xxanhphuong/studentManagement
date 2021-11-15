export * from "./fake-backend";
export * from "./fetch-wrapper";
export * from "./history";

export function init_object(key) {
  const object = localStorage.getItem(key);
  if (object) {
    return JSON.parse(object);
  }
  return {};
}
