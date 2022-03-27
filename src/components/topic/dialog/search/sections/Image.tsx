import React from "react";
import { makeStyles } from "@material-ui/core";
import TagSelector from "@/components/ui/select/TagSelector";
import { SearchKeyword, TopicLevel, TopicTag } from "@toppick/common";
import TagItem from "@/components/ui/select/TagItem";
import TagSelectorWithCounter from "@/components/ui/select/TagSelectorWithCounter";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    alignItems: "center",
    marginTop: 10,
  },
  selectedTagsContainer: {
    maxWidth: "90%",
  },
  headerText: {
    color: "black",
    textAlign: "center",
  },
  defaultTagsContainer: {
    display: "flex",
    flexWrap: "wrap",
    maxWidth: "90%",
  },
}));

const DEFAULT_SEARCH_TAGS = [
  "Facts",
  "Curiosities",
  "Interesting",
  "Myths",
  "Psychology",
  "Tips",
  "Quotes",
  "Solutions",
  "Understanding",
  "Experience",
  "Expectations",
  "Significance",
  "History",
  "Tricks",
];
interface InfoProps {
  onTagRemove: (i: number) => void;
  onTagAdd: (title: string) => void;
  onChangeCounter: (e: React.ChangeEvent<any>, index: number) => void;
  tags: SearchKeyword[];
}

export default function Info({
  onTagRemove,
  tags,
  onTagAdd,
  onChangeCounter,
}: InfoProps) {
  const classes = useStyles();
  return (
    <>
      <div className={classes.container}>
        <h4 className={classes.headerText}>Default Search Keywords</h4>
        <div className={classes.defaultTagsContainer}>
          {DEFAULT_SEARCH_TAGS.map((keyword, i) => (
            <TagItem
              deletable={false}
              tag={keyword}
              key={i}
              onSelect={() => onTagAdd(keyword)}
            />
          ))}
        </div>
        <h4 className={classes.headerText}>Selected Search Tags</h4>
        <div className={classes.selectedTagsContainer}>
          <TagSelectorWithCounter
            tags={tags}
            onRemove={onTagRemove}
            onAdd={onTagAdd}
            onChangeCounter={onChangeCounter}
          />
        </div>
      </div>
    </>
  );
}
