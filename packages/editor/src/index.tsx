// 导出重构后的组件
export { ContentEditable } from './components/content-editable';
export { ContentEditableCore } from './components/content-editable-core';

// 导出撤销重做编辑器
export { UndoableEditor } from './components/undoable-editor';
export type { UndoableEditorHandle } from './components/undoable-editor';

// 导出自定义词典
export {
  CustomDictionary,
  createCustomDictionary,
} from './dictionary/customDictionary';

// 导出 hooks
export { useSpellChecker } from './dictionary/useTypeByWorker';

// 导出工具函数
export {
  calculateIncrementalCheckRegions,
  htmlConvertText,
  getCharacterOffset,
  findNodeAndOffset,
} from './utils';

// 导出类型
export type {
  TextPosition,
  TextChange,
  IncrementalCheckRegion,
} from './utils';

export type {
  ContentEditableProps,
  ContentEditableHandle,
} from './components/content-editable';

export type {
  ContentEditableCoreProps,
  ContentEditableCoreHandle,
} from './components/content-editable-core';
