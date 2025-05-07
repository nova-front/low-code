# Rslib project

## Setup

Install the dependencies:

```bash
pnpm install
```

## Get started

Build the library:

```bash
pnpm build
```

Build the library in watch mode:

```bash
pnpm dev
```

## 词典

### 类实现

englishDictionary.ts

```ts
const dictionary = new EnglishDictionary(['a', 'b', ...]);
dictionary.check("apple");
```

### Trie树（前缀树）

dictionaryTrie.ts

```ts
// 初始化时构建Trie
const trie = new DictionaryTrie(['a', 'b', ...]);
// 验证单词合法性
trie.check('apple');
```

### hunspell-asm

实现基于 hunspell-asm 的字典检查
