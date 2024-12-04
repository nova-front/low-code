import { useEffect, useState } from "react";
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
import DataSourceValues from "./data-source-values";
import { DataPanelProps } from "../../type";

const DataPanel = (props: DataPanelProps) => {
  const { value, index, data, onUpdate, ...other } = props;

  const [defaultValue, setDefaultValue] = useState<any>("");
  const dataSource = data.options || [];
  const lastDataSource =
    data.options
      ?.map((option: any) => {
        if (typeof option === "string") {
          if (option) {
            return option;
          }
          return false;
        } else {
          if (!option.label || !option.value) {
            return false;
          } else {
            return option;
          }
        }
      })
      .filter(Boolean) || [];

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
                {lastDataSource?.map((item: any, i: number) => {
                  return (
                    <MenuItem key={i} value={item.value | item}>
                      {item.label || item}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            {["checkbox", "radio", "select", "autocomplete"].includes(
              data.type
            ) && (
              <DataSourceValues dataSource={dataSource} onUpdate={onUpdate} />
            )}
          </FormGroup>
        </Box>
      )}
    </div>
  );
};

export default DataPanel;
