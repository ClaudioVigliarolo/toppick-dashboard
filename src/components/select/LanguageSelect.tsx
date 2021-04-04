import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      minWidth: 50,
    },

    select: {
      marginTop: theme.spacing(2),
      color: 'orange',
      fontSize: 22,
      '&:before': {
        borderColor: 'white',
      },
      '&:after': {
        borderColor: 'white',
      },
    },
    icon: {
      fill: 'white',
    },
  })
);

export default function LanguageSelect({
  languages,
  onLanguageChange,
  currentLanguage,
}: {
  languages: string[];
  onLanguageChange(newLang: any): void;
  currentLanguage: string;
}) {
  const classes = useStyles();
  const [language, setLanguage] = React.useState<string>('');

  const handleChange = (event: React.ChangeEvent<{ value: any }>) => {
    setLanguage(event.target.value);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <Select
          value={currentLanguage}
          onChange={(e) => {
            onLanguageChange(e.target.value);
          }}
          displayEmpty
          className={classes.select}
          inputProps={{
            'aria-label': 'Without label',
            classes: {
              icon: classes.icon,
            },
          }}
        >
          {languages.map((language: string) => (
            <MenuItem key={language} value={language}>
              {language}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
