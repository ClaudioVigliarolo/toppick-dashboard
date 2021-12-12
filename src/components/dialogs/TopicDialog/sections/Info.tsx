import React from "react";
import { CONSTANTS } from "../../../../constants/constants";
import Select from "../../../select/SimpleSelect";
import TypeSelect from "../../../select/ObjectSelect";
import { RadioButton, UserApproved } from "../../../../interfaces/Interfaces";
import UserApprovedSelector from "../../components/UserApprovedSelector";
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
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
          alignItems: "center",
        }}
      >
        <div style={{ marginTop: 20 }}>
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
        <div style={{ marginTop: 20 }}>
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
        <div style={{ marginTop: 20, marginBottom: 20 }}>
          <TypeSelect
            value={topicType}
            handleChange={handleRadioChange}
            width={300}
            color="black"
            header="Type"
            values={CONSTANTS.TOPIC_TYPES_RADIO}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              position: "relative",
            }}
          >
            <UserApprovedSelector
              approved={approved}
              users={users_approved}
              onToggle={toggleApprove}
            />
          </div>
        </div>
      </div>
    </>
  );
}
