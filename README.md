[![CI](https://github.com/theluckystrike/webext-split-view/actions/workflows/ci.yml/badge.svg)](https://github.com/theluckystrike/webext-split-view/actions)
[![npm](https://img.shields.io/npm/v/@theluckystrike/webext-split-view)](https://www.npmjs.com/package/@theluckystrike/webext-split-view)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)

# webext-split-view

Resizable panel layout for Chrome extension pages. Supports horizontal and vertical splits with draggable dividers, ratio control, and layout persistence via Chrome storage.

## Installation

```bash
npm install @theluckystrike/webext-split-view
```

```bash
npm i @theluckystrike/webext-split-view
```

## Usage

```typescript
import { SplitView } from '@theluckystrike/webext-split-view';

const split = new SplitView();

// Mount the split view to a container element
const { left, right } = split.mount('container', {
  direction: 'horizontal', // or 'vertical'
  initialRatio: 60        // percentage for left panel (default: 50)
});

// Add content to each panel
left.innerHTML = '<div>Editor Panel</div>';
right.innerHTML = '<div>Preview Panel</div>';

// Save the current layout to Chrome storage
await split.saveLayout('main');

// Load a saved layout
await split.loadLayout('main');

// Programmatic ratio control
split.setRatio(75);
const ratio = split.getRatio();
```

## API

### SplitView

The main class for managing split panel layouts.

#### mount(containerId, options)

Mounts the split view to a DOM element and returns references to the left and right panels.

Parameters:
- `containerId` (string): ID of the container element
- `options.direction` ('horizontal' | 'vertical'): Layout direction (default: 'horizontal')
- `options.initialRatio` (number): Initial percentage for the first panel (default: 50)

Returns: `{ left: HTMLElement, right: HTMLElement }`

#### setRatio(ratio: number): void

Sets the split ratio programmatically. Value is clamped between 10 and 90.

#### getRatio(): number

Returns the current ratio as a percentage.

#### saveLayout(name: string): Promise<void>

Saves the current layout to Chrome local storage with the given name.

#### loadLayout(name: string): Promise<void>

Loads a saved layout from Chrome storage by name and applies the ratio.

## About

webext-split-view is maintained by theluckystrike and built for modern Chrome extensions using Manifest V3. It provides a clean, resizable split panel layout suitable for code editors, preview panels, and other side-by-side UI configurations.

For questions and support, please open an issue on GitHub.

## License

MIT

---

Built by [theluckystrike](https://github.com/theluckystrike) — [zovo.one](https://zovo.one)
