import React from "react";
import TagItem from "./TagItem";
import { TextField, makeStyles } from "@material-ui/core";
import { TopicTag } from "@toppick/common";

interface TagSelectorProps {
  tags: TopicTag[];
  onRemove: (index: number) => void;
  onAdd: (tag: string) => void;
}

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
  },
  textField: {
    width: 200,
    alignSelf: "center",
    textAlign: "center",
  },
  tagsContainer: {
    flexWrap: "wrap",
    display: "flex",
  },
}));

export default function TagSelector({
  tags,
  onRemove,
  onAdd,
}: TagSelectorProps) {
  const [title, setTitle] = React.useState("");
  const classes = useStyles();
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      onAdd(title);
      setTitle("");
    }
  };
  return (
    <div className={classes.container}>
      <div className={classes.tagsContainer}>
        {tags.map((tag, i) => (
          <TagItem onRemove={() => onRemove(i)} tag={tag.title} key={i} />
        ))}
      </div>
      <div className={classes.textField}>
        <TextField
          InputLabelProps={{ shrink: true }}
          margin="dense"
          onKeyDown={handleKeyDown}
          label="Tag"
          placeholder="Type new tag..."
          id="standard-helperText"
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
          fullWidth
        />
      </div>
    </div>
  );
}
