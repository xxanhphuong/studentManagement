import { NavLink } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { authAtom } from "@iso/state";
import { useUserActions } from "@iso/actions";

import { Popover, Button, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

function Nav() {
  const auth = useRecoilValue(authAtom);
  const userActions = useUserActions();

  // only show nav when logged in
  if (!auth) return null;
  const content = (
    <div>
      <p onClick={userActions.logout} className="nav-item nav-link">
        Logout
      </p>
    </div>
  );

  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <div className="user">
        <Popover placement="bottomRight" content={content} trigger="click">
          <Avatar size="large" icon={<UserOutlined />} />
        </Popover>
      </div>
    </nav>
  );
}

export { Nav };
