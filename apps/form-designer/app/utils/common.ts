import { FieldType } from "../type";

// TODO: 待完善
export const getInitData = (data: any) => {
  const initData = {
    ...data,
    label: data.name,
    helperText: "this is a description",
    required: false,
    disabled: false,
    defaultValue: "",
  };
  switch (data.type as FieldType) {
    case "textfield":
      initData.placeholder = "Please enter a value";
      break;
    case "textarea":
      initData.placeholder = "Please enter a value";
      break;
    case "checkbox":
      initData.options = ["default"];
      initData.defaultValue = [];
      break;
    case "radio":
      initData.options = ["default"];
      break;
    case "switch":
      break;
    case "select":
      initData.options = ["default"];
      break;
    case "autocomplete":
      initData.options = ["default"];
      break;
    case "button":
      break;
    default:
      break;
  }
  return { ...initData };
};
