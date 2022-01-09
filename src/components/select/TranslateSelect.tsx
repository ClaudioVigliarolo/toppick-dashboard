import React from "react";
import {
  createStyles,
  InputLabel,
  ListItem,
  makeStyles,
  MenuItem,
  Select,
} from "@material-ui/core";
import ArchiveIcon from "@material-ui/icons/Archive";
import UnarchiveIcon from "@material-ui/icons/Unarchive";
import DeleteIcon from "@material-ui/icons/Delete";
import { COLORS } from "src/constants/Colors";
interface TranslateSelectProps {
  value: string;
  defaultValue: string;
  values: string[];
  header?: string;
  archived: boolean;
  onDelete: (index: number) => void;
  onArchive: (index: number) => void;
  onUnarchive: (index: number) => void;
  onSelect: (index: number) => void;
}

const useStyles = makeStyles(() =>
  createStyles({
    menuItemContainer: {
      width: "100%",
      backgroundColor: "blue",
      position: "relative",
      display: "flex",
      alignItems: "center",
    },
    menuItemInnerContainer: {
      display: "flex",
      flexDirection: "row",
      position: "absolute",
      right: 0,
      width: 80,
      justifyContent: "space-between",
    },

    archiveIcon: {
      color: COLORS.primaryOrange,
    },

    deleteIcon: {
      color: COLORS.red,
    },
    select: {
      textTransform: "capitalize",
      width: 500,
      fontSize: 20,
      color: "#fff",
    },
  })
);

export default function TranslateSelect({
  value,
  defaultValue,
  values,
  header,
  onDelete,
  onSelect,
  onArchive,
  onUnarchive,
  archived,
}: TranslateSelectProps) {
  const classes = useStyles();
  return (
    <>
      <InputLabel id="demo-mutiple-chip-label">{header}</InputLabel>
      <Select
        className={classes.select}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        defaultValue=""
      >
        <MenuItem value={defaultValue}>{defaultValue}</MenuItem>
        {values.map((val: string, index: number) => (
          <MenuItem
            key={index}
            value={val}
            onClick={() => {
              onSelect(index);
            }}
          >
            {val}
            <div className={classes.menuItemContainer}>
              <div className={classes.menuItemInnerContainer}>
                {!archived ? (
                  <ArchiveIcon
                    className={classes.archiveIcon}
                    onClick={(e) => {
                      onArchive(index);
                      e.stopPropagation();
                      e.nativeEvent.stopImmediatePropagation();
                    }}
                  />
                ) : (
                  <UnarchiveIcon
                    className={classes.archiveIcon}
                    onClick={(e) => {
                      onUnarchive(index);
                      e.stopPropagation();
                      e.nativeEvent.stopImmediatePropagation();
                    }}
                  />
                )}
                <DeleteIcon
                  className={classes.deleteIcon}
                  onClick={(e) => {
                    onDelete(index);
                    e.stopPropagation();
                    e.nativeEvent.stopImmediatePropagation();
                  }}
                />
              </div>
            </div>
          </MenuItem>
        ))}
      </Select>
    </>
  );
}
