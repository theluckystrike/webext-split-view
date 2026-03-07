import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { SplitView } from './index';

// Mock chrome API
const chromeMock = {
  storage: {
    local: {
      get: vi.fn(),
      set: vi.fn(),
    },
  },
};
(global as any).chrome = chromeMock;

describe('SplitView', () => {
  let split: SplitView;
  let container: HTMLElement;

  beforeEach(() => {
    split = new SplitView();
    container = document.createElement('div');
    container.id = 'split-container';
    document.body.appendChild(container);
    vi.clearAllMocks();
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('should mount with default options', () => {
    const { left, right } = split.mount('split-container');
    console.log('Container innerHTML:', container.innerHTML);
    expect(container.children.length).toBe(3);
    expect(left.style.width).toBe('50%');
  });

  it('should mount with initial ratio', () => {
    const { left } = split.mount('split-container', { initialRatio: 30 });
    expect(left.style.width).toBe('30%');
  });

  it('should mount vertically', () => {
    const { left } = split.mount('split-container', { direction: 'vertical' });
    expect(container.style.flexDirection).toBe('column');
    expect(left.style.height).toBe('50%');
  });

  it('should throw if container not found', () => {
    expect(() => split.mount('non-existent')).toThrow();
  });

  it('should set ratio programmatically', () => {
    split.mount('split-container');
    split.setRatio(75);
    expect(split.getRatio()).toBe(75);
  });

  it('should constrain ratio between 10 and 90', () => {
    split.mount('split-container');
    split.setRatio(5);
    expect(split.getRatio()).toBe(10);
    split.setRatio(95);
    expect(split.getRatio()).toBe(90);
  });

  it('should save layout', async () => {
    split.mount('split-container');
    split.setRatio(40);
    await split.saveLayout('test');
    expect(chromeMock.storage.local.set).toHaveBeenCalledWith({ '__split_test__': 40 });
  });

  it('should load layout', async () => {
    split.mount('split-container');
    chromeMock.storage.local.get.mockResolvedValue({ '__split_test__': 60 });
    await split.loadLayout('test');
    expect(split.getRatio()).toBe(60);
  });

  it('should handle dragging (mousedown)', () => {
    split.mount('split-container');
    const divider = container.children[1] as HTMLElement;
    divider.dispatchEvent(new MouseEvent('mousedown'));
    expect(divider.style.background).toBe('#3B82F6');
  });

  it('should handle mouseup after dragging', () => {
    split.mount('split-container');
    const divider = container.children[1] as HTMLElement;
    divider.dispatchEvent(new MouseEvent('mousedown'));
    document.dispatchEvent(new MouseEvent('mouseup'));
    expect(divider.style.background).toBe('#E5E7EB');
  });

  it('should handle mouseenter/mouseleave on divider', () => {
    split.mount('split-container');
    const divider = container.children[1] as HTMLElement;
    divider.dispatchEvent(new MouseEvent('mouseenter'));
    expect(divider.style.background).toBe('#3B82F6');
    divider.dispatchEvent(new MouseEvent('mouseleave'));
    expect(divider.style.background).toBe('#E5E7EB');
  });
});
