import { useState, useCallback, forwardRef, Fragment } from "react";
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
import LeftPanel from "./components/LeftPanel";
import RightPanel from "./components/RightPanel";

import { SettingDialogProps } from "./type";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const SettingDialog = ({ initData, onUpdate }: SettingDialogProps) => {
  const [open, setOpen] = useState(false);

  const [fieldData, setFieldData] = useState<any>({});

  const updatefieldData = (key: string, value: string) => {
    const { defaultValue: oldDefaultValue } = fieldData;
    let newDefaultValue: any = undefined;

    if (key === "multiple") {
      if (value) {
        if (typeof oldDefaultValue === "string") {
          newDefaultValue = [];
        } else {
          newDefaultValue = oldDefaultValue || [];
        }
      } else {
        if (typeof oldDefaultValue === "string") {
          newDefaultValue = oldDefaultValue;
        } else {
          newDefaultValue = "";
        }
      }
      fieldData.defaultValue = newDefaultValue;
    }

    setFieldData({
      ...fieldData,
      [key]: value,
    });
  };

  const openFn = () => {
    setFieldData(initData);
    setOpen(true);
  };

  const closeFn = () => {
    setOpen(false);
  };

  const onSave = useCallback(() => {
    onUpdate(fieldData.id, fieldData);
    closeFn();
  }, [fieldData, onUpdate]);

  const onReset = useCallback(() => {
    setFieldData(initData);
  }, [initData]);

  return (
    <Fragment>
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
              {fieldData.name} Component
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
        <DialogContent sx={{ padding: "0px" }}>
          <Grid container spacing={0} sx={{ minHeight: "100%" }}>
            <Grid
              size={8}
              sx={{
                padding: "0 12px",
                borderRight: "1px dashed #e5e5e5",
              }}
            >
              <LeftPanel
                fieldData={fieldData}
                updatefieldData={updatefieldData}
              />
            </Grid>
            <Grid size={4} sx={{ padding: "0 12px" }}>
              <RightPanel
                fieldData={fieldData}
                onSave={onSave}
                onReset={onReset}
                onClose={closeFn}
              />
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default SettingDialog;
