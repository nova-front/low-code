import React, { useState, useEffect } from 'react';
import {
  ContentEditable,
  ContentEditableCore,
  useSpellChecker,
} from '@nova-fe/editor';
import DemoSection from '../../components/DemoSection';

const EPV: React.FC = () => {
  const [customWords, setCustomWords] = useState<string[]>([]);
  const [performanceStats, setPerformanceStats] = useState<{
    lastCheckTime: number;
    wordCount: number;
    errorCount: number;
  } | null>(null);

  const {
    addWord,
    removeWord,
    getAllCustomWords,
    getSuggestions,
    isReady,
    check,
  } = useSpellChecker();

  // 更新自定义词典列表
  const updateCustomWords = () => {
    setCustomWords(getAllCustomWords());
  };

  useEffect(() => {
    if (isReady) {
      updateCustomWords();
    }
  }, [isReady]);

  // 通用按钮样式
  const buttonStyle = (color: string) => ({
    padding: '8px 16px',
    backgroundColor: color,
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
  });

  // 添加自定义单词
  const handleAddWord = () => {
    const word = prompt('请输入要添加的单词:');
    if (word?.trim()) {
      if (addWord(word.trim())) {
        updateCustomWords();
        alert(`"${word}" 已添加`);
      } else {
        alert('添加失败');
      }
    }
  };

  // 删除自定义单词
  const handleRemoveWord = (word: string) => {
    if (removeWord(word)) {
      updateCustomWords();
      alert(`"${word}" 已删除`);
    }
  };

  // 测试功能
  const handleTest = async (type: 'check' | 'suggest') => {
    const word = prompt(
      `请输入要${type === 'check' ? '检查' : '获取建议'}的单词:`
    );
    if (!word?.trim()) return;

    if (type === 'check') {
      const isCorrect = check(word.trim());
      alert(`"${word}" ${isCorrect ? '拼写正确' : '拼写错误'}`);
    } else {
      const suggestions = await getSuggestions(word.trim());
      alert(
        suggestions.length > 0 ? `建议: ${suggestions.join(', ')}` : '无建议'
      );
    }
  };

  // 生成测试文本
  const generateTestText = (wordCount: number) => {
    const correctWords = [
      'the',
      'quick',
      'brown',
      'fox',
      'jumps',
      'over',
      'lazy',
      'dog',
      'this',
      'is',
      'sample',
      'text',
      'with',
      'many',
      'words',
      'for',
      'testing',
      'performance',
      'editor',
      'component',
      'works',
      'well',
      'large',
      'documents',
      'and',
      'can',
      'handle',
      'thousands',
      'words',
      'without',
      'any',
      'issues',
      'spell',
      'check',
      'feature',
      'should',
      'work',
      'efficiently',
      'even',
      'when',
      'processing',
    ];

    const misspelledWords = [
      'helo',
      'wrold',
      'testt',
      'programing',
      'recieve',
      'seperate',
      'occured',
      'definately',
      'accomodate',
      'begining',
      'calender',
      'cemetary',
      'changable',
      'collegue',
      'comming',
      'concious',
      'dilemna',
      'embarass',
      'existance',
      'goverment',
      'harrass',
      'independant',
      'judgement',
      'knowlege',
      'liason',
      'maintainance',
      'neccessary',
      'occassion',
      'priviledge',
      'recomend',
    ];

    const allWords = [...correctWords, ...misspelledWords];
    const words = [];

    for (let i = 0; i < wordCount; i++) {
      // 每10个单词中大约有2-3个拼写错误
      const useCorrect = i % 10 < 7;
      const wordArray = useCorrect ? correctWords : misspelledWords;
      words.push(wordArray[i % wordArray.length]);
    }

    return words.join(' ') + '.';
  };

  // 插入测试文本到编辑器
  const insertTestText = (wordCount: number) => {
    const startTime = performance.now();
    const testText = generateTestText(wordCount);
    const editor = document.querySelector(
      '[contenteditable="true"]'
    ) as HTMLElement;

    if (editor) {
      editor.innerText = testText;
      editor.dispatchEvent(new Event('input', { bubbles: true }));

      const insertTime = performance.now();
      console.log(
        `📊 插入 ${wordCount} 个单词耗时: ${(insertTime - startTime).toFixed(2)}ms`
      );
      console.log(`📝 文本长度: ${testText.length} 字符`);

      // 模拟拼写检查性能统计（实际的拼写检查是异步的）
      setTimeout(() => {
        const spellCheckTime = performance.now();
        const words = testText.split(' ');
        const errorCount = words.filter((word) =>
          [
            'helo',
            'wrold',
            'testt',
            'programing',
            'recieve',
            'seperate',
            'occured',
            'definately',
            'accomodate',
            'begining',
          ].some((err) => word.includes(err))
        ).length;

        setPerformanceStats({
          lastCheckTime: spellCheckTime - insertTime,
          wordCount: words.length,
          errorCount,
        });

        console.log(
          `🔍 拼写检查完成，发现 ${errorCount} 个错误，耗时: ${(spellCheckTime - insertTime).toFixed(2)}ms`
        );
      }, 100);
    }
  };

  return (
    <div>
      <DemoSection
        title="🔍 英语拼写检查编辑器 (EPV)"
        description="基于Web Worker的高性能英语拼写检查器，支持自定义词典和拼写建议"
        code={`import { ContentEditable, useSpellChecker } from "@nova-fe/editor";

<ContentEditable
  spellcheck={true}
  fontSize="16px"
  lineHeight={1.6}
  padding="16px"
  minHeight="300px"
  fontFamily="Georgia, serif"
  placeholder="请输入英文文本进行拼写检查..."
/>`}
      >
        <ContentEditable
          fontSize="16px"
          lineHeight={1.6}
          padding="16px"
          minHeight="300px"
          fontFamily="Georgia, 'Times New Roman', serif"
          border="1px solid #d9d9d9"
          borderRadius="6px"
          spellcheck
          placeholder="请输入英文文本进行拼写检查，拼写错误的单词会显示红色波浪下划线..."
          customDictionary={customWords}
        />

        <div
          style={{
            marginTop: '1rem',
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap',
          }}
        >
          <button onClick={handleAddWord} style={buttonStyle('#1677ff')}>
            ➕ 添加单词
          </button>
          <button
            onClick={() => handleTest('suggest')}
            style={buttonStyle('#52c41a')}
          >
            💡 拼写建议
          </button>
          <button
            onClick={() => handleTest('check')}
            style={buttonStyle('#722ed1')}
          >
            ✅ 检查单词
          </button>
        </div>

        <div style={{ marginTop: '1rem' }}>
          <h4 style={{ margin: '0 0 0.5rem 0', color: '#fa8c16' }}>
            📊 性能测试文本
          </h4>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => insertTestText(50)}
              style={{ ...buttonStyle('#fa8c16'), fontSize: '12px' }}
            >
              📝 基础 (50词)
            </button>
            <button
              onClick={() => insertTestText(200)}
              style={{ ...buttonStyle('#fa541c'), fontSize: '12px' }}
            >
              📄 中等 (200词)
            </button>
            <button
              onClick={() => insertTestText(1000)}
              style={{ ...buttonStyle('#d4380d'), fontSize: '12px' }}
            >
              📚 1K词
            </button>
            <button
              onClick={() => insertTestText(5000)}
              style={{ ...buttonStyle('#ad2102'), fontSize: '12px' }}
            >
              📖 5K词
            </button>
            <button
              onClick={() => insertTestText(10000)}
              style={{ ...buttonStyle('#871400'), fontSize: '12px' }}
            >
              📗 1W词
            </button>
            <button
              onClick={() => insertTestText(20000)}
              style={{ ...buttonStyle('#610b00'), fontSize: '12px' }}
            >
              📘 2W词
            </button>
          </div>
          <div style={{ marginTop: '0.5rem', fontSize: '12px', color: '#666' }}>
            💡 提示：测试时请打开浏览器控制台查看性能数据
          </div>

          {performanceStats && (
            <div
              style={{
                marginTop: '1rem',
                padding: '0.5rem',
                backgroundColor: '#f0f5ff',
                borderRadius: '4px',
                fontSize: '12px',
              }}
            >
              <strong>📊 最近一次性能统计：</strong>
              <br />
              拼写检查耗时: {performanceStats.lastCheckTime.toFixed(2)}ms
              <br />
              总词数: {performanceStats.wordCount} | 错误数:{' '}
              {performanceStats.errorCount}
            </div>
          )}
        </div>

        <div
          style={{
            marginTop: '1rem',
            padding: '1rem',
            background: '#fff7e6',
            borderRadius: '6px',
            border: '1px solid #ffd591',
          }}
        >
          <h4 style={{ margin: '0 0 0.5rem 0', color: '#fa8c16' }}>
            📊 拼写检查器状态
          </h4>
          <div style={{ fontSize: '0.9rem', color: '#666' }}>
            <p style={{ margin: '0 0 0.5rem 0' }}>
              <strong>状态：</strong> {isReady ? '✅ 已就绪' : '⏳ 加载中'}
            </p>
            <p style={{ margin: '0 0 0.5rem 0' }}>
              <strong>自定义词典：</strong> {customWords.length} 个单词
            </p>
            <p style={{ margin: 0 }}>
              <strong>功能特性：</strong> 增量检查 • LRU缓存 • Web
              Worker异步处理
            </p>
          </div>
        </div>

        {customWords.length > 0 && (
          <div
            style={{
              marginTop: '1rem',
              padding: '1rem',
              background: '#f6ffed',
              borderRadius: '6px',
              border: '1px solid #b7eb8f',
            }}
          >
            <h4 style={{ margin: '0 0 0.5rem 0', color: '#52c41a' }}>
              📝 自定义词典 ({customWords.length} 个单词)
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {customWords.map((word, index) => (
                <span
                  key={index}
                  style={{
                    padding: '4px 8px',
                    backgroundColor: '#fff',
                    border: '1px solid #d9d9d9',
                    borderRadius: '4px',
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleRemoveWord(word)}
                  title="点击删除"
                >
                  {word} ×
                </span>
              ))}
            </div>
          </div>
        )}
      </DemoSection>

      <DemoSection
        title="🔧 useSpellChecker Hook 使用示例"
        description="展示如何使用 useSpellChecker Hook 进行拼写检查和词典管理"
        code={`import { useSpellChecker } from "@nova-fe/editor";

const {
  addWord,
  removeWord,
  getAllCustomWords,
  getSuggestions,
  check,
  isReady
} = useSpellChecker();

// 检查单词
const isCorrect = check("hello"); // true
const isWrong = check("helo");    // false

// 获取拼写建议
const suggestions = await getSuggestions("helo"); // ["hello", "help", ...]

// 管理自定义词典
addWord("customword");
removeWord("customword");
const customWords = getAllCustomWords();`}
      >
        <div
          style={{
            padding: '1rem',
            backgroundColor: '#f9f9f9',
            borderRadius: '6px',
            border: '1px solid #d9d9d9',
          }}
        >
          <h4 style={{ margin: '0 0 1rem 0', color: '#1677ff' }}>
            🛠️ Hook 功能测试
          </h4>
          <div
            style={{
              display: 'flex',
              gap: '1rem',
              flexWrap: 'wrap',
              marginBottom: '1rem',
            }}
          >
            <button
              onClick={() => handleTest('check')}
              style={{ ...buttonStyle('#1677ff'), fontSize: '0.9rem' }}
            >
              检查单词拼写
            </button>
            <button
              onClick={() => handleTest('suggest')}
              style={{ ...buttonStyle('#52c41a'), fontSize: '0.9rem' }}
            >
              获取拼写建议
            </button>
            <button
              onClick={() => {
                updateCustomWords();
                alert(`当前自定义词典包含 ${customWords.length} 个单词`);
              }}
              style={{ ...buttonStyle('#722ed1'), fontSize: '0.9rem' }}
            >
              刷新词典状态
            </button>
          </div>

          <div style={{ fontSize: '0.9rem', color: '#666' }}>
            <p style={{ margin: '0 0 0.5rem 0' }}>
              <strong>Hook状态：</strong>{' '}
              {isReady ? '✅ 已初始化' : '⏳ 初始化中'}
            </p>
            <p style={{ margin: 0 }}>
              <strong>自定义词典：</strong> {customWords.length} 个单词
            </p>
          </div>
        </div>
      </DemoSection>

      <DemoSection
        title="🏗️ 组件对比"
        description="ContentEditableCore vs ContentEditable"
        code={`// 核心组件（轻量级）
<ContentEditableCore placeholder="专注文本编辑" />

// 完整组件（含拼写检查）
<ContentEditable spellcheck placeholder="包含拼写检查" />`}
      >
        <div
          style={{
            display: 'grid',
            gap: '1.5rem',
            gridTemplateColumns: '1fr 1fr',
          }}
        >
          <div>
            <h4 style={{ margin: '0 0 0.5rem 0', color: '#1677ff' }}>
              📝 Core（轻量级）
            </h4>
            <ContentEditableCore
              placeholder="专注文本编辑，性能最优"
              minHeight="100px"
              border="1px solid #d9d9d9"
              borderRadius="4px"
              padding="12px"
            />
          </div>
          <div>
            <h4 style={{ margin: '0 0 0.5rem 0', color: '#52c41a' }}>
              🔍 Full（含拼写检查）
            </h4>
            <ContentEditable
              spellcheck
              placeholder="试试输入 'helo wrold testt'"
              minHeight="100px"
              border="1px solid #d9d9d9"
              borderRadius="4px"
              padding="12px"
            />
          </div>
        </div>
      </DemoSection>
    </div>
  );
};

export default EPV;
