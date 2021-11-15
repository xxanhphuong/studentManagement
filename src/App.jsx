import { Router, Route, Switch, Redirect } from "react-router-dom";

import { Nav, PrivateRoute } from "@iso/components";
import { history } from "@iso/helpers";
import { Main } from "@iso/pages/main";
import { Login } from "@iso/pages/login";
import { Button } from "antd";
import "@iso/assets/app.scss";
import { Toaster } from "react-hot-toast";

export { App };

function App() {
  // const toastOptions = {
  //   success: {
  //     style: {
  //       background: "green",
  //     },
  //   },
  //   error: {
  //     style: {
  //       background: "red",
  //       color: "white",
  //     },
  //   },
  // };
  const toastContainerStyle = {
    top: 20,
    left: 20,
    bottom: 20,
    right: 20,
  };
  return (
    <div className="app-container bg-light">
      {/* <Router history={history}> */}
      <Toaster containerStyle={toastContainerStyle} position="top-center" />
      <Router history={history}>
        <Switch>
          <Route path="/login" component={Login} />
          <PrivateRoute path="/" component={Main} />
          <Redirect to="/404" />
        </Switch>
      </Router>
    </div>
  );
}
