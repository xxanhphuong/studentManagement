import { atom } from "recoil";

const usersAtom = atom({
  key: "users",
  default: null,
});

const usersProfileAtom = atom({
  key: "usersProfile",
  default: null,
});

export { usersAtom };
export { usersProfileAtom };
