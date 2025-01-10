export type FieldType =
  | "textfield"
  | "textarea"
  | "checkbox"
  | "radio"
  | "switch"
  | "select"
  | "autocomplete"
  | "button"
  | "unknown";

type OptionsItem = {
  label: string;
  value: string;
  disabled?: boolean;
};

export type OptionsProps = OptionsItem[] | string[];
export interface FormItemProps {
  id?: string | number;
  name?: string;
  type: FieldType;
  label?: React.ReactNode;
  helperText?: React.ReactNode;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  multiple?: boolean;
  options?: OptionsProps;
  defaultValue?: any;
  row?: boolean; // RadioGroup 专属
  error?: boolean;
  direction?: "row" | "column"; // eg: radio row 横向排列，column 纵向排列
}
