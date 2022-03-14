import React from "react";
import TagItem from "./TagItem";
import { TextField, makeStyles } from "@material-ui/core";
import { TopicTag } from "@/interfaces/dash_topics";

interface TagSelectorProps {
  tags: TopicTag[];
  onRemove: (index: number) => void;
  onAdd: (tag: string) => void;
}

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: 100,
    flexWrap: "wrap",
    display: "flex",
    maxWidth: 400,
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
    <div>
      <div className={classes.container}>
        {tags.map((tag, i) => (
          <TagItem onRemove={() => onRemove(i)} tag={tag.title} key={i} />
        ))}
      </div>
      <div>
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
