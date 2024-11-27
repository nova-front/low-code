import { FormItemProps } from "../../type.d";

export interface SettingDialogProps {
  initData: FormItemProps;
  onUpdate: any;
}

export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  style?: any;
}

export interface DisPlayTabPanelProps extends TabPanelProps {
  data: FormItemProps;
  onUpdate: (key: string, value: string) => void;
}

export interface ValidationTabPanelProps extends TabPanelProps {
  data: FormItemProps;
  onUpdate: (key: string, value: string) => void;
}
