import { memo } from "react";
import TextFieldBox from "./TextFieldBox";
import TextAreaBox from "./TextAreaBox";
import SelectBox from "./SelectBox";
import CheckBoxGroupBox from "./CheckBoxGroupBox";
import RadioGroupBox from "./RadioGroupBox";
import SwitchesGroupBox from "./SwitchesGroupBox";

import { FormItemProps } from "@/type";

const FormItem = ({ fieldData }: { fieldData: FormItemProps }) => {
  const { type } = fieldData;

  // TODO: 待完善
  return (
    <>
      {type === "textfield" && <TextFieldBox fieldData={fieldData} />}
      {type === "textarea" && <TextAreaBox fieldData={fieldData} />}
      {type === "select" && <SelectBox fieldData={fieldData} />}
      {type === "checkbox" && <CheckBoxGroupBox fieldData={fieldData} />}
      {type === "radio" && <RadioGroupBox fieldData={fieldData} />}
      {type === "switch" && <SwitchesGroupBox fieldData={fieldData} />}
    </>
  );
};

export default memo(FormItem);
