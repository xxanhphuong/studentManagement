import { NavLink } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { authAtom } from "@iso/state";
import { useUserActions } from "@iso/actions";

import { Popover, Avatar, Button } from "antd";
import { PlusOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { getRole } from "../_helpers";
import { userRole } from "@iso/helpers/contant";

function Nav() {
  const auth = useRecoilValue(authAtom);
  const userActions = useUserActions();

  // only show nav when logged in
  if (!auth) return null;
  const content = (
    <ul className="mb-0">
      <Link
        to="/user-profile"
        className="nav-item nav-link cursor-pointer mb-2 block"
      >
        Profile
      </Link>
      <li
        onClick={userActions.logout}
        className="nav-item nav-link cursor-pointer"
      >
        Logout
      </li>
    </ul>
  );

  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      {getRole() == userRole.ADMIN && (
        <Button
          type="dashed"
          onClick={userActions.showUserModal}
          icon={<PlusOutlined />}
        >
          New account
        </Button>
      )}

      <div className="user">
        <Popover placement="bottomRight" content={content} trigger="click">
          <Avatar size="large" icon={<UserOutlined />} />
        </Popover>
      </div>
    </nav>
  );
}

export { Nav };
