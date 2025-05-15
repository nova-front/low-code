import { useEffect, useRef, useState } from "react";

export const useSpellChecker = () => {
  const [worker, setWorker] = useState<Worker | null>(null);
  const customWords = useRef<Set<string>>(new Set());

  useEffect(() => {
    // 初始化 Worker, TODO：这个链接怎么设置才是对的
    const newWorker = new Worker(new URL("./worker.ts", import.meta.url), {
      type: "module",
    });
    setWorker(newWorker);

    // 加载字典
    const loadDictionary = async () => {
      try {
        // TODO: 这个链接怎么才能设置到组件库
        const [affData, dicData] = await Promise.all([
          fetch("/dictionaries/en_US.aff").then((res) => res.text()),
          fetch("/dictionaries/en_US.dic").then((res) => res.text()),
        ]);

        newWorker.postMessage({
          type: "INIT_DICTIONARY",
          payload: { affData, dicData },
        });
      } catch (error) {
        console.error("字典加载失败", error);
      }
    };

    loadDictionary();

    return () => newWorker.terminate();
  }, []);

  // 拼写检查方法
  const check = (word: string) => {
    const lowerWord = word.toLowerCase();
    return customWords.current.has(lowerWord) || false; // 实际检查在 Worker 中完成
  };

  // 自定义词表操作（同步到 Worker）
  const addWord = (word: string) => {
    const lowerWord = word.toLowerCase();
    customWords.current.add(lowerWord);
    worker?.postMessage({ type: "ADD_WORD", payload: { word: lowerWord } });
  };

  const removeWord = (word: string) => {
    const lowerWord = word.toLowerCase();
    customWords.current.delete(lowerWord);
    worker?.postMessage({ type: "REMOVE_WORD", payload: { word: lowerWord } });
  };

  const clearCustomWords = () => {
    customWords.current.clear();
    worker?.postMessage({ type: "CLEAR_WORDS" });
  };

  return { check, addWord, removeWord, clearCustomWords, worker };
};
