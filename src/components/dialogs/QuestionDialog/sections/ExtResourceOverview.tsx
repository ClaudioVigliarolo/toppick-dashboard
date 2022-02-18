import React from "react";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import { makeStyles, TextField, Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { QuestionExtResource } from "src/interfaces/Interfaces";
const useStyles = makeStyles((theme) => ({
  linkTextField: {
    marginTop: 10,
    width: "90%",
  },
  questionTextInput: {
    maxWidth: "100%",
    marginBottom: 20,
  },
  articleContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-between",
    alignItems: "center",
  },

  urlContainer: {
    width: "90%",
  },
  previewIcon: {
    cursor: "pointer",
    color: "orange",
    marginRight: 15,
  },
  deleteIcon: {
    cursor: "pointer",
    color: "orangered",
  },
  actionIconsContainer: {
    display: "flex",
    flexDirection: "row",
  },
  addButtonContainer: {
    alignSelf: "center",
    width: "100%",
    marginTop: 20,
    display: "flex",
    justifyContent: "center",
  },
  addButton: {
    width: 200,
  },
}));

interface ExtResourceOverviewProps {
  open: boolean;
  title: string;
  extResources: QuestionExtResource[];
  setTitle: (event: React.ChangeEvent<any>) => void;
  onChange: (event: React.ChangeEvent<any>, index: number) => void;
  onPreview: (url: string) => void;
  onDelete: (index: number) => void;
  onAdd: () => void;
}
export default function ExtResourceOverview({
  open,
  title,
  extResources,
  onChange,
  setTitle,
  onPreview,
  onDelete,
  onAdd,
}: ExtResourceOverviewProps) {
  const classes = useStyles();

  return (
    <>
      {open && (
        <>
          <TextField
            InputLabelProps={{ shrink: true }}
            margin="dense"
            label="Question"
            id="standard-helperText"
            value={title}
            onChange={setTitle}
            className={classes.questionTextInput}
          />

          {/* urls list */}
          {extResources.map((r, i) => (
            <div className={classes.articleContainer} key={i}>
              <div className={classes.urlContainer}>
                <TextField
                  className={classes.linkTextField}
                  InputLabelProps={{ shrink: true }}
                  margin="dense"
                  label="Link"
                  placeholder="Paste the Link to the Article here"
                  id="standard-helperText"
                  value={r.url}
                  onChange={(e) => {
                    onChange(e, i);
                  }}
                />
              </div>
              <div className={classes.actionIconsContainer}>
                <VisibilityOutlinedIcon
                  className={classes.previewIcon}
                  onClick={() => onPreview(r.url)}
                />
                <DeleteIcon
                  className={classes.deleteIcon}
                  onClick={() => onDelete(i)}
                />
              </div>
            </div>
          ))}
          <div className={classes.addButtonContainer}>
            <Button
              color="primary"
              size="small"
              onClick={onAdd}
              className={classes.addButton}
            >
              Add New Url
            </Button>
          </div>
        </>
      )}
    </>
  );
}
