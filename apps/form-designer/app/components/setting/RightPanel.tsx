import * as React from "react";
import { useState } from "react";
import { Stack, Box, Tabs, Tab } from "@mui/material";
import CustomTabPanel from "./CustomTabPanel";
import { TextField, Button } from "../mui";

import { a11yProps } from "./util";
import { FormItemProps } from "../../type";

interface RightPanelProps {
  fieldData: FormItemProps;
  onSave: any;
  onReset: any;
}

const RightPanel = ({ fieldData, onSave, onReset }: RightPanelProps) => {
  const [value, setValue] = useState(0);

  const onChangeFn = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <React.Fragment>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={onChangeFn}
          aria-label="basic tabs example"
        >
          <Tab label="Preview" {...a11yProps(0)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Box sx={{ mt: 4, mb: "12px" }}>
          <TextField variant="outlined" fullWidth {...fieldData} />
        </Box>
        <Stack spacing={2} direction="row">
          <Button variant="contained" color="primary" onClick={onSave}>
            Save
          </Button>
          <Button variant="outlined" color="primary" onClick={onReset}>
            Reset
          </Button>
        </Stack>
      </CustomTabPanel>
    </React.Fragment>
  );
};

export default RightPanel;
