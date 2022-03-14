import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import { Lang } from "@/interfaces/app";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      minWidth: 50,
    },
    select: {
      marginTop: theme.spacing(2),
      color: "orange",
      fontSize: 22,
      "&:before": {
        borderColor: "white",
      },
      "&:after": {
        borderColor: "white",
      },
    },
    icon: {
      fill: "white",
    },
  })
);

export default function LanguageSelect({
  currentLanguage,
}: {
  currentLanguage: Lang;
}) {
  const classes = useStyles();

  return (
    <div>
      <FormControl className={classes.formControl}>
        <h2>{currentLanguage.toUpperCase()}</h2>
      </FormControl>
    </div>
  );
}
