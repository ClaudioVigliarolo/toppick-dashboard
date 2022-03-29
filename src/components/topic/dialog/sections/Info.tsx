import React from "react";
import { CONSTANTS } from "@/constants/app";
import Select from "@/components/ui/select/SimpleSelect";
import { makeStyles } from "@material-ui/core";
import TagSelector from "@/components/ui/select/TagSelector";
import { TopicLevel, TopicTag } from "@toppick/common";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    position: "relative",
    alignItems: "center",
    marginTop: 20,
  },
  TagSelectorContainer: {
    marginTop: 50,
    maxWidth: "80%",
  },
  selectContainer: {
    marginTop: 20,
  },
}));

interface InfoProps {
  handleSourceChange: (event: React.ChangeEvent<any>) => void;
  handleLevelChange: (event: React.ChangeEvent<any>) => void;
  source: string;
  level: TopicLevel;
  onTagRemove: (i: number) => void;
  onTagAdd: (title: string) => void;
  tags: TopicTag[];
}
const TOPIC_LEVELS = Object.values(TopicLevel);

export default function Info({
  handleSourceChange,
  source,
  handleLevelChange,
  level,
  onTagRemove,
  tags,
  onTagAdd,
}: InfoProps) {
  const classes = useStyles();
  return (
    <>
      <div className={classes.container}>
        <div className={classes.selectContainer}>
          <Select
            handleChange={handleSourceChange}
            value={
              CONSTANTS.TOPIC_SOURCES[CONSTANTS.TOPIC_SOURCES.indexOf(source)]
            }
            values={CONSTANTS.TOPIC_SOURCES}
            color="black"
            width={300}
            header="Source"
            defaultValue={CONSTANTS.TOPIC_SOURCES[0]}
          />
        </div>
        <div className={classes.selectContainer}>
          <Select
            handleChange={handleLevelChange}
            value={level}
            values={TOPIC_LEVELS}
            color="black"
            width={300}
            header="Level"
            defaultValue={level}
          />
        </div>
        <div className={classes.TagSelectorContainer}>
          <TagSelector tags={tags} onRemove={onTagRemove} onAdd={onTagAdd} />
        </div>
      </div>
    </>
  );
}
