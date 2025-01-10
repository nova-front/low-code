import { memo } from "react";
import TextFieldBox from "./field/TextFieldBox";
import TextAreaBox from "./field/TextAreaBox";
import SelectBox from "./field/SelectBox";
import CheckBoxGroupBox from "./field/CheckBoxGroupBox";
import RadioGroupBox from "./field/RadioGroupBox";
import SwitchGroupBox from "./field/SwitchGroupBox";
import AutocompleteBox from "./field/AutocompleteBox";

import { FormItemProps } from "@/components/form/type";

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
      {type === "switch" && <SwitchGroupBox fieldData={fieldData} />}
      {type === "autocomplete" && <AutocompleteBox fieldData={fieldData} />}
      {type === "unknown" && `【${fieldData.name}】正在开发...`}
    </>
  );
};

export default memo(FormItem);
