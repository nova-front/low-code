interface FormItemProps {
  label?: React.ReactNode;
  helperText?: React.ReactNode;
  placeholder?: string;
}

export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  data?: FormItemProps;
  onUpdate?: (key: string, value: string) => void;
}
