import { useState } from "react";
import { TextField, Grid2 as Grid } from "@mui/material";
import { TabPanelProps } from "./type";

const DisplayTabPanel = (props: TabPanelProps) => {
  const { value, index, data, onUpdate, ...other } = props;
  // const [label, setLabel] = useState("TextField");
  // const [description, setDescription] = useState("Please enter your name");

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Grid container spacing={2} sx={{ mt: 4 }}>
          <Grid size={6}>
            <TextField
              fullWidth
              label="Label"
              variant="outlined"
              value={data.label}
              onChange={(e: any) => onUpdate?.("label", e.target.value)}
            />
          </Grid>
          <Grid size={6}>
            <TextField
              fullWidth
              label="Description"
              variant="outlined"
              value={data.description}
              onChange={(e: any) => onUpdate?.("description", e.target.value)}
            />
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default DisplayTabPanel;
