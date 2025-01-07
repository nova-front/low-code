import { useEffect, useMemo, useState } from "react";
import { Autocomplete } from "@/components";
import { FormItemProps } from "@/components/form/type";

const AutocompleteBox = ({ fieldData }: { fieldData: FormItemProps }) => {
  const { defaultValue, multiple, options = [], ...otherProps } = fieldData;

  const [value, setValue] = useState<any>(defaultValue);

  useEffect(() => {
    if (!multiple) {
      const v =
        options?.find((option: any) => option.value === defaultValue) ||
        defaultValue ||
        null;
      setValue(v);
    } else {
      const vs = defaultValue?.map((item: any) => {
        return options?.find((option: any) => option.value === item) || item;
      });
      setValue(vs);
    }
  }, [defaultValue, multiple]);

  const initDefaultValue = useMemo(() => {
    if (!multiple) {
      const v =
        options?.find((option: any) => option.value === defaultValue) ||
        defaultValue ||
        null;
      return v;
    } else {
      const vs = defaultValue?.map((item: any) => {
        return options?.find((option: any) => option.value === item) || item;
      });
      return vs;
    }
  }, [options, defaultValue, multiple]);

  return (
    <Autocomplete
      {...otherProps}
      multiple={multiple}
      options={options as any[]}
      value={value || initDefaultValue}
      onChange={(v: any) => {
        setValue(v);
      }}
    />
  );
};

export default AutocompleteBox;
