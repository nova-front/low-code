import { useEffect, useState } from 'react';
import { TextField } from '@/components';
import { FormItemProps } from '@/components/form/type';

const TextFieldBox = ({ fieldData }: { fieldData: FormItemProps }) => {
  const { defaultValue = '', ...otherProps } = fieldData;

  const [value, setValue] = useState<any>('');

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  return (
    <TextField
      fullWidth
      value={value}
      onChange={(e) => setValue(e.target.value)}
      {...otherProps}
    />
  );
};

export default TextFieldBox;
