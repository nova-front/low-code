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
import { top100Films } from "../mock";

const useRenderField = () => {
  const renderField = useCallback((fieldData: FormItemProps) => {
    let resultNode: React.ReactNode = "";
    const { id, name, multiple, type, options = [], ...otherProps } = fieldData;
    const defaultValue = multiple ? ["12"] : "12";

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
          <CheckBoxGroup
            {...otherProps}
            row
            // error
            defaultValue={["A"]}
            // options={["A", "B", "C"]}
            // disabled
            options={[
              { value: "A", label: "AA" },
              { value: "B", label: "BB" },
              { value: "C", label: "CC", disabled: true },
            ]}
            // onChange={(w) => console.log(w)}
          />
        );
        break;
      case "radio":
        resultNode = (
          <RadioGroup
            {...otherProps}
            row
            // error
            defaultValue={"A"}
            // options={["A", "B", "C"]}】
            // disabled
            options={[
              { value: "A", label: "AA" },
              { value: "B", label: "BB" },
              { value: "C", label: "CC", disabled: true },
            ]}
            onChange={(e, w) => console.log(e, w)}
          />
        );
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
        resultNode = (
          <Select
            fullWidth
            {...otherProps}
            options={lastOptions}
            // defaultValue={defaultValue}
          />
        );
        break;
      case "autocomplete":
        resultNode = (
          <Autocomplete disablePortal {...otherProps} options={top100Films} />
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
