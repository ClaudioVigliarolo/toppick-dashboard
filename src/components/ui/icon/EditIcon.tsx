import React from "react";
import Icon from "@material-ui/icons/Edit";
import { COLORS } from "@/styles/colors";

interface EditIconProps {
  onClick: () => void;
  size?: number;
}
export default function EditIcon({ onClick, size = 25 }: EditIconProps) {
  return (
    <Icon
      onClick={onClick}
      style={{
        cursor: "pointer",
        color: COLORS.lighterOrange,
        fontSize: size,
      }}
    />
  );
}
