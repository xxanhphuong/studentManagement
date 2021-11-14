import { useRecoilValue } from "recoil";

import { authAtom } from "@iso/state";
import { useUserActions } from "@iso/actions";

export default function UserProfile() {
  const auth = useRecoilValue(authAtom);
  const userActions = useUserActions();

  return <section className="user-profile">User profile</section>;
}
