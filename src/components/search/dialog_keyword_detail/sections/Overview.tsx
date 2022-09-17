import React from "react";
import { TextField } from "@material-ui/core";
import Select from "@/components/ui/select/SimpleSelect";
import {
  BooleanValues,
  SearchKeywordType,
} from "@toppick/common/build/interfaces";
import { useAppDialogStyles } from "@/components/ui/dialog/Dialog";
import { useAppStyles } from "@/styles/common";
import DeleteIcon from "@/components/ui/icon/DeleteIcon";

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
  const classes = { ...useAppDialogStyles() };

  return (
    <div className={classes.tabContainer}>
      {onDelete && (
        <div className={classes.topRightIcon}>
          <DeleteIcon onClick={onDelete} />
        </div>
      )}
      <TextField
        placeholder="title"
        InputLabelProps={{ shrink: true }}
        label="Title"
        margin="dense"
        value={title}
        onChange={setTitle}
        className={classes.fieldContainer}
      />
      <TextField
        placeholder="Query"
        InputLabelProps={{ shrink: true }}
        label="Query"
        margin="dense"
        multiline
        value={query}
        onChange={setQuery}
        className={classes.fieldContainer}
      />
      <div className={classes.selectContainer}>
        <Select
          handleChange={handleKeywordTypeChange}
          value={keywordType}
          values={Object.values(SearchKeywordType)}
          color="black"
          className={classes.fieldContainer}
          header="Type"
          defaultValue={keywordType}
        />
      </div>
      <div className={classes.selectContainer}>
        <Select
          handleChange={handleActiveChange}
          value={active}
          values={Object.values(BooleanValues)}
          color="black"
          className={classes.fieldContainer}
          header="Active"
          defaultValue={active}
        />
      </div>
    </div>
  );
}
