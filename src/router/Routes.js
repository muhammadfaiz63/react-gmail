import { lazy } from "react";

import { Navigate } from "react-router-dom";
// project import
import Loadable from "components/Loadable";
import MainLayout from "layout/MainLayout";
import MinimalLayout from "layout/MinimalLayout";

// render - dashboard
const EmailDefault = Loadable(lazy(() => import("pages/email")));
const EmailDetail = Loadable(lazy(() => import("pages/email/detail")));
const Users = Loadable(lazy(() => import("pages/data-master/users")));
const UsersForm = Loadable(lazy(() => import("pages/data-master/users/Form")));

// authentication
const AuthLogin = Loadable(lazy(() => import("pages/authentication/Login")));
const AuthRegister = Loadable(lazy(() => import("pages/authentication/Register")));

const routes = (isLoggedIn) => [
  {
    path: "/",
    element: isLoggedIn ? <MainLayout /> : <Navigate to="/login" />,
    children: [
      {
        path: "",
        element: <EmailDefault />,
      },
      {
        path: "app",
        element: <EmailDefault />,
      },
      {
        path: "app/dashboard",
        element: <EmailDefault />,
      },
      {
        path: "app/email",
        element: <EmailDefault />,
      },
      {
        path: "app/email/:id",
        element: <EmailDetail />,
      },
      {
        path: "app/users",
        element: <Users />,
      },
      {
        path: "app/users/form/:id",
        element: <UsersForm />,
      }
    ],
  },
  {
    path: "/",
    element: !isLoggedIn ? <MinimalLayout /> : <Navigate to="/app/dashboard" />,
    children: [
      {
        path: "login",
        element: <AuthLogin />,
      },
      {
        path: "register",
        element: <AuthRegister />,
      },
    ],
  },
];

export default routes;
