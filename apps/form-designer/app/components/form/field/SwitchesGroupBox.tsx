import { FormItemProps } from "@/components/form/type";
import { SwitchesGroup } from "../config";
import { useCallback, useEffect, useState } from "react";

const SwitchesGroupBox = ({ fieldData }: { fieldData: FormItemProps }) => {
  const { options = [], defaultValue, ...otherProps } = fieldData;
  const [value, setValue] = useState<any>(defaultValue);

  const onChangeFn = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, checked } = e.target;
      if (checked) {
        setValue([...value, name]);
      } else {
        setValue(value.filter((item: any) => item !== name));
      }
    },
    [value]
  );

  useEffect(() => {
    if (defaultValue) {
      setValue(defaultValue);
    } else {
      setValue([]);
    }
  }, [defaultValue]);

  return (
    <SwitchesGroup
      {...otherProps}
      row
      options={options}
      value={value}
      onChange={onChangeFn}
    />
  );
};

export default SwitchesGroupBox;
