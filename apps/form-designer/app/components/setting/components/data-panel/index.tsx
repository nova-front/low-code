import { Box, FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import DataSourceValues from "./data-source-values";
import DefaultValue from "./default-value";
import { DataPanelProps } from "../../type";

const DataPanel = (props: DataPanelProps) => {
  const { value, index, data, onUpdate, ...other } = props;

  const dataSource = data.options || [];
  const lastDataSource =
    data.options
      ?.map((option: any) => {
        if (typeof option === "string" || typeof option === "number") {
          if (option) {
            return String(option);
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

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 2, height: "calc(100vh - 112px)", overflowY: "auto" }}>
          <FormGroup>
            {["select", "autocomplete"].includes(data.type) && (
              <Box>
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
              </Box>
            )}
            <DefaultValue
              data={data}
              multiple={data.multiple}
              defaultValue={data.defaultValue}
              dataSource={lastDataSource}
              onUpdate={onUpdate}
            />
            <DataSourceValues
              data={data}
              dataSource={dataSource}
              onUpdate={onUpdate}
            />
          </FormGroup>
        </Box>
      )}
    </div>
  );
};

export default DataPanel;
