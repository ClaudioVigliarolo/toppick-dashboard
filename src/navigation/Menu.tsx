import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
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
import { colors, LinearProgress, MenuItem, Select } from "@material-ui/core";
import LanguageSelect from "../components/select/LanguageSelect";
import HeaderSection from "../components/layout/HeaderSection";
import { getCondition } from "./Index";
import { logoutUser } from "../api/api";
import { Lang } from "src/interfaces/Interfaces";
const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerItem: {
      color: COLORS.menuText,
      textTransform: "uppercase",
      fontWeight: "bolder",
      float: "left",
    },
    childrenContainer: {
      paddingTop: 100,
      backgroundColor: COLORS.primaryBackground,
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      minHeight: "100vh",
      width: "100%",
    },
    paper: {
      background: "red",
      color: "red",
    },
    drawerPaper: {
      width: drawerWidth,
      background: COLORS.menuContainer,
      color: "#fff",
    },
    colorLinearProgress: {
      backgroundColor: COLORS.lighterOrange,
    },
    bardLinearProgress: {
      backgroundColor: COLORS.darkerOrange,
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
  })
);

const routers = [
  {
    key: "login",
    path: "/login",
    sidebarName: "login",
    navbarName: "login",
  },

  {
    key: "users",
    path: "/users",
    sidebarName: "users",
    navbarName: "users",
  },

  {
    key: "stats",
    path: "/stats",
    sidebarName: "statistics",
    navbarName: "Overview",
  },

  {
    key: "translate",
    path: "/translate",
    sidebarName: "translate",
    navbarName: "translate",
  },

  {
    key: "create",
    path: "/create",
    sidebarName: "create",
    navbarName: "create",
  },

  {
    key: "registration",
    path: "/registration",
    sidebarName: "registration",
    navbarName: "registration",
  },

  {
    key: "register",
    path: "/register",
    sidebarName: "register",
    navbarName: "register",
  },

  {
    key: "categories",
    path: "/categories",
    sidebarName: "categories",
    navbarName: "categories",
  },
  {
    key: "topics",
    path: "/topics",
    sidebarName: "topics",
    navbarName: "topics",
  },
  {
    key: "questions",
    path: "/questions",
    sidebarName: "questions",
    navbarName: "questions",
  },
  {
    key: "reports",
    path: "/reports",
    sidebarName: "reports",
    navbarName: "reports",
  },
];
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
  const classes = useStyles();
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
    const route = routers.find((route) => route.path == path);
    return route ? route.navbarName : "Not found";
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={classes.appBar}
        style={{ backgroundColor: "#fff", color: COLORS.primaryOrange }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap>
            TOP Picks
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
        {loading && (
          <LinearProgress
            classes={{
              colorPrimary: classes.colorLinearProgress,
              barColorPrimary: classes.bardLinearProgress,
            }}
          />
        )}
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
          {routers.map(
            (prop: any, key: number) =>
              getCondition(
                userType,
                prop.path,
                isAuthenticated,
                currentLanguage
              ) && (
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
