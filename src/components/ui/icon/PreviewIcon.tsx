import React from "react";
import Icon from "@material-ui/icons/VisibilityOutlined";
import { COLORS } from "@/styles/colors";

interface PreviewIconProps {
  onClick: () => void;
  size?: number;
}
export default function PreviewIcon({ onClick, size = 25 }: PreviewIconProps) {
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
