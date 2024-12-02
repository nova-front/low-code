import { TextField, Grid2 as Grid } from "@mui/material";
import { DisplayPanelProps } from "../../type";

const DisplayPanel = (props: DisplayPanelProps) => {
  const { value, index, data, onUpdate, ...other } = props;

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
              value={data.helperText}
              onChange={(e: any) => onUpdate?.("helperText", e.target.value)}
            />
          </Grid>
          {["textfield", "textarea"].includes(data.type) && (
            <Grid size={6}>
              <TextField
                fullWidth
                label="Placeholder"
                variant="outlined"
                value={data.placeholder}
                onChange={(e: any) => onUpdate?.("placeholder", e.target.value)}
              />
            </Grid>
          )}
        </Grid>
      )}
    </div>
  );
};

export default DisplayPanel;
