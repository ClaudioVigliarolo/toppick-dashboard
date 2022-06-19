import React from "react";
import { makeStyles, TextField } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import Select from "@/components/ui/select/SimpleSelect";
import { BooleanValues, SearchKeywordType } from "@toppick/common";
import { COLORS } from "@/constants/colors";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  fieldContainer: {
    marginTop: 20,
    width: "90%",
  },
  deleteIconContainer: {
    position: "absolute",
    top: 20,
    right: 20,
    cursor: "pointer",
    color: "orange",
  },
  deleteIcon: {
    cursor: "pointer",
    color: COLORS.darkerOrange,
    fontSize: 25,
  },

  image: {
    height: 200,
    marginTop: 20,
  },
}));

interface OverViewProps {
  title: string;
  query: string;
  active: string;
  setTitle: (event: React.ChangeEvent<any>) => void;
  setQuery: (event: React.ChangeEvent<any>) => void;
  keywordType: string;
  handleKeywordTypeChange: (event: React.ChangeEvent<any>) => void;
  handleActiveChange: (event: React.ChangeEvent<any>) => void;
  onDelete?: () => void;
}

export default function OverView({
  //   handleSourceChange,
  //   source,
  //   handleLevelChange,
  //   selectedInterests,
  //   handleInterestsChange,
  //   level,
  //   onTagRemove,
  //   tags,
  //   interests,
  //   onTagAdd,
  //   isFeatured,
  //   toggleIsFeatured,
  title,
  setTitle,
  handleKeywordTypeChange,
  setQuery,
  keywordType,
  query,
  onDelete,
  active,
  handleActiveChange,
}: OverViewProps) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      {onDelete && (
        <div className={classes.deleteIconContainer}>
          <DeleteIcon onClick={onDelete} className={classes.deleteIcon} />
        </div>
      )}
      <TextField
        placeholder="title"
        InputLabelProps={{ shrink: true }}
        margin="dense"
        label="Title"
        id="standard-helperText"
        value={title}
        onChange={setTitle}
        className={classes.fieldContainer}
      />

      <TextField
        placeholder="Query"
        InputLabelProps={{ shrink: true }}
        margin="dense"
        label="Query"
        id="outlined-multiline-flexible"
        multiline
        value={query}
        onChange={setQuery}
        className={classes.fieldContainer}
      />

      <div className={classes.fieldContainer}>
        <Select
          handleChange={handleKeywordTypeChange}
          value={keywordType}
          values={Object.values(SearchKeywordType)}
          color="black"
          width="100%"
          header="Type"
          defaultValue={keywordType}
        />
      </div>
      <div className={classes.fieldContainer}>
        <Select
          handleChange={handleActiveChange}
          value={active}
          values={Object.values(BooleanValues)}
          color="black"
          width="100%"
          header="Active"
          defaultValue={active}
        />
      </div>
    </div>
  );
}
