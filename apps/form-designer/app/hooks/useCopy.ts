import { useNotifications } from "@toolpad/core/useNotifications";

const useCopy = () => {
  const notifications = useNotifications();
  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      const msg = "复制成功!";
      notifications.show(msg, {
        severity: "success",
        autoHideDuration: 3000,
      });
      console.log(msg);
    } catch (err) {
      const msg = `复制失败: ${err}`;
      notifications.show(msg, {
        severity: "error",
        autoHideDuration: 3000,
      });
      console.error(msg);
    }
  };

  return {
    copy,
  };
};

export default useCopy;
