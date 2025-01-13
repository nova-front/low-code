import { useEffect, useState } from "react";
import { Autocomplete } from "@/components";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import { FormItemProps } from "@/components/form/type";

const AutocompleteBox = ({ fieldData }: { fieldData: FormItemProps }) => {
  const {
    label,
    required,
    error,
    helperText,
    disabled,
    options = [],
    defaultValue,
    multiple,
  } = fieldData;

  const [value, setValue] = useState<any>(null);

  useEffect(() => {
    if (!multiple) {
      const v =
        options?.find((option: any) => option.value === defaultValue) ||
        defaultValue;
      setValue(v);
    } else {
      const vs = defaultValue?.map((item: any) => {
        return options?.find((option: any) => option.value === item) || item;
      });
      setValue(vs);
    }
  }, [defaultValue, multiple, options]);

  // console.log("value", value, value?.length);

  // TODO: 防止value 更新不及时，render 错误，需要优化 start
  if (
    multiple &&
    (Object.prototype.toString.call(value) === "[object Object]" ||
      typeof value === "string")
  ) {
    return <></>;
  }
  if (!multiple && Array.isArray(value)) {
    return <></>;
  }
  // TODO: 防止value 更新不及时，render 错误，需要优化 end

  return (
    <FormControl
      fullWidth
      sx={{ "& .MuiFormHelperText-root": { margin: "3px 0 0 0" } }}
      required={required}
      error={error}
      disabled={disabled}
    >
      {value !== null && (
        <Autocomplete
          label={label}
          disabled={disabled}
          multiple={multiple}
          options={options as any[]}
          value={value}
          onChange={(v: any) => {
            setValue(v);
          }}
        />
      )}

      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default AutocompleteBox;
