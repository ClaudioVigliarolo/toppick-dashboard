import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
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
  languages,
  onLanguageChange,
  currentLanguage,
}: {
  languages: Lang[];
  onLanguageChange(lang: any): void;
  currentLanguage: Lang;
}) {
  const classes = useStyles();

  return (
    <div>
      <FormControl className={classes.formControl}>
        <Select
          value={currentLanguage}
          onChange={(e: any) => {
            onLanguageChange(e.target.value);
          }}
          displayEmpty
          className={classes.select}
          inputProps={{
            "aria-label": "Without label",
            classes: {
              icon: classes.icon,
            },
          }}
        >
          {languages.map((language: Lang, index: number) => (
            <MenuItem key={index} value={language}>
              {language.toUpperCase()}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
