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
import TranslatePage from "../routes/TranslatePage";
import StatisticsPage from "../routes/StatisticsPage";

import CustomRoute from "./CustomRoute";
import Menu from "./Menu";
import { getUpdates } from "../api/api";
import { Lang } from "src/interfaces/Interfaces";
import { StatusContext } from "src/context/StatusContext";

export const getCondition = (
  userType: string,
  path: string,
  isAuthenticated: boolean,
  lang?: Lang
) => {
  switch (path) {
    case "/login":
      return !isAuthenticated;
    case "/users":
      return isAuthenticated && userType == "root";
    case "/stats":
      return isAuthenticated && userType == "root";

    case "/translate": //userType == "translated"
      return isAuthenticated;

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
    languages,
    setCurrentLanguage,
    currentLanguage,
  } = React.useContext(AuthContext);

  const {
    setLoading,
    loading,
    onError,
    onSuccess,
    error,
    success,
  } = React.useContext(StatusContext);

  React.useEffect(() => {
    (async () => {
      console.log("ggg", await getUpdates("Sun May 11,2014", Lang.EN, 1234));
    })();
  }, []);

  return (
    <Menu
      loading={loading}
      userType={userType}
      isAuthenticated={isAuthenticated}
      token={userToken}
      username={username}
      setCurrentLanguage={setCurrentLanguage}
      languages={languages}
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
            setLoading={setLoading}
            loading={loading}
            onError={onError}
            onSuccess={onSuccess}
            error={error}
            success={success}
          />

          <CustomRoute
            condition={getCondition(userType, "/categories", isAuthenticated)}
            path="/categories"
            isAuthenticated={isAuthenticated}
            Component={CategoriesPage}
            token={userToken}
            currentLanguage={currentLanguage}
            setLoading={setLoading}
            loading={loading}
            onError={onError}
            onSuccess={onSuccess}
            error={error}
            success={success}
          />

          <CustomRoute
            condition={getCondition(userType, "/users", isAuthenticated)}
            isAuthenticated={isAuthenticated}
            path="/users"
            Component={UsersPage}
            token={userToken}
            currentLanguage={currentLanguage}
            setLoading={setLoading}
            loading={loading}
            onError={onError}
            onSuccess={onSuccess}
            error={error}
            success={success}
          />

          <CustomRoute
            condition={getCondition(userType, "/topics", isAuthenticated)}
            path="/topics"
            isAuthenticated={isAuthenticated}
            Component={TopicsPage}
            token={userToken}
            currentLanguage={currentLanguage}
            setLoading={setLoading}
            loading={loading}
            onError={onError}
            onSuccess={onSuccess}
            error={error}
            success={success}
          />

          <CustomRoute
            condition={getCondition(userType, "/questions", isAuthenticated)}
            path="/questions"
            isAuthenticated={isAuthenticated}
            Component={QuestionsPage}
            token={userToken}
            currentLanguage={currentLanguage}
            setLoading={setLoading}
            loading={loading}
            onError={onError}
            onSuccess={onSuccess}
            error={error}
            success={success}
          />

          <CustomRoute
            condition={getCondition(userType, "/reports", isAuthenticated)}
            path="/reports"
            isAuthenticated={isAuthenticated}
            Component={ReportsPage}
            token={userToken}
            currentLanguage={currentLanguage}
            setLoading={setLoading}
            loading={loading}
            onError={onError}
            onSuccess={onSuccess}
            error={error}
            success={success}
          />

          <CustomRoute
            condition={getCondition(userType, "/create", isAuthenticated)}
            path="/create"
            isAuthenticated={isAuthenticated}
            Component={CreatePage}
            token={userToken}
            currentLanguage={currentLanguage}
            setLoading={setLoading}
            loading={loading}
            onError={onError}
            onSuccess={onSuccess}
            error={error}
            success={success}
          />

          <CustomRoute
            condition={getCondition(userType, "/stats", isAuthenticated)}
            path="/stats"
            isAuthenticated={isAuthenticated}
            Component={StatisticsPage}
            token={userToken}
            currentLanguage={currentLanguage}
            setLoading={setLoading}
            loading={loading}
            onError={onError}
            onSuccess={onSuccess}
            error={error}
            success={success}
          />

          <CustomRoute
            condition={getCondition(
              userType,
              "/translate",
              isAuthenticated,
              currentLanguage
            )}
            path="/translate"
            isAuthenticated={isAuthenticated}
            Component={TranslatePage}
            token={userToken}
            currentLanguage={currentLanguage}
            setLoading={setLoading}
            loading={loading}
            onError={onError}
            onSuccess={onSuccess}
            error={error}
            success={success}
          />
        </Switch>
      }
    />
  );
};
