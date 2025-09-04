import { top100Films } from '@/mock';
import { FieldType } from '@/components/form/type';

export const generateString = () => {
  const characters = 'abcdefghijklmnopqrstuvwxyz';
  return Array.from(
    { length: 6 },
    () => characters[Math.floor(Math.random() * characters.length)]
  ).join('');
};

// TODO: 待完善
export const getInitData = (data: any) => {
  const initData = {
    ...data,
    label: data.name,
    helperText: '',
    required: false,
    disabled: false,
    defaultValue: '',
    key: generateString(),
  };
  switch (data.type as FieldType) {
    case 'textfield':
      initData.placeholder = 'Please enter a value';
      break;
    case 'textarea':
      initData.placeholder = 'Please enter a value';
      break;
    case 'checkbox':
      initData.options = ['item a'];
      initData.defaultValue = [];
      initData.direction = 'row';
      break;
    case 'radio':
      initData.options = ['item a'];
      initData.direction = 'row';
      break;
    case 'switch':
      initData.options = ['open'];
      initData.defaultValue = [];
      initData.direction = 'row';
      break;
    case 'select':
      initData.options = ['item a'];
      break;
    case 'autocomplete':
      initData.options = top100Films;
      break;
    case 'button':
      break;
    default:
      break;
  }
  return { ...initData };
};
