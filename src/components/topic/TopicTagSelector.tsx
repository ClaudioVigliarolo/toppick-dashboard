import React from "react";
import { TextField, makeStyles } from "@material-ui/core";
import { TopicTag } from "@toppick/common/build/interfaces";
import DeleteIcon from "@/components/ui/icon/DeleteIcon";

interface TagSelectorProps {
  tags: TopicTag[];
  onRemove: (index: number) => void;
  onAdd: (tag: string) => void;
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
}));

function TagItem({ onRemove = () => {}, tag, deletable }: TagItemProps) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div>{tag}</div>
      <div style={{ marginLeft: 5, marginTop: 2 }}>
        {deletable && <DeleteIcon onClick={onRemove} size={15} />}
      </div>
    </div>
  );
}

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
          label="Tag"
          placeholder="Type new tag..."
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
          fullWidth
        />
      </div>
    </div>
  );
}
