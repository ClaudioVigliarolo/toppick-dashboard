import React from "react";
import { CONSTANTS } from "@/constants/app";
import Select from "@/components/ui/select/SimpleSelect";
import { makeStyles } from "@material-ui/core";
import TagSelector from "@/components/ui/select/TagSelector";
import { UserApproved } from "@/interfaces/dash_user";
import { TopicTag } from "@/interfaces/dash_topics";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    position: "relative",
    alignItems: "center",
  },
  userApprovedContainer: {
    display: "flex",
    flexDirection: "row",
    position: "relative",
  },
  selectContainer: {
    marginTop: 20,
  },
}));

interface InfoProps {
  handleSourceChange: (event: React.ChangeEvent<any>) => void;
  handleLevelChange: (event: React.ChangeEvent<any>) => void;
  source: string;
  level: string;
  approved: boolean;
  users_approved?: UserApproved[];
  toggleApprove: () => void;
  onTagRemove: (i: number) => void;
  onTagAdd: (title: string) => void;
  tags: TopicTag[];
}
export default function Info({
  handleSourceChange,
  source,
  handleLevelChange,
  level,
  approved,
  users_approved = [],
  toggleApprove,
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
            value={source}
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
            values={CONSTANTS.TOPIC_LEVELS}
            color="black"
            width={300}
            header="Level"
            defaultValue={level}
          />
        </div>
        <div className={classes.userApprovedContainer}>
          <TagSelector tags={tags} onRemove={onTagRemove} onAdd={onTagAdd} />
        </div>
      </div>
    </>
  );
}