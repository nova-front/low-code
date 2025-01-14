import { FormItemProps } from "@/components/form/type";
import { Select } from "@/components";
import { useEffect, useState } from "react";
import { FormControl, FormHelperText, InputLabel } from "@mui/material";

const SelectBox = ({ fieldData }: { fieldData: FormItemProps }) => {
  const {
    defaultValue,
    label,
    options = [],
    size,
    disabled,
    required,
    error,
    helperText,
    inputProps,
    multiple,
  } = fieldData;

  const [value, setValue] = useState<any>(null);

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

  // TODO: 防止value 更新不及时，render 错误，需要优化 start
  if (multiple && typeof value === "string") {
    return <></>;
  }
  if (!multiple && Array.isArray(value)) {
    return <></>;
  }
  // TODO: 防止value 更新不及时，render 错误，需要优化 end

  return (
    <FormControl
      sx={{ "& .MuiFormHelperText-root": { margin: "3px 0 0 0" } }}
      size={size}
      fullWidth
      error={error}
      disabled={disabled}
      required={required}
    >
      {label && <InputLabel>{label}</InputLabel>}
      {value !== null && (
        <Select
          fullWidth
          multiple={multiple}
          label={label}
          inputProps={inputProps}
          options={lastOptions}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      )}
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default SelectBox;
