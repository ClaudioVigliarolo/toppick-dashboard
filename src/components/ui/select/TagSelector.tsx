import React from "react";
import TagItem from "./TagItem";
import { TextField } from "@material-ui/core";
import { TopicTag } from "@/interfaces/dash_topics";

interface TagSelectorProps {
  tags: TopicTag[];
  onRemove: (index: number) => void;
  onAdd: (tag: string) => void;
}

export default function TagSelector({
  tags,
  onRemove,
  onAdd,
}: TagSelectorProps) {
  const [title, setTitle] = React.useState("");

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      onAdd(title);
      setTitle("");
    }
  };

  return (
    <div>
      <div style={{ minHeight: 100, backgroundColor: "red" }}>
        {tags.map((tag, i) => (
          <TagItem onRemove={() => onRemove(i)} tag={tag.title} key={i} />
        ))}
      </div>
      <div>
        <TextField
          InputLabelProps={{ shrink: true }}
          margin="dense"
          onKeyDown={handleKeyDown}
          label="Title"
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
