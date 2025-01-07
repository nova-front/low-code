import { useEffect, useState } from "react";
import { CheckBoxGroup } from "@/components";
import { FormItemProps } from "@/components/form/type";

const CheckBoxGroupBox = ({ fieldData }: { fieldData: FormItemProps }) => {
  const { options = [], defaultValue, ...otherProps } = fieldData;

  const [value, setValue] = useState<any[]>([]);

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
    <CheckBoxGroup
      value={value}
      onChange={(checkedValue) => setValue(checkedValue)}
      {...otherProps}
      row
      options={lastOptions}
    />
  );
};

export default CheckBoxGroupBox;
