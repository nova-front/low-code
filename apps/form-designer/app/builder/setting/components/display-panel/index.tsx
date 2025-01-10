import {
  TextField,
  Grid2 as Grid,
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
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
          {["checkbox", "radio", "switch"].includes(data.type) && (
            <Grid size={6}>
              <FormControl>
                <FormLabel>Direction</FormLabel>
                <RadioGroup
                  row
                  name="Direction"
                  value={data.direction}
                  onChange={(e: any) => onUpdate?.("direction", e.target.value)}
                >
                  <FormControlLabel
                    value="row"
                    control={<Radio />}
                    label="Row"
                  />
                  <FormControlLabel
                    value="column"
                    control={<Radio />}
                    label="Column"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
          )}
        </Grid>
      )}
    </div>
  );
};

export default DisplayPanel;
