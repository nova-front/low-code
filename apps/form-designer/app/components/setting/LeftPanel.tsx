import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import DisplayTabPanel from "./DisplayTabPanel";
import ValidationTabPanel from "./ValidationTabPanel";
import CustomTabPanel from "./CustomTabPanel";
import DataTabPanel from "./DataTabPanel";
import { a11yProps } from "./util";

const LeftPanel = ({ fieldData, updatefieldData }: any) => {
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
          <Tab label="Display" {...a11yProps(0)} />
          <Tab label="Validation" {...a11yProps(1)} />
          <Tab label="Data" {...a11yProps(2)} />
          <Tab label="Conditional" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <DisplayTabPanel
        value={value}
        index={0}
        data={fieldData}
        onUpdate={updatefieldData}
      />
      <ValidationTabPanel
        value={value}
        index={1}
        data={fieldData}
        onUpdate={updatefieldData}
      >
        Validation
      </ValidationTabPanel>
      <DataTabPanel
        value={value}
        index={2}
        data={fieldData}
        onUpdate={updatefieldData}
      />
      <CustomTabPanel value={value} index={3}>
        Conditional
      </CustomTabPanel>
    </React.Fragment>
  );
};

export default LeftPanel;
