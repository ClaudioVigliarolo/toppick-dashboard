import React from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";

interface TextAreaProps {
  handleChange: (text: string) => void;
  value: string;
  placeholder: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textArea: {
      backgroundImage: "url(http://i.imgur.com/2cOaJ.png)",
      paddingLeft: 35,
      backgroundRepeat: "no-repeat",
      paddingTop: 10,
      padding: 5,
      fontSize: 14,
      borderColor: "orange",
      borderWidth: 0,
      borderBottom: 0,
      minWidth: "60vw",
      height: "50vh",
      backgroundAttachment: "local",
      outlineColor: "white",
    },
    root: {
      padding: "2px 8px",
      display: "flex",
      alignItems: "center",
      width: 300,
      backgroundColor: "white",
    },
  })
);

export default function TextArea({
  placeholder,
  value,
  handleChange,
}: TextAreaProps) {
  const classes = useStyles();

  return (
    <div style={{ backgroundColor: "white", transform: "scale(1.2)" }}>
      <textarea
        className={classes.textArea}
        value={value}
        onChange={(e) => {
          handleChange(e.target.value);
        }}
        placeholder={placeholder}
        rows={5}
        cols={20}
      />
    </div>
  );
}
