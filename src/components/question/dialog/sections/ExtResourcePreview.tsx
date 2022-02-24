import React from "react";
import { LinkPreview } from "@dhaiwat10/react-link-preview";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  closeIcon: {
    position: "absolute",
    top: 20,
    right: 20,
    cursor: "pointer",
    color: "orange",
    fontSize: 30,
  },
}));

interface PreviewProps {
  closePreview: () => void;
  url: string;
  open: boolean;
}
export default function ExtResourcePreview({
  closePreview,
  url,
  open,
}: PreviewProps) {
  const classes = useStyles();

  return (
    <>
      {open && (
        <>
          <CloseIcon className={classes.closeIcon} onClick={closePreview} />
          <LinkPreview url={url} width="400px" height="400px" />
        </>
      )}
    </>
  );
}
