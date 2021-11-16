import React, { lazy, Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

const routes = [
  {
    path: "user-profile",
    component: lazy(() => import("@iso/pages/userProfile/UserProfile")),
    exact: true,
  },
  {
    path: "class",
    component: lazy(() => import("@iso/pages/class/Class")),
    exact: true,
  },
  {
    path: "class/add",
    component: lazy(() => import("@iso/pages/class/Add")),
    exact: true,
  },
  {
    path: "class/update/:id",
    component: lazy(() => import("@iso/pages/class/Add")),
    exact: true,
  },
  {
    path: "class/detail/:id",
    component: lazy(() => import("@iso/pages/class/Detail")),
    exact: true,
  },
  {
    path: "major",
    component: lazy(() => import("@iso/pages/major/Major")),
    exact: true,
  },
  {
    path: "major/add",
    component: lazy(() => import("@iso/pages/major/Add")),
    exact: true,
  },
  {
    path: "major/update/:id",
    component: lazy(() => import("@iso/pages/major/Add")),
    exact: true,
  },
  {
    path: "major/detail/:id",
    component: lazy(() => import("@iso/pages/major/Detail")),
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
