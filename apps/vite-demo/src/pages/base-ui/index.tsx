import { Button } from "@nova-fe/base-ui";

const BaseUI = () => {
  document.title = "Headless UI";
  return (
    <div>
      <h2>无样式按钮组件演示</h2>

      <section>
        <h3>基本按钮</h3>
        <Button onClick={() => alert("点击了按钮")}>基本按钮</Button>
      </section>

      <section>
        <h3>禁用状态</h3>
        <Button disabled>禁用按钮</Button>
        <Button disabled onClick={() => alert("你不会看到这个提示")}>
          带点击事件的禁用按钮
        </Button>
      </section>

      <section>
        <h3>链接样式按钮</h3>
        <Button as="a" href="https://example.com" target="_blank">
          链接样式按钮
        </Button>
      </section>

      <section>
        <h3>使用自定义类名</h3>
        <Button
          className="custom-btn"
          onClick={() => console.log("自定义样式按钮")}
        >
          自定义样式按钮
        </Button>
      </section>
    </div>
  );
};

export default BaseUI;
