import React from "react";
import { InputLabel, ListItem, MenuItem, Select } from "@material-ui/core";
import ArchiveIcon from "@material-ui/icons/Archive";
import UnarchiveIcon from "@material-ui/icons/Unarchive";
import DeleteIcon from "@material-ui/icons/Delete";
import { COLORS } from "src/constants/Colors";
interface TranslateSelectProps {
  value: string;
  defaultValue: string;
  values: string[];
  header?: string;
  archived: boolean;
  onDelete: (index: number) => void;
  onArchive: (index: number) => void;
  onUnarchive: (index: number) => void;
  onSelect: (index: number) => void;
}
export default function TranslateSelect({
  value,
  defaultValue,
  values,
  header,
  onDelete,
  onSelect,
  onArchive,
  onUnarchive,
  archived,
}: TranslateSelectProps) {
  return (
    <>
      <InputLabel id="demo-mutiple-chip-label">{header}</InputLabel>
      <Select
        style={{
          textTransform: "capitalize",
          width: 500,
          fontSize: 20,
          color: "#fff",
        }}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        defaultValue=""
      >
        <MenuItem value={defaultValue}>{defaultValue}</MenuItem>
        {values.map((val: string, index: number) => (
          <MenuItem
            key={index}
            value={val}
            onClick={() => {
              onSelect(index);
            }}
          >
            {val}
            <div
              style={{
                width: "100%",
                backgroundColor: "blue",
                position: "relative",
                display: "flex",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  position: "absolute",
                  right: 0,
                  width: 80,
                  justifyContent: "space-between",
                }}
              >
                {!archived ? (
                  <ArchiveIcon
                    style={{ color: COLORS.primaryOrange }}
                    onClick={(e) => {
                      onArchive(index);
                      e.stopPropagation();
                      e.nativeEvent.stopImmediatePropagation();
                    }}
                  />
                ) : (
                  <UnarchiveIcon
                    style={{ color: COLORS.primaryOrange }}
                    onClick={(e) => {
                      onUnarchive(index);
                      e.stopPropagation();
                      e.nativeEvent.stopImmediatePropagation();
                    }}
                  />
                )}
                <DeleteIcon
                  style={{ color: COLORS.red }}
                  onClick={(e) => {
                    onDelete(index);
                    e.stopPropagation();
                    e.nativeEvent.stopImmediatePropagation();
                  }}
                />
              </div>
            </div>
          </MenuItem>
        ))}
      </Select>
    </>
  );
}
