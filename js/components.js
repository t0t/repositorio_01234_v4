class ComponentLoader {
    constructor() {
        this.componentsCache = new Map();
    }

    async loadComponent(path) {
        if (this.componentsCache.has(path)) {
            return this.componentsCache.get(path);
        }

        try {
            const response = await fetch(path);
            const html = await response.text();
            this.componentsCache.set(path, html);
            return html;
        } catch (error) {
            console.error(`Error loading component from ${path}:`, error);
            return '';
        }
    }

    async initComponents() {
        const components = document.querySelectorAll('[data-component]');
        for (const element of components) {
            const componentPath = element.dataset.component;
            const html = await this.loadComponent(`/components/${componentPath}.html`);
            element.innerHTML = html;

            // Procesar slots
            const slots = element.querySelectorAll('slot');
            slots.forEach(slot => {
                const slotName = slot.getAttribute('name');
                const content = element.querySelector(`[slot="${slotName}"]`);
                if (content) {
                    slot.replaceWith(content);
                }
            });
        }
    }
}

// Inicializar componentes cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    const loader = new ComponentLoader();
    loader.initComponents();
});
