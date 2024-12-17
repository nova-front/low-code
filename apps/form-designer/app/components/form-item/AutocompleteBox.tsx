import { useEffect, useState } from "react";
import { Autocomplete } from "../mui";
import { FormItemProps } from "@/type";

const AutocompleteBox = ({ fieldData }: { fieldData: FormItemProps }) => {
  const {
    defaultValue = "",
    multiple,
    options = [],
    ...otherProps
  } = fieldData;

  const [value, setValue] = useState<any>(null);

  useEffect(() => {
    const v =
      options?.find((option: any) => option.value === defaultValue) ||
      defaultValue ||
      null;
    setValue(v);
  }, [defaultValue]);

  return (
    <Autocomplete
      {...otherProps}
      multiple={multiple}
      options={options as any[]}
      value={value}
      onChange={(v: any) => {
        setValue(v);
      }}
    />
  );
};

export default AutocompleteBox;
