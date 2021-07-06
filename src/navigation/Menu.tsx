import React from "react";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import { Link, useLocation } from "react-router-dom";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { COLORS } from "../constants/Colors";
import { routes } from "./routes";
import { LinearProgress, MenuItem, withStyles } from "@material-ui/core";
import LanguageSelect from "../components/select/LanguageSelect";
import HeaderSection from "../components/layout/HeaderSection";
import { getCondition } from "./Index";
import { logoutUser } from "../api/api";
import { Lang } from "src/interfaces/Interfaces";
import { useAppStyles } from "src/styles/common";

const StyledLinearProgress = withStyles({
  colorPrimary: {
    backgroundColor: COLORS.lighterOrange,
  },
  barColorPrimary: {
    backgroundColor: COLORS.darkerOrange,
  },
})(LinearProgress);

export default function PersistentDrawerLeft({
  children,
  userType,
  isAuthenticated,
  token,
  username,
  languages,
  setCurrentLanguage,
  currentLanguage,
  loading,
}: {
  children: React.ReactNode;
  userType: string;
  isAuthenticated: boolean;
  token: string;
  username: string;
  languages: Lang[];
  setCurrentLanguage: (newLang: Lang) => void;
  currentLanguage: Lang;
  loading: boolean;
}) {
  const classes = useAppStyles();
  const [path, setPath] = React.useState("");

  let location = useLocation();

  const refreshPage = () => {
    window.location.reload();
  };

  React.useEffect(() => {
    setPath(location.pathname);
  }, [location, setPath]);

  const activetRoute = (route: string) => {
    return route === path;
  };

  const getRouteName = (path: string) => {
    const route = routes.find((route) => route.path == path);
    return route ? route.navbarName : "Not found";
  };

  return (
    <div className={classes.menu}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={classes.appBar}
        style={{ backgroundColor: "#fff", color: COLORS.primaryOrange }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap>
            TOP Pick
          </Typography>
          {isAuthenticated && (
            <div style={{ position: "absolute", right: 20, top: 0 }}>
              <LanguageSelect
                languages={languages}
                currentLanguage={currentLanguage}
                onLanguageChange={setCurrentLanguage}
              />
            </div>
          )}
        </Toolbar>
        {loading && <StyledLinearProgress />}
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <Divider />
        <List>
          {routes.map(
            (prop: any, key: number) =>
              getCondition(userType, prop.path, isAuthenticated) && (
                <Link
                  to={prop.path}
                  style={{ textDecoration: "none" }}
                  key={key}
                >
                  <MenuItem selected={activetRoute(prop.path)}>
                    <ListItemText
                      className={classes.drawerItem}
                      primary={prop.sidebarName}
                    />
                  </MenuItem>
                </Link>
              )
          )}
        </List>
        <Divider />
        <Divider />
        <List>
          {isAuthenticated && (
            <ListItem
              button
              onClick={() => {
                logoutUser(token);
                localStorage.removeItem("token");
                localStorage.removeItem("language");
                refreshPage();
              }}
            >
              <ListItemIcon>
                <ExitToAppIcon style={{ color: COLORS.menuIcon }} />
              </ListItemIcon>
              (
              <ListItemText primary="logout" className={classes.drawerItem} />)
            </ListItem>
          )}
        </List>
      </Drawer>
      <div className={classes.childrenContainer}>
        <HeaderSection title={getRouteName(path)} />
        {children}
      </div>
    </div>
  );
}
