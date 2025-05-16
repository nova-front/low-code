import Typo from "typo-js";

let dictionary: Typo | null = null;
const customWords = new Set<string>();
const checkedCache = new Map<string, boolean>(); // 新增缓存
const currentCheckCache = new Map<string, boolean>(); // 当前校验缓存

self.onmessage = async (event) => {
  const { type, payload } = event.data;

  switch (type) {
    case "INIT_DICTIONARY": {
      const { affData, dicData } = payload;
      dictionary = new Typo("en_US", affData, dicData);
      checkedCache.clear(); // 初始化字典时清空缓存
      break;
    }
    case "ADD_WORD":
      customWords.add(payload.word.toLowerCase());
      checkedCache.clear(); // 添加单词时清空缓存
      break;
    case "REMOVE_WORD":
      customWords.delete(payload.word.toLowerCase());
      checkedCache.clear(); // 移除单词时清空缓存
      break;
    case "CLEAR_WORDS":
      customWords.clear();
      checkedCache.clear(); // 清空单词时清空缓存
      break;
    case "CHECK_TEXT": {
      const { fullText } = payload;
      const invalidWords = await processText(fullText);
      self.postMessage({
        type: "CHECK_RESULT",
        payload: { invalidWords, currentCheckCache },
      });
      break;
    }
    default:
      break;
  }
};

async function processText(fullText: string) {
  const results = [];
  const wordRegex = /\b[a-zA-Z']{2,}\b/g;
  let match;
  let startTime = Date.now();

  while ((match = wordRegex.exec(fullText)) !== null) {
    const word = match[0];
    const lowerWord = word.toLowerCase();

    // 优先使用缓存结果
    if (checkedCache.has(lowerWord)) {
      if (!checkedCache.get(lowerWord)) {
        results.push({
          word,
          start: match.index,
          end: match.index + word.length,
        });
        currentCheckCache.set(lowerWord, false);
      }
    } else {
      // 首次检查时计算并缓存结果
      const isValid =
        customWords.has(lowerWord) || (dictionary?.check(lowerWord) ?? true);
      checkedCache.set(lowerWord, isValid);

      if (!isValid) {
        results.push({
          word,
          start: match.index,
          end: match.index + word.length,
        });
        currentCheckCache.set(lowerWord, false);
      }
    }

    if (Date.now() - startTime > 16) {
      await new Promise((resolve) => setTimeout(resolve, 0));
      startTime = Date.now();
    }
  }

  return results;
}
