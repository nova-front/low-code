import * as React from "react";
import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { TransitionProps } from "@mui/material/transitions";
import Slide from "@mui/material/Slide";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import DisplayTabPanel from "./DisplayTabPanel";

import { TextField, Button } from "../mui";

import { TabPanelProps } from "./type";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
    sx: { textTransform: "none" },
  };
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const SettingDialog = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);

  const [fieldData, setFieldData] = useState<any>({
    label: "TextField",
    description: "Please enter a value",
  });

  const updatefieldData = (key: string, value: string) => {
    setFieldData({
      ...fieldData,
      [key]: value,
    });
  };

  const onChangeFn = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const openFn = () => {
    setOpen(true);
  };

  const closeFn = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <BorderColorIcon color="primary" onClick={openFn} />
      <Dialog
        fullScreen
        open={open}
        onClose={closeFn}
        aria-labelledby="setting-dialog-title"
        aria-describedby="setting-dialog-description"
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Text Field Component
            </Typography>
            <IconButton
              edge="start"
              color="inherit"
              onClick={closeFn}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <DialogContent sx={{ padding: "0 12px" }}>
          <Grid container spacing={2}>
            <Grid size={8}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={onChangeFn}
                  aria-label="basic tabs example"
                >
                  <Tab label="Display" {...a11yProps(0)} />
                  <Tab label="Data" {...a11yProps(1)} />
                  <Tab label="Conditional" {...a11yProps(2)} />
                </Tabs>
              </Box>
              <DisplayTabPanel
                value={value}
                index={0}
                data={fieldData}
                onUpdate={updatefieldData}
              />
              <CustomTabPanel value={value} index={1}>
                Data
              </CustomTabPanel>
              <CustomTabPanel value={value} index={2}>
                Conditional
              </CustomTabPanel>
            </Grid>
            <Grid size={4}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tab label="Preview" {...a11yProps(0)} />
              </Box>
              <Box sx={{ mt: 4, mb: "12px" }}>
                <TextField
                  label={fieldData.label}
                  variant="outlined"
                  fullWidth
                  helperText={fieldData.description}
                />
              </Box>
              <Button variant="contained" color="primary" onClick={closeFn}>
                Save
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default SettingDialog;
