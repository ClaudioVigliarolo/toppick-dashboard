import { TextField } from "@material-ui/core";
import React from "react";
import { Example } from "src/interfaces/Interfaces";

interface ExamplesProps {
  examples: Example[];
  onAddExample: (newExample: string) => void;
  onRemoveExample: (index: number) => void;
  onExamplesChange: (event: React.ChangeEvent<any>, index: number) => void;
}

export default function Examples({
  examples,
  onAddExample,
  onRemoveExample,
  onExamplesChange,
}: ExamplesProps) {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {examples.map((ex, i) => (
        <TextField
          key={i}
          InputLabelProps={{ shrink: true }}
          margin="dense"
          label={"Example " + (i + 1)}
          id="standard-helperText"
          value={ex.title}
          style={{ width: "90%" }}
          onChange={(e) => onExamplesChange(e, i)}
        />
      ))}
    </div>
  );
}
