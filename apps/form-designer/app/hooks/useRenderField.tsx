import { useCallback } from "react";
import { FormItemProps } from "../type";
import {
  TextField,
  Button,
  TextArea,
  CheckBoxGroup,
  RadioGroup,
  SwitchesGroup,
  Select,
  Autocomplete,
} from "../components/mui";

const useRenderField = () => {
  const renderField = useCallback((fieldData: FormItemProps) => {
    let resultNode: React.ReactNode = "";
    const { id, name, multiple, type, options = [], ...otherProps } = fieldData;

    const lastOptions = options
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
      .filter(Boolean);

    // TODO: 待完善
    switch (type) {
      case "textfield":
        resultNode = <TextField fullWidth {...otherProps} />;
        break;
      case "textarea":
        resultNode = <TextArea fullWidth {...otherProps} />;
        break;
      case "checkbox":
        resultNode = (
          <CheckBoxGroup {...otherProps} row options={lastOptions} />
        );
        break;
      case "radio":
        resultNode = <RadioGroup {...otherProps} row options={lastOptions} />;
        break;
      case "switch":
        resultNode = (
          <SwitchesGroup
            {...otherProps}
            row
            error
            options={[
              {
                name: "gilad",
                value: false,
                label: "gilad",
              },
              {
                name: "jason",
                value: false,
                label: "jason",
              },
              {
                name: "antoine",
                value: false,
                label: "antoine",
              },
            ]}
            onChange={(e, w) => console.log(e, w)}
          />
        );
        break;
      case "select":
        resultNode = fieldData.defaultValue ? (
          <Select fullWidth {...otherProps} options={lastOptions} />
        ) : (
          <Select fullWidth {...otherProps} options={lastOptions} />
        );
        break;
      case "autocomplete":
        resultNode = (
          <Autocomplete disablePortal {...otherProps} options={lastOptions} />
        );
        break;
      case "button":
        resultNode = (
          <Button variant="outlined" size="small">
            {fieldData.name}
          </Button>
        );
        break;

      default:
        resultNode = `【${fieldData.name}】正在开发...`;
        break;
    }
    return resultNode;
  }, []);

  return {
    renderField,
  };
};

export default useRenderField;
