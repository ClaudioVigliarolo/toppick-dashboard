import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import ReportsPage from "../routes/ReportsPage";
import CategoriesPage from "../routes/CategoriesPage";
import UsersPage from "../routes/UsersPage";
import TopicsPage from "../routes/TopicsPage";
import QuestionsPage from "../routes/QuestionsPage";
import LoginPage from "../routes/LoginPage";
import CreatePage from "../routes/CreatePage";
import CustomRoute from "./CustomRoute";
import Menu from "./Menu";
import { getUpdates } from "../api/api";
import { getCurrentTime } from "src/utils/utils";

export const getCondition = (
  userType: string,
  path: string,
  isAuthenticated: boolean
) => {
  switch (path) {
    case "/login":
      return !isAuthenticated;
    case "/users":
      return isAuthenticated && userType == "root";
    case "/categories":
      return isAuthenticated;
    case "/topics":
      return isAuthenticated;
    case "/create":
      return isAuthenticated;
    case "/questions":
      return isAuthenticated;
    case "/reports":
      return isAuthenticated;

    default:
      return false;
  }
};

export const Navigation = () => {
  const {
    isAuthenticated,
    userType,
    userToken,
    username,
    userLanguages,
    setCurrentLanguage,
    currentLanguage,
  } = React.useContext(AuthContext);

  React.useEffect(() => {}, []);
  return (
    <Menu
      userType={userType}
      isAuthenticated={isAuthenticated}
      token={userToken}
      username={username}
      setCurrentLanguage={setCurrentLanguage}
      languages={userLanguages}
      currentLanguage={currentLanguage}
      children={
        <Switch>
          <Redirect
            exact
            from="/"
            to={isAuthenticated ? "categories/en" : "/login"}
          />
          <CustomRoute
            path="/login"
            condition={getCondition(userType, "/login", isAuthenticated)}
            Component={LoginPage}
            isAuthenticated={isAuthenticated}
            token={userToken}
            currentLanguage={currentLanguage}
          />

          <CustomRoute
            condition={getCondition(userType, "/categories", isAuthenticated)}
            path="/categories"
            isAuthenticated={isAuthenticated}
            Component={CategoriesPage}
            token={userToken}
            currentLanguage={currentLanguage}
          />

          <CustomRoute
            condition={getCondition(userType, "/users", isAuthenticated)}
            isAuthenticated={isAuthenticated}
            path="/users"
            Component={UsersPage}
            token={userToken}
            currentLanguage={currentLanguage}
          />

          <CustomRoute
            condition={getCondition(userType, "/topics", isAuthenticated)}
            path="/topics"
            isAuthenticated={isAuthenticated}
            Component={TopicsPage}
            token={userToken}
            currentLanguage={currentLanguage}
          />

          <CustomRoute
            condition={getCondition(userType, "/questions", isAuthenticated)}
            path="/questions"
            isAuthenticated={isAuthenticated}
            Component={QuestionsPage}
            token={userToken}
            currentLanguage={currentLanguage}
          />

          <CustomRoute
            condition={getCondition(userType, "/reports", isAuthenticated)}
            path="/reports"
            isAuthenticated={isAuthenticated}
            Component={ReportsPage}
            token={userToken}
            currentLanguage={currentLanguage}
          />

          <CustomRoute
            condition={getCondition(userType, "/create", isAuthenticated)}
            path="/create"
            isAuthenticated={isAuthenticated}
            Component={CreatePage}
            token={userToken}
            currentLanguage={currentLanguage}
          />
        </Switch>
      }
    />
  );
};
