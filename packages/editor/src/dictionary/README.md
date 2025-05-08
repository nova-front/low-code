## 词典

src/dictionary

### 简单类实现

englishDictionary.ts

```ts
import { EnglishDictionary } from "../../dictionary/englishDictionary";

const dictionary = new EnglishDictionary();
dictionary.check("apple");
```

### Trie树（前缀树）

dictionaryTrie.ts

```ts
import { DictionaryTrie } from "../../dictionary/dictionaryTrie";

// 初始化时构建Trie
const dictionary = new DictionaryTrie();
// 验证单词合法性
dictionary.check("apple");
```

### typo-js 实现

useTypo.ts

```ts
import { useSpellChecker } from "../../dictionary/useTypo";

const { check } = useSpellChecker();
check("apple");
```
