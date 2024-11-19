export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  data?: any;
  onUpdate?: (key: string, value: string) => void;
}
