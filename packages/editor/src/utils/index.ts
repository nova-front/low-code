import { convert } from "html-to-text";
import { EnglishDictionary } from "./dictionary/englishDictionary";
import { DictionaryTrie } from "./dictionary/dictionaryTrie";

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
  isValid: boolean;
  word: string;
}

export function getTextPositionsWithDictionary(
  editableElement: HTMLElement,
  dictionary: EnglishDictionary | DictionaryTrie // 字典类
): TextPosition[] {
  const results: TextPosition[] = [];
  if (!editableElement) return results;

  // 获取所有文本节点
  const allTextNodes = getAllTextNodes(editableElement);
  const elementRect = editableElement.getBoundingClientRect();

  // 构建全文和位置映射
  let fullText = "";
  const nodeMap: { node: Text; start: number; end: number }[] = [];

  allTextNodes.forEach((node) => {
    const text = node.textContent || "";
    nodeMap.push({
      node,
      start: fullText.length,
      end: fullText.length + text.length,
    });
    fullText += text + " ";
  });

  // 匹配所有英文单词（至少2个字母）
  const wordRegex = /\b([a-zA-Z']{2,})\b/g;
  let match: RegExpExecArray | null;

  while ((match = wordRegex.exec(fullText)) !== null) {
    const matchedWord = match[1];
    const matchStart = match.index;
    const matchEnd = matchStart + matchedWord.length;

    // 验证单词合法性
    const isValid = dictionary.check(matchedWord);

    // 定位节点
    const { startNode, startOffset, endNode, endOffset } = findNodesFromIndex(
      nodeMap,
      matchStart,
      matchEnd
    );

    if (!startNode || !endNode) continue;

    // 计算位置
    const range = document.createRange();
    range.setStart(startNode, startOffset);
    range.setEnd(endNode, endOffset);

    Array.from(range.getClientRects()).forEach((rect) => {
      if (rect.width > 0 && rect.height > 0 && !isValid) {
        results.push({
          word: matchedWord,
          startOffset: Math.round(rect.left - elementRect.left),
          endOffset: Math.round(rect.right - elementRect.left),
          height: Math.round(rect.bottom - elementRect.top),
          isValid,
        });
      }
    });
  }

  return results;
}

// export function getTextPositionsWithDictionaryTrie(
//   editableElement: HTMLElement,
//   dictionary: DictionaryTrie
// ): TextPosition[] {
//   const results: TextPosition[] = [];
//   if (!editableElement) return results;

//   // 获取所有文本节点
//   const allTextNodes = getAllTextNodes(editableElement);
//   const elementRect = editableElement.getBoundingClientRect();

//   // 构建全文和位置映射
//   let fullText = "";
//   const nodeMap: { node: Text; start: number; end: number }[] = [];

//   allTextNodes.forEach((node) => {
//     const text = node.textContent || "";
//     nodeMap.push({
//       node,
//       start: fullText.length,
//       end: fullText.length + text.length,
//     });
//     fullText += text + " ";
//   });

//   // 匹配所有英文单词（至少2个字母）
//   const wordRegex = /\b([a-zA-Z']{2,})\b/g;
//   let match: RegExpExecArray | null;

//   while ((match = wordRegex.exec(fullText)) !== null) {
//     const matchedWord = match[1];
//     const matchStart = match.index;
//     const matchEnd = matchStart + matchedWord.length;

//     // 验证单词合法性
//     const isValid = dictionary.check(matchedWord);

//     // 定位节点
//     const { startNode, startOffset, endNode, endOffset } = findNodesFromIndex(
//       nodeMap,
//       matchStart,
//       matchEnd
//     );

//     if (!startNode || !endNode) continue;

//     // 计算位置
//     const range = document.createRange();
//     range.setStart(startNode, startOffset);
//     range.setEnd(endNode, endOffset);

//     Array.from(range.getClientRects()).forEach((rect) => {
//       if (rect.width > 0 && rect.height > 0 && !isValid) {
//         results.push({
//           word: matchedWord,
//           startOffset: Math.round(rect.left - elementRect.left),
//           endOffset: Math.round(rect.right - elementRect.left),
//           height: Math.round(rect.bottom - elementRect.top),
//           isValid,
//         });
//       }
//     });
//   }

//   return results;
// }

// 获取所有文本节点（包括深层嵌套）
function getAllTextNodes(element: HTMLElement): Text[] {
  const nodes: Text[] = [];
  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, {
    acceptNode: (node) => {
      // 过滤掉纯空白文本节点（保留包含换行符的）
      return node.textContent?.trim() || node.textContent?.includes("\n")
        ? NodeFilter.FILTER_ACCEPT
        : NodeFilter.FILTER_REJECT;
    },
  });

  while (walker.nextNode()) {
    nodes.push(walker.currentNode as Text);
  }
  return nodes;
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

// html 转换成纯文本
export const htmlConvertText = (html: string) => {
  // 转换选项配置
  const options = {
    // wordwrap: 0, // 禁用自动换行
    preserveNewlines: true, // 保留原始换行
    selectors: [
      // 处理段落和换行
      {
        selector: "p",
        options: { leadingLineBreaks: 1, trailingLineBreaks: 1 },
      },
      { selector: "br", format: "lineBreak" },
      // 处理div
      {
        selector: "div",
        options: { leadingLineBreaks: 1, trailingLineBreaks: 1 },
      },
      // 处理标题
      {
        selector: "h1",
        options: { leadingLineBreaks: 2, trailingLineBreaks: 2 },
      },
      {
        selector: "h2",
        options: { leadingLineBreaks: 2, trailingLineBreaks: 2 },
      },
      // 忽略图片
      { selector: "img", format: "skip" },
      // 处理链接但不保留href
      { selector: "a", options: { ignoreHref: true } },
    ],
  };

  return convert(html, options);
};
