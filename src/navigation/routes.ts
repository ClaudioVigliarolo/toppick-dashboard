import ReportsPage from "../routes/ReportsPage/ReportsPage";
import CategoriesPage from "../routes/CategoriesPage/CategoriesPage";
import UsersPage from "../routes/UsersPage/UsersPage";
import TopicsPage from "../routes/TopicsPage/TopicsPage";
import LoginPage from "../routes/LoginPage/LoginPage";
import CreatePage from "../routes/CreatePage/CreatePage";
import TranslatePage from "../routes/TranslatePage/TranslatePage";
import StatisticsPage from "../routes/StatsPage/StatsPage";
import { Route } from "src/interfaces/Interfaces";

export const routes: Route[] = [
  {
    key: "login",
    path: "/login",
    sidebarName: "login",
    navbarName: "login",
    component: LoginPage,
  },

  {
    key: "users",
    path: "/users",
    sidebarName: "users",
    navbarName: "users",
    component: UsersPage,
  },

  {
    key: "stats",
    path: "/stats",
    sidebarName: "statistics",
    navbarName: "Overview",
    component: StatisticsPage,
  },

  {
    key: "translate",
    path: "/translate",
    sidebarName: "translate",
    navbarName: "translate",
    component: TranslatePage,
  },

  {
    key: "create",
    path: "/create",
    sidebarName: "create",
    navbarName: "create",
    component: CreatePage,
  },

  {
    key: "categories",
    path: "/categories",
    sidebarName: "categories",
    navbarName: "categories",
    component: CategoriesPage,
  },
  {
    key: "topics",
    path: "/topics",
    sidebarName: "topics",
    navbarName: "topics",
    component: TopicsPage,
  },
  {
    key: "reports",
    path: "/reports",
    sidebarName: "reports",
    navbarName: "reports",
    component: ReportsPage,
  },
];
