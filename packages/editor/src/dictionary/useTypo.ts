import { useEffect, useRef, useState } from "react";
import Typo from "typo-js";

export const useSpellChecker = () => {
  const [dictionary, setDictionary] = useState<Typo | null>(null);
  // 新增：自定义单词列表
  const customWords = useRef<Set<string>>(new Set());

  useEffect(() => {
    const loadDictionary = async () => {
      try {
        // 这个地址整合到当前lib里或者换成自己的cdn地址
        const affData = await fetch("/dictionaries/en_US.aff").then((res) =>
          res.text()
        );
        const dicData = await fetch("/dictionaries/en_US.dic").then((res) =>
          res.text()
        );
        const dict = new Typo("en_US", affData, dicData);
        setDictionary(dict);
      } catch (error) {
        console.error("字典加载失败", error);
      }
    };

    loadDictionary();
  }, []);

  const check = (word: string): boolean | null => {
    if (!dictionary) return null;
    const lowerWord = word.toLowerCase();
    // 先检查自定义词表，再检查字典
    if (customWords.current.has(lowerWord)) return true;
    return dictionary.check(lowerWord.toLowerCase());
  };

  const getSuggestions = (word: string, limit = 5): string[] => {
    if (!dictionary) return [];
    return dictionary.suggest(word.toLowerCase()).slice(0, limit);
  };

  // 单个添加
  const addWord = (word: string) => {
    customWords.current.add(word.toLowerCase());
  };

  // 批量添加
  const addWords = (words: string[]) => {
    words.forEach((word) => {
      customWords.current.add(word.toLowerCase());
    });
  };

  // 删除单个自定义单词
  const removeWord = (word: string) => {
    customWords.current.delete(word.toLowerCase());
  };

  // 清空所有自定义单词
  const clearCustomWords = () => {
    customWords.current.clear();
  };

  return {
    check,
    getSuggestions,
    addWord,
    addWords,
    removeWord,
    clearCustomWords,
    ready: !!dictionary,
  };
};
