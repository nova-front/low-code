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

export interface FormItemProps {
  id?: string | number;
  name: string;
  type: FieldType;
  label?: React.ReactNode;
  helperText?: React.ReactNode;
  placeholder?: string;
}
