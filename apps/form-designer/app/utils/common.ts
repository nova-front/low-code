export const copy = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    const msg = "复制成功!";
    alert(msg);
    console.log(msg);
  } catch (err) {
    const msg = `复制失败: ${err}`;
    console.error(msg);
  }
};
