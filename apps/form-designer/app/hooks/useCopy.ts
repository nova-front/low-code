import { toast } from "react-toastify";

const useCopy = () => {
  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      const msg = "复制成功!";
      toast.success(msg, {
        position: "bottom-right",
        autoClose: 2000,
      });
    } catch (err) {
      const msg = `复制失败: ${err}`;
      toast.error(msg, {
        position: "bottom-right",
        autoClose: 2000,
      });
    }
  };

  return {
    copy,
  };
};

export default useCopy;
