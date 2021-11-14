import React, { lazy, Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

const routes = [
  {
    path: "user-profile",
    component: lazy(() => import("@iso/pages/userProfile/UserProfile")),
    exact: true,
  },
  //#endregion
];

export default function MainRoutes() {
  // const { url } = useRouteMatch();
  return (
    <Suspense fallback={<p>loading</p>}>
      <Switch>
        {routes.map((route, idx) => (
          <Route exact={route.exact} key={idx} path={`/${route.path}`}>
            <route.component />
          </Route>
        ))}
        {/* <Redirect to="/404" /> */}
      </Switch>
    </Suspense>
  );
}
