import { FieldType } from "../type";

// TODO: 待完善
export const getInitData = (data: any) => {
  const initData = {
    ...data,
    label: data.name,
    helperText: "this is a description",
    required: false,
    disabled: false,
  };
  switch (data.type as FieldType) {
    case "textfield":
      initData.placeholder = "Please enter a value";
      break;
    case "textarea":
      initData.placeholder = "Please enter a value";
      break;
    case "checkbox":
      break;
    case "radio":
      break;
    case "switch":
      break;
    case "select":
      initData.options = [""];
      break;
    case "autocomplete":
      break;
    case "button":
      break;
    default:
      break;
  }
  return { ...initData };
};
