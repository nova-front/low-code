import { useEffect, useState } from "react";
import { Autocomplete } from "../mui";
import { FormItemProps } from "@/type";

const AutocompleteBox = ({ fieldData }: { fieldData: FormItemProps }) => {
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
    if (typeof defaultValue === "string") {
      const _v = lastOptions?.find((item: any) => {
        if (typeof item === "string") {
          return item === defaultValue;
        } else {
          return item.value === defaultValue;
        }
      });
      setValue(_v);
    } else {
      const arr = lastOptions
        ?.map((option: any) => {
          if (typeof option === "string") {
            if (defaultValue?.includes(option)) {
              return option;
            } else {
              return false;
            }
          } else {
            if (defaultValue?.includes(option.value)) {
              return option;
            } else {
              return false;
            }
          }
        })
        .filter(Boolean);
      setValue(arr);
    }
  }, [defaultValue]);

  return (
    <>
      {multiple && (
        <Autocomplete
          {...otherProps}
          multiple
          options={lastOptions}
          value={value}
          onChange={(e, v: any) => setValue(v)}
        />
      )}
      {!multiple && (
        <Autocomplete
          {...otherProps}
          options={lastOptions}
          value={value}
          onChange={(e, v: any) => setValue(v)}
        />
      )}
    </>
  );
};

export default AutocompleteBox;
