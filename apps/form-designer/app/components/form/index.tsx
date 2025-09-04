import { Box, Button } from '@mui/material';
import FormItem from './item';

import { FormItemProps } from './type';

interface FormBoxProps {
  components: FormItemProps[];
}

const FormBox = ({ components }: FormBoxProps) => {
  return (
    <Box sx={{ margin: '12px 0' }}>
      {components?.map((item: FormItemProps, index: number) => {
        return (
          <Box key={index} sx={{ mb: '24px' }}>
            <FormItem fieldData={item} />
          </Box>
        );
      })}
      <Button variant="contained">提交</Button>
    </Box>
  );
};

export default FormBox;
