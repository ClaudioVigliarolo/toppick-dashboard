import React from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import { Paper } from "@material-ui/core";

interface SearchBarProps {
  setSearchText: (text: string) => void;
  searchText: string;
  placeholder: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      padding: "2px 4px",
      display: "flex",
      alignItems: "center",
      width: 300,
      backgroundColor: "white",
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
  })
);

export default function SearchBar(props: SearchBarProps) {
  const classes = useStyles();

  return (
    <Paper component="form" className={classes.container}>
      <div>
        <IconButton className={classes.iconButton} aria-label="search">
          <SearchIcon />
        </IconButton>
        <InputBase
          className={classes.input}
          placeholder={props.placeholder}
          value={props.searchText}
          onChange={(e) => props.setSearchText(e.currentTarget.value)}
          inputProps={{ "aria-label": "search google maps" }}
        />
      </div>
    </Paper>
  );
}
