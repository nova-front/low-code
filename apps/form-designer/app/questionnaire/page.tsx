import type { Metadata } from "next";
// import Questionnaire from "./Ques";
import { components } from "./config";
import Form from "@/components/form";

export const metadata: Metadata = {
  title: "问卷调查",
  description: "",
  keywords: ["xxx"],
};
const PageBox = () => {
  return (
    <div>
      <Form components={components} />
    </div>
  );
};
export default PageBox;
