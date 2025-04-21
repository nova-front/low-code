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

export interface TextPosition {
  startOffset: number;
  endOffset: number;
  height: number;
}

export function getExactTextPositions(
  editableElement: HTMLElement,
  targetText: string
): TextPosition[] {
  const results: TextPosition[] = [];
  if (!targetText || targetText.length === 0) return results;

  // 创建正则表达式：匹配精确目标，前后有单词边界（空格/标点/开头结尾）
  const regex = new RegExp(`\\b${escapeRegExp(targetText)}\\b`, "gi");
  const elementRect = editableElement.getBoundingClientRect();
  const walker = document.createTreeWalker(
    editableElement,
    NodeFilter.SHOW_TEXT
  );

  // 临时变量用于跨节点合并文本
  let accumulatedText = "";
  let nodeStartIndex = 0;
  const nodeMap: { node: Text; start: number; end: number }[] = [];

  // 第一阶段：收集并合并所有文本节点
  while (walker.nextNode()) {
    const textNode = walker.currentNode as Text;
    const text = textNode.textContent || "";
    nodeMap.push({
      node: textNode,
      start: nodeStartIndex,
      end: nodeStartIndex + text.length,
    });
    accumulatedText += text;
    nodeStartIndex += text.length;
  }

  // 第二阶段：使用正则匹配完整词汇
  let match: RegExpExecArray | null;
  while ((match = regex.exec(accumulatedText)) !== null) {
    const matchStart = match.index;
    const matchEnd = match.index + targetText.length;

    // 找到匹配的文本节点范围
    const { startNode, startOffset, endNode, endOffset } = findNodesFromIndex(
      nodeMap,
      matchStart,
      matchEnd
    );

    // 创建 Range 并计算位置
    const range = document.createRange();
    range.setStart(startNode, startOffset);
    range.setEnd(endNode, endOffset);

    const rects = range.getClientRects();
    for (const rect of Array.from(rects)) {
      if (rect.width === 0) continue;

      const startOffset = Math.round(rect.left - elementRect.left);
      const endOffset = Math.round(rect.right - elementRect.left);
      const height = Math.round(rect.bottom - elementRect.top);

      results.push({ startOffset, endOffset, height });
    }
  }

  return results;
}

// 辅助函数：转义正则特殊字符
function escapeRegExp(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// 辅助函数：根据字符索引定位文本节点
function findNodesFromIndex(
  nodeMap: { node: Text; start: number; end: number }[],
  matchStart: number,
  matchEnd: number
) {
  let startNode!: Text, endNode!: Text;
  let startOffset = 0,
    endOffset = 0;

  for (const segment of nodeMap) {
    if (matchStart >= segment.start && matchStart < segment.end) {
      startNode = segment.node;
      startOffset = matchStart - segment.start;
    }
    if (matchEnd > segment.start && matchEnd <= segment.end) {
      endNode = segment.node;
      endOffset = matchEnd - segment.start;
    }
  }

  return { startNode, startOffset, endNode, endOffset };
}
