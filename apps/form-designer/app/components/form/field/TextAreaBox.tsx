import { useEffect, useState } from "react";
import { TextArea } from "../config";
import { FormItemProps } from "@/components/form/type";

const TextAreaBox = ({ fieldData }: { fieldData: FormItemProps }) => {
  const { defaultValue = "", ...otherProps } = fieldData;

  const [value, setValue] = useState<any>("");

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  return (
    <TextArea
      fullWidth
      value={value}
      onChange={(e) => setValue(e.target.value)}
      {...otherProps}
    />
  );
};

export default TextAreaBox;
