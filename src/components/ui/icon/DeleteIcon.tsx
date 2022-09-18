import React from "react";
import Icon from "@material-ui/icons/Delete";
import { COLORS } from "@/styles/colors";

interface DeleteIconProps {
  onClick: () => void;
  size?: number;
}
export default function DeleteIcon({ onClick, size = 25 }: DeleteIconProps) {
  return (
    <Icon
      onClick={onClick}
      style={{ cursor: "pointer", color: COLORS.darkerOrange, fontSize: size }}
    />
  );
}
