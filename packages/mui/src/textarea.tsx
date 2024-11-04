import TextField, { type TextFieldProps } from "./textfield";

interface TextareaProps extends TextFieldProps {}

const Textarea = (props: TextareaProps): JSX.Element => {
  return <TextField multiline rows={3} maxRows={10} {...props} />;
};

export default Textarea;
