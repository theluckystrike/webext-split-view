# webext-split-view — Resizable Panel Layout
> **Built by [Zovo](https://zovo.one)** | `npm i webext-split-view`

Horizontal/vertical split with draggable divider, ratio control, and layout persistence.

```typescript
import { SplitView } from 'webext-split-view';
const split = new SplitView();
const { left, right } = split.mount('container', { direction: 'horizontal', initialRatio: 60 });
left.innerHTML = '<div>Editor</div>';
right.innerHTML = '<div>Preview</div>';
await split.saveLayout('main');
```
MIT License
