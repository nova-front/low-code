import { useEffect, useState } from "react";
import { RadioGroup } from "../config";
import { FormItemProps } from "@/components/form/type";

const RadioGroupBox = ({ fieldData }: { fieldData: FormItemProps }) => {
  const { options = [], defaultValue, ...otherProps } = fieldData;

  const [value, setValue] = useState<any>("");

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

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  return (
    <RadioGroup
      value={value}
      onChange={(e) => setValue(e.target.value)}
      {...otherProps}
      row
      options={lastOptions}
    />
  );
};

export default RadioGroupBox;
