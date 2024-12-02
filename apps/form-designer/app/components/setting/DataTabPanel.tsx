import { useState } from "react";
import {
  Box,
  FormGroup,
  FormControlLabel,
  Checkbox,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import DataSourceValues from "./DataSourceValues";
import { DataTabPanelProps } from "./type";

const DataTabPanel = (props: DataTabPanelProps) => {
  const { value, index, data, onUpdate, ...other } = props;

  const [defaultValue, setDefaultValue] = useState<any>("");
  const [dataSource, setDataSource] = useState<any[]>([]);

  const handleChange = (event: SelectChangeEvent) => {
    setDefaultValue(event.target.value as string);
  };

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
            {["select", "autocomplete"].includes(data.type) && (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={data.multiple}
                    onChange={(e: any) => {
                      onUpdate?.("multiple", e.target.checked);
                    }}
                  />
                }
                label="Multiple"
              />
            )}
            <FormControl fullWidth sx={{ mt: 1 }}>
              <div>Default Value</div>
              <Select value={defaultValue} onChange={handleChange}>
                {dataSource?.map((item: any) => {
                  return (
                    <MenuItem value={item.value}>
                      {item.label || item.value}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            {["checkbox", "radio", "select", "autocomplete"].includes(
              data.type
            ) && <DataSourceValues />}
          </FormGroup>
        </Box>
      )}
    </div>
  );
};

export default DataTabPanel;
