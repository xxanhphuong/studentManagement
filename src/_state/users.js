import { atom } from "recoil";

const usersAtom = atom({
  key: "users",
  default: null,
});

const usersProfileAtom = atom({
  key: "usersProfile",
  default: null,
});

const usersModalVisibleAtom = atom({
  key: "usersModalVisible",
  default: false,
});

export { usersAtom };
export { usersProfileAtom };
export { usersModalVisibleAtom };
