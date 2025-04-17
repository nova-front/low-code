// 光标位置管理工具函数
export const getCharacterOffset = (
  container: HTMLElement,
  node: Node,
  offset: number
): number => {
  const walker = document.createTreeWalker(
    container,
    NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT,
    {
      acceptNode: (node) => {
        // 跳过不可见元素
        if (node.nodeType === Node.ELEMENT_NODE) {
          const style = window.getComputedStyle(node as Element);
          if (style.display === "none" || style.visibility === "hidden") {
            return NodeFilter.FILTER_REJECT;
          }
        }
        return NodeFilter.FILTER_ACCEPT;
      },
    }
  );

  let charCount = 0;

  do {
    const currentNode = walker.currentNode;

    if (currentNode.nodeType === Node.TEXT_NODE) {
      const textLength = currentNode.textContent?.length || 0;

      if (currentNode === node) {
        charCount += Math.min(offset, textLength);
        break;
      }
      charCount += textLength;
    } else if (currentNode.nodeName === "BR") {
      // 处理换行符
      charCount += 1;
    }
  } while (walker.nextNode());

  return charCount;
};

export const findNodeAndOffset = (
  container: HTMLElement,
  targetOffset: number
) => {
  const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT);
  let charCount = 0;

  while (walker.nextNode()) {
    const textNode = walker.currentNode as Text;
    const textLength = textNode.length;

    if (charCount + textLength >= targetOffset) {
      return { node: textNode, offset: targetOffset - charCount };
    }
    charCount += textLength;
  }

  return { node: container, offset: container.childNodes.length };
};
