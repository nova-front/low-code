import { FormItemProps } from "@/components/form/type";
import { Select } from "../config";
import { useEffect, useState } from "react";

const SelectBox = ({ fieldData }: { fieldData: FormItemProps }) => {
  const { defaultValue, multiple, options = [], ...otherProps } = fieldData;

  const [value, setValue] = useState<any>(defaultValue);

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

  // TODO: 思考，不拆开两份可以吗
  return (
    <>
      {multiple && (
        <Select
          fullWidth
          multiple
          options={lastOptions}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          {...otherProps}
        />
      )}
      {!multiple && (
        <Select
          fullWidth
          options={lastOptions}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          {...otherProps}
        />
      )}
    </>
  );
};

export default SelectBox;
