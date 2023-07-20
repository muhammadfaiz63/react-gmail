import { lazy } from "react";

import { Navigate } from "react-router-dom";
// project import
import Loadable from "components/Loadable";
import MainLayout from "layout/MainLayout";
import MinimalLayout from "layout/MinimalLayout";

//import step sementara
// render - dashboard
const DashboardDefault = Loadable(lazy(() => import("pages/dashboard")));
const Users = Loadable(lazy(() => import("pages/data-master/users")));
const UsersForm = Loadable(lazy(() => import("pages/data-master/users/Form")));
const Docket = Loadable(lazy(() => import("pages/data-master/docket")));
const DocketForm = Loadable(lazy(() => import("pages/data-master/docket/Form")));
const Patent = Loadable(lazy(() => import("pages/data-master/patent")));
const PatentForm = Loadable(lazy(() => import("pages/data-master/patent/Form")));

const Trademark = Loadable(lazy(() => import("pages/data-master/trademark")));
const TrademarkForm = Loadable(lazy(() => import("pages/data-master/trademark/Form")));
const Schedule = Loadable(lazy(() => import('pages/data-master/schedule')))
const Report = Loadable(lazy(() => import('pages/data-master/report')))
const ReportForm = Loadable(lazy(() => import('pages/data-master/report/Form')))


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
        element: <DashboardDefault />,
      },
      {
        path: "app",
        element: <DashboardDefault />,
      },
      {
        path: "app/dashboard",
        element: <DashboardDefault />,
      },
      {
        path: "app/users",
        element: <Users />,
      },
      {
        path: "app/users/form/:id",
        element: <UsersForm />,
      },
      {
        path: "app/docket",
        element: <Docket />,
      },
      {
        path: "app/docket/form/:id",
        element: <DocketForm />,
      },
      {
        path: "app/patent",
        element: <Patent />,
      },
      {
        path: "app/patent/form/:id",
        element: <PatentForm />,
      },
      {
        path: "app/trademark",
        element: <Trademark />,
      },
      {
        path: "app/trademark/form/:id",
        element: <TrademarkForm />,
      },
      {
        path: 'app/schedule',
        element: <Schedule />,
      },
      {
        path: 'app/report',
        element: <Report />,
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
