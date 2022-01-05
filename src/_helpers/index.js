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

export function getRole() {
  const userInfo = JSON.parse(localStorage.getItem("user"));
  if (userInfo) {
    return userInfo?.role;
  } else {
    return null;
  }
}
