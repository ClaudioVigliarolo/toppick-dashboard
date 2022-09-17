import React from "react";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import { Link, useLocation } from "react-router-dom";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { COLORS } from "@/styles/colors";
import { routes } from "@/navigation/routes";
import LogoutIcon from "@material-ui/icons/ExitToApp";
import {
  createStyles,
  LinearProgress,
  ListItemIcon,
  makeStyles,
  MenuItem,
  Theme,
  withStyles,
} from "@material-ui/core";
import { getCondition } from "@/navigation";
import { Lang } from "@/interfaces/ui";
import { CONSTANTS } from "@/constants/app";
import { UserRole } from "@toppick/common/build/interfaces";
import { auth } from "@/services/firebase";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
    },
    appLanguage: {
      position: "absolute",
      top: 15,
      right: 20,
      fontSize: 20,
      cursor: "default",
      fontWeight: "bold",
      color: COLORS.primaryOrange,
    },
    appTitle: {
      textTransform: "capitalize",
    },
    logoutIcon: {
      color: COLORS.menuIcon,
    },
    appBar: {
      width: `calc(100% - ${CONSTANTS.DRAWER_WIDTH}px)`,
      marginLeft: CONSTANTS.DRAWER_WIDTH,
      backgroundColor: "#fff",
      color: COLORS.primaryOrange,
    },
    drawer: {
      width: CONSTANTS.DRAWER_WIDTH,
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

      "@media (max-width: 500px)": {
        padding: 100,
        width: "200%",
      },
    },
    headerContainer: {
      textAlign: "left",
      color: "white",
      fontSize: 45,
      backgroundColor: COLORS.primaryBackground,
      fontWeight: "bold",
      paddingLeft: 60,
      textTransform: "capitalize",
      paddingTop: 10,
      marginBottom: 50,
      alignSelf: "flex-start",
    },

    drawerPaper: {
      width: CONSTANTS.DRAWER_WIDTH,
      background: COLORS.menuContainer,
      color: "#fff",
    },

    toolbar: theme.mixins.toolbar,
  })
);

const StyledLinearProgress = withStyles({
  colorPrimary: {
    backgroundColor: COLORS.lighterOrange,
  },
  barColorPrimary: {
    backgroundColor: COLORS.darkerOrange,
  },
})(LinearProgress);

interface MenuProps {
  children: React.ReactNode;
  userRole: UserRole;
  isAuthenticated: boolean;
  currentLanguage: Lang;
  loading: boolean;
  username: string;
}

export default function Menu({
  children,
  userRole,
  isAuthenticated,
  currentLanguage,
  loading,
  username,
}: MenuProps) {
  const [path, setPath] = React.useState("");
  const [appTitle, setAppTitle] = React.useState("");
  const classes = useStyles();
  const location = useLocation();

  React.useEffect(() => {
    setPath(location.pathname);
  }, [location, setPath]);

  React.useEffect(() => {
    if (username) {
      setAppTitle("Welcome back, " + username);
    }
    setTimeout(() => {
      setAppTitle("TopPick");
    }, 5000);
  }, [username]);

  const activetRoute = (route: string) => {
    return route === path;
  };

  const getRouteName = (path: string) => {
    if (loading) {
      return "Loading...";
    }
    if (getCondition(userRole, path, isAuthenticated)) {
      const route = routes.find((route) => route.path == path);
      if (route) {
        return route.navbarName;
      }
    }
    return "Error: 404";
  };

  return (
    <div className={classes.container}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap className={classes.appTitle}>
            {appTitle}
          </Typography>
          {isAuthenticated && <div className={classes.appLanguage}>EN</div>}
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
              getCondition(userRole, prop.path, isAuthenticated) && (
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
              onClick={async () => {
                await auth.signOut();
                window.location.reload();
              }}
            >
              <ListItemIcon>
                <LogoutIcon className={classes.logoutIcon} />
              </ListItemIcon>
              <ListItemText primary="logout" className={classes.drawerItem} />
            </ListItem>
          )}
        </List>
      </Drawer>
      <div className={classes.childrenContainer}>
        <div className={classes.headerContainer}>{getRouteName(path)}</div>
        {children}
      </div>
    </div>
  );
}
