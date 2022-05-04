import React from "react";
import { makeStyles } from "@material-ui/core";
import { SearchKeyword } from "@toppick/common";
import Switch from "@/components/ui/select/Switch";
import TagItem from "@/components/ui/select/TagItem";
import TagSelectorWithCounter from "@/components/ui/select/TagSelectorWithCounter";
import { MaterialUiColor } from "@/interfaces/ui";
const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 10,
  },
  selectedKeywordsContainer: {
    maxWidth: "90%",
  },
  switchContainer: {
    position: "absolute",
    top: 20,
    right: 20,
    cursor: "pointer",
    color: "orange",
    fontSize: 30,
  },
  headerText: {
    color: "black",
    textAlign: "center",
  },
  defaultKeywordsContainer: {
    display: "flex",
    flexWrap: "wrap",
    maxWidth: "90%",
  },
}));

const DEFAULT_SEARCH_TAGS = [
  "Facts",
  "Curiosities",
  "Interesting",
  "Myths ",
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
interface SearchProps {
  onKeywordRemove: (i: number) => void;
  onKeywordAdd: (title: string) => void;
  onChangeCounter: (e: React.ChangeEvent<any>, index: number) => void;
  keywords: SearchKeyword[];
  toggleHasNews: () => void;
  hasNews: boolean;
}

export default function Search({
  onKeywordRemove,
  keywords,
  onKeywordAdd,
  onChangeCounter,
  toggleHasNews,
  hasNews,
}: SearchProps) {
  const classes = useStyles();
  return (
    <>
      <div className={classes.container}>
        <div className={classes.switchContainer}>
          <Switch
            text="news"
            switchColor={MaterialUiColor.Primary}
            handleChange={toggleHasNews}
            value={hasNews}
            textColor="black"
          />
        </div>
        <h4 className={classes.headerText}>Default Search Keywords</h4>
        <div className={classes.defaultKeywordsContainer}>
          {DEFAULT_SEARCH_TAGS.map((keyword, i) => (
            <TagItem
              deletable={false}
              tag={keyword}
              key={i}
              onSelect={() => onKeywordAdd(keyword)}
            />
          ))}
        </div>
        <h4 className={classes.headerText}>Selected Search Tags</h4>
        <div className={classes.selectedKeywordsContainer}>
          <TagSelectorWithCounter
            tags={keywords}
            onRemove={onKeywordRemove}
            onAdd={onKeywordAdd}
            onChangeCounter={onChangeCounter}
          />
        </div>
      </div>
    </>
  );
}
