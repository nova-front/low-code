import { saveBolbFile } from '../file';

/**
 * @jest-environment jsdom
 */
describe('saveBolbFile', () => {
  let originalURL: any;
  let mockBlob: Blob;
  let mockLink: HTMLAnchorElement;

  beforeEach(() => {
    // 保存原始 URL
    originalURL = window.URL;

    // 创建模拟 Blob
    mockBlob = new Blob(['test content'], { type: 'text/plain' });

    // 创建模拟链接元素
    mockLink = document.createElement('a');
    mockLink.click = jest.fn();

    // 模拟 document.createElement
    jest.spyOn(document, 'createElement').mockReturnValue(mockLink);

    // 初始化 window.URL
    window.URL = {
      createObjectURL: jest.fn().mockReturnValue('blob:test-url'),
      revokeObjectURL: jest.fn(),
    } as any;
  });

  afterEach(() => {
    // 恢复原始 URL
    window.URL = originalURL;
    jest.restoreAllMocks();
  });

  it('应该正确下载文件', () => {
    const filename = 'test-file.txt';

    saveBolbFile(mockBlob, { filename });

    expect(window.URL.createObjectURL).toHaveBeenCalledWith(mockBlob);
    expect(mockLink.href).toBe('blob:test-url');
    expect(mockLink.click).toHaveBeenCalled();
    expect(window.URL.revokeObjectURL).toHaveBeenCalledWith('blob:test-url');
  });
});
