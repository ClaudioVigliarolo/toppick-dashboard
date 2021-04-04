import { TextField } from "@material-ui/core";
import React from "react";
import { CustomDialog } from "./DialogStyles";

interface CategoryDialogProps {
  open: boolean;
  onConfirm: any;
  onRefuse: any;
  category: string;
  headerText: string;
}
export default function CategoryDialog(props: CategoryDialogProps) {
  const [category, setCategory] = React.useState<string>("");
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    setCategory(props.category);
  }, [props.category]);

  const onSubmit = async (newCategory: string) => {
    setError(false);
    setCategory("");
    if (newCategory == "") {
      setError(true);
      return;
    }
    props.onConfirm(newCategory);
  };

  return (
    <>
      <CustomDialog
        open={props.open}
        headerText={props.headerText}
        minWidth={400}
        onConfirm={() => onSubmit(category)}
        onRefuse={props.onRefuse}
        children={
          <TextField
            error={error}
            autoFocus
            InputLabelProps={{ shrink: true }}
            margin="dense"
            label="text"
            id="standard-helperText"
            value={category}
            onChange={(e) => setCategory(e.currentTarget.value)}
            fullWidth
          />
        }
      />
    </>
  );
}
