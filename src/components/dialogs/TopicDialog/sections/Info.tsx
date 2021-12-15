import React from "react";
import { CONSTANTS } from "../../../../constants/constants";
import Select from "../../../select/SimpleSelect";
import TypeSelect from "../../../select/ObjectSelect";
import { RadioButton, UserApproved } from "../../../../interfaces/Interfaces";
import UserApprovedSelector from "../../components/UserApprovedSelector";
import { makeStyles } from "@material-ui/core";

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
  handleRadioChange: (i: number) => void;
  source: string;
  level: string;
  approved: boolean;
  users_approved?: UserApproved[];
  topicType: RadioButton;
  toggleApprove: () => void;
}
export default function Info({
  handleSourceChange,
  source,
  handleRadioChange,
  handleLevelChange,
  topicType,
  level,
  approved,
  users_approved = [],
  toggleApprove,
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
        <div className={classes.selectContainer} style={{ marginBottom: 20 }}>
          <TypeSelect
            value={topicType}
            handleChange={handleRadioChange}
            width={300}
            color="black"
            header="Type"
            values={CONSTANTS.TOPIC_TYPES_RADIO}
          />
        </div>
        <div className={classes.userApprovedContainer}>
          <UserApprovedSelector
            approved={approved}
            users={users_approved}
            onToggle={toggleApprove}
          />
        </div>
      </div>
    </>
  );
}
