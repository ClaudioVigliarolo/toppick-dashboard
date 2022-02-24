import CategoriesPage from "../routes/category";
import UsersPage from "../routes/user";
import TopicsPage from "../routes/topic";
import LoginPage from "../routes/login";
import CreatePage from "../routes/create";
import StatisticsPage from "../routes/stats";
import { Route } from "@/interfaces/app";

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
