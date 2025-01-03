import { Box, FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { ValidationPanelProps } from "../../type";

const ValidationPanel = (props: ValidationPanelProps) => {
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
        <Box sx={{ mt: 2 }}>
          <FormGroup>
            <Box>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={data.required}
                    onChange={(e: any) => {
                      onUpdate?.("required", e.target.checked);
                    }}
                  />
                }
                label="Required"
              />
            </Box>
            <Box>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={data.disabled}
                    onChange={(e: any) => {
                      onUpdate?.("disabled", e.target.checked);
                    }}
                  />
                }
                label="Disabled"
              />
            </Box>
          </FormGroup>
        </Box>
      )}
    </div>
  );
};

export default ValidationPanel;
