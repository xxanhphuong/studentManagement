import React, { lazy, Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

const routes = [
  {
    path: "user-profile",
    component: lazy(() => import("@iso/pages/userProfile/UserProfile")),
    exact: true,
  },
  {
    path: "user",
    component: lazy(() => import("@iso/pages/user/User")),
    exact: true,
  },
  {
    path: "user/detail/:id",
    component: lazy(() => import("@iso/pages/user/Detail")),
    exact: true,
  },
  {
    path: "user/update/:id",
    component: lazy(() => import("@iso/pages/user/Update")),
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
  {
    path: "student",
    component: lazy(() => import("@iso/pages/student/Student")),
    exact: true,
  },
  {
    path: "student/update/:id",
    component: lazy(() => import("@iso/pages/student/Add")),
    exact: true,
  },
  {
    path: "student/detail/:id",
    component: lazy(() => import("@iso/pages/student/Detail")),
    exact: true,
  },
  {
    path: "score",
    component: lazy(() => import("@iso/pages/score/Score")),
    exact: true,
  },
  {
    path: "score/detail/:id",
    component: lazy(() => import("@iso/pages/score/Detail")),
    exact: true,
  },
  {
    path: "subject",
    component: lazy(() => import("@iso/pages/subject/Subject")),
    exact: true,
  },
  {
    path: "subject/add",
    component: lazy(() => import("@iso/pages/subject/Add")),
    exact: true,
  },
  {
    path: "subject/update/:id",
    component: lazy(() => import("@iso/pages/subject/Add")),
    exact: true,
  },
  {
    path: "subject/detail/:id",
    component: lazy(() => import("@iso/pages/subject/Detail")),
    exact: true,
  },
  {
    path: "teacher",
    component: lazy(() => import("@iso/pages/teacher/Teacher")),
    exact: true,
  },
  {
    path: "teacher/update/:id",
    component: lazy(() => import("@iso/pages/teacher/Add")),
    exact: true,
  },
  {
    path: "teacher/detail/:id",
    component: lazy(() => import("@iso/pages/teacher/Detail")),
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
