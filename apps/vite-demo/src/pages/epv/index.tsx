import { ContentEditable } from "@repo/editor";
import DemoBox from "../../components/demo";

function Epv() {
  document.title = "英语单词校验";
  return (
    <div style={{ padding: "0 12px" }}>
      <DemoBox title="英语单词校验（学术论文、文章校验），错误单词下方自动显示红色波浪线">
        <ContentEditable
          style={{
            fontSize: "24px",
            lineHeight: 1.6,
            padding: "12px",
            minHeight: "80vh",
          }}
          spellcheck
          placeholder="请输入/粘贴"
        />
      </DemoBox>
    </div>
  );
}

export default Epv;
