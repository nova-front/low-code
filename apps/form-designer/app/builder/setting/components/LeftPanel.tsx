import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import DisplayPanel from "./display-panel";
import ValidationPanel from "./validation-panel";
import CustomPanel from "./CustomPanel";
import DataPanel from "./data-panel";
import { tabProps } from "../util";

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
          <Tab label="Display" {...tabProps(0)} />
          <Tab label="Validation" {...tabProps(1)} />
          <Tab label="Data" {...tabProps(2)} />
          <Tab label="Conditional" {...tabProps(3)} />
        </Tabs>
      </Box>
      <DisplayPanel
        value={value}
        index={0}
        data={fieldData}
        onUpdate={updatefieldData}
      />
      <ValidationPanel
        value={value}
        index={1}
        data={fieldData}
        onUpdate={updatefieldData}
      >
        Validation
      </ValidationPanel>
      <DataPanel
        value={value}
        index={2}
        data={fieldData}
        onUpdate={updatefieldData}
      />
      <CustomPanel value={value} index={3}>
        Conditional
      </CustomPanel>
    </React.Fragment>
  );
};

export default LeftPanel;
