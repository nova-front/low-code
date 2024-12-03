import { useState, useMemo, Fragment } from "react";
import { Stack, Box, Tabs, Tab } from "@mui/material";
import useRenderField from "@/hooks/useRenderField";
import CustomTabPanel from "./CustomPanel";
import { Button } from "@/components/mui";
import { tabProps } from "../util";

import { FormItemProps } from "@/type";

interface RightPanelProps {
  fieldData: FormItemProps;
  onSave: any;
  onReset: any;
  onClose: any;
}

const RightPanel = ({
  fieldData,
  onSave,
  onReset,
  onClose,
}: RightPanelProps) => {
  const { renderField } = useRenderField();
  const [value, setValue] = useState(0);

  const onChangeFn = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const fieldDataStr = useMemo(() => {
    const { id, name, ...params } = fieldData;
    return JSON.stringify(params, null, 2);
  }, [fieldData]);

  return (
    <Fragment>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={onChangeFn}
          aria-label="basic tabs example"
        >
          <Tab label="Preview" {...tabProps(0)} />
        </Tabs>
      </Box>
      <CustomTabPanel
        value={value}
        index={0}
        style={{
          height: "calc(100vh - 114px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          paddingBottom: "12px",
        }}
      >
        <Box sx={{ mt: 4 }}>
          {renderField(fieldData)}
          <Box sx={{ mt: 4 }}>
            <pre>{fieldDataStr}</pre>
          </Box>
        </Box>

        <Stack spacing={2} direction="row" style={{ justifyContent: "end" }}>
          <Button variant="contained" color="primary" onClick={onSave}>
            Save
          </Button>
          <Button variant="outlined" color="primary" onClick={onReset}>
            Reset
          </Button>
          <Button variant="outlined" color="secondary" onClick={onClose}>
            Close
          </Button>
        </Stack>
      </CustomTabPanel>
    </Fragment>
  );
};

export default RightPanel;
