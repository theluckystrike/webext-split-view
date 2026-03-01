/**
 * Split View — Resizable panel layout with draggable dividers
 */
export class SplitView {
    private container: HTMLElement | null = null;
    private ratio = 50;

    /** Mount split view to container */
    mount(containerId: string, options: { direction?: 'horizontal' | 'vertical'; initialRatio?: number } = {}): { left: HTMLElement; right: HTMLElement } {
        this.container = document.getElementById(containerId);
        if (!this.container) throw new Error(`Container #${containerId} not found`);
        const { direction = 'horizontal', initialRatio = 50 } = options;
        this.ratio = initialRatio;
        const isH = direction === 'horizontal';

        this.container.style.cssText = `display:flex;flex-direction:${isH ? 'row' : 'column'};width:100%;height:100%;overflow:hidden`;
        const left = document.createElement('div'); left.style.cssText = `${isH ? 'width' : 'height'}:${this.ratio}%;overflow:auto`;
        const divider = document.createElement('div');
        divider.style.cssText = `${isH ? 'width:4px;cursor:col-resize' : 'height:4px;cursor:row-resize'};background:#E5E7EB;flex-shrink:0;transition:background 0.15s`;
        divider.addEventListener('mouseenter', () => { divider.style.background = '#3B82F6'; });
        divider.addEventListener('mouseleave', () => { if (!isDragging) divider.style.background = '#E5E7EB'; });
        const right = document.createElement('div'); right.style.cssText = `flex:1;overflow:auto`;

        let isDragging = false;
        divider.addEventListener('mousedown', (e) => { isDragging = true; e.preventDefault(); divider.style.background = '#3B82F6'; });
        document.addEventListener('mousemove', (e) => {
            if (!isDragging || !this.container) return;
            const rect = this.container.getBoundingClientRect();
            const pos = isH ? (e.clientX - rect.left) / rect.width * 100 : (e.clientY - rect.top) / rect.height * 100;
            this.ratio = Math.max(10, Math.min(90, pos));
            left.style[isH ? 'width' : 'height'] = `${this.ratio}%`;
        });
        document.addEventListener('mouseup', () => { isDragging = false; divider.style.background = '#E5E7EB'; });

        this.container.innerHTML = '';
        this.container.appendChild(left); this.container.appendChild(divider); this.container.appendChild(right);
        return { left, right };
    }

    /** Set ratio programmatically */
    setRatio(ratio: number): void {
        this.ratio = Math.max(10, Math.min(90, ratio));
        const left = this.container?.children[0] as HTMLElement;
        if (left) left.style.width = `${this.ratio}%`;
    }

    /** Get current ratio */
    getRatio(): number { return this.ratio; }

    /** Save layout */
    async saveLayout(name: string): Promise<void> { await chrome.storage.local.set({ [`__split_${name}__`]: this.ratio }); }

    /** Load layout */
    async loadLayout(name: string): Promise<void> {
        const result = await chrome.storage.local.get(`__split_${name}__`);
        const ratio = result[`__split_${name}__`];
        if (typeof ratio === 'number') this.setRatio(ratio);
    }
}
