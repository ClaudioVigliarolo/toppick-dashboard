import CategoriesPage from "../routes/CategoriesPage";
import UsersPage from "../routes/UsersPage";
import TopicsPage from "../routes/TopicsPage";
import LoginPage from "../routes/LoginPage";
import CreatePage from "../routes/CreatePage";
import StatisticsPage from "../routes/StatsPage";
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
];
