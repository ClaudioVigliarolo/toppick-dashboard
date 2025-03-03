import React from "react";
import { TextField, makeStyles } from "@material-ui/core";
import { TopicTag } from "@toppick/common/build/interfaces";
import DeleteIcon from "@/components/ui/icon/DeleteIcon";

interface TagSelectorProps {
  tags: TopicTag[];
  onRemove: (index: number) => void;
  onAdd: (tag: string) => void;
  placeholder:string;
  label:string;
}

interface TagItemProps {
  tag: string;
  onRemove?: () => void;
  deletable?: boolean;
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
  tagItemContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    cursor: "pointer",
    backgroundColor: "orange",
    color: "white",
    borderRadius: 5,
    padding: 2,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 5,
  },
  tagItem: {
    paddingRight: 5,
  },
  deleteIcon: {
    paddingTop: 3,
  },
}));

function TagItem({ onRemove = () => {}, tag, deletable }: TagItemProps) {
  const classes = useStyles();
  return (
    <div className={classes.tagItemContainer}>
      <div className={classes.tagItem}>{tag}</div>
      <div className={classes.deleteIcon}>
        {deletable && <DeleteIcon onClick={onRemove} size={15} />}
      </div>
    </div>
  );
}

export default function TagSelector({
  tags,
  onRemove,
  onAdd,
  label,
  placeholder,
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
          <TagItem
            onRemove={() => onRemove(i)}
            tag={tag.title}
            key={i}
            deletable={true}
          />
        ))}
      </div>
      <div className={classes.textField}>
        <TextField
          InputLabelProps={{ shrink: true }}
          onKeyDown={handleKeyDown}
          label={label}
          placeholder={placeholder}
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
          fullWidth
        />
      </div>
    </div>
  );
}
