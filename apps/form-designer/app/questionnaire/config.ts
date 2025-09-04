import { FormItemProps } from '@/components/form/type';

export const components: FormItemProps[] = [
  {
    type: 'textfield',
    label: '姓名',
    helperText: '花名也是可以的哦',
    required: true,
    disabled: false,
    defaultValue: '',
    placeholder: '请输入您的姓名',
  },
  {
    type: 'radio',
    label: '性别',
    helperText: '',
    required: true,
    disabled: false,
    defaultValue: '',
    options: [
      { label: '男', value: '1' },
      { label: '女', value: '0' },
      { label: '保密', value: '-1' },
    ],
  },
];
