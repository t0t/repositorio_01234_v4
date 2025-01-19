// Nav Component
class NavComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        // Create styles
        const style = document.createElement('style');
        style.textContent = `
            :host {
                display: block;
                position: relative;
                z-index: 10000;
            }

            .nav-component {
                position: fixed;
                top: 0;
                right: -300px;
                width: 300px;
                height: 100vh;
                background: var(--nav-background, #000);
                transition: right 0.3s ease;
                z-index: 9999;
                border-left: 1px solid var(--nav-border, #fff);
                backdrop-filter: blur(5px);
            }

            .nav-component.active {
                right: 0;
            }

            .nav-content {
                padding: 4rem 2rem;
                display: flex;
                flex-direction: column;
                gap: 1rem;
            }

            .nav-link {
                color: var(--nav-text, #fff);
                text-decoration: none;
                font-size: 1.2rem;
                padding: 0.5rem;
                transition: all 0.3s ease;
                position: relative;
                font-family: var(--font-main, sans-serif);
            }

            .nav-link:hover,
            .nav-link.active {
                color: var(--nav-accent, #f0f);
                text-shadow: 0 0 5px var(--nav-accent, #f0f);
            }

            .nav-link::before {
                content: '';
                position: absolute;
                left: 0;
                bottom: 0;
                width: 0;
                height: 2px;
                background: var(--nav-accent, #f0f);
                transition: width 0.3s ease;
                box-shadow: 0 0 5px var(--nav-accent, #f0f);
            }

            .nav-link:hover::before,
            .nav-link.active::before {
                width: 100%;
            }

            .toggle-container {
                position: fixed !important;
                top: 1rem !important;
                right: 1rem !important;
                z-index: 10000 !important;
                width: 40px;
                height: 40px;
                mix-blend-mode: difference;
            }

            .toggle-button {
                position: absolute !important;
                top: 0 !important;
                left: 0 !important;
                width: 100% !important;
                height: 100% !important;
                background: none;
                border: none;
                cursor: pointer;
                padding: 0;
                z-index: inherit;
            }

            .toggle-icon,
            .toggle-icon::before,
            .toggle-icon::after {
                content: '';
                position: absolute;
                height: 2px;
                width: 24px;
                background: var(--nav-text, #fff);
                transition: all 0.3s ease;
                box-shadow: 0 0 5px var(--nav-text, #fff);
            }

            .toggle-icon {
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }

            .toggle-icon::before {
                top: -8px;
                left: 0;
            }

            .toggle-icon::after {
                bottom: -8px;
                left: 0;
            }

            .toggle-button.active .toggle-icon {
                background: transparent;
                box-shadow: none;
            }

            .toggle-button.active .toggle-icon::before {
                top: 0;
                transform: rotate(45deg);
            }

            .toggle-button.active .toggle-icon::after {
                bottom: 0;
                transform: rotate(-45deg);
            }
        `;
        
        // Create nav structure
        const nav = document.createElement('nav');
        nav.className = 'nav-component';
        
        const content = document.createElement('div');
        content.className = 'nav-content';
        
        // Add links
        const links = [
            { href: 'index.html', text: 'HOME' },
            { href: 'vaporwave.html', text: 'VAPORWAVE' },
            { href: 'brutalist.html', text: 'BRUTALIST' },
            { href: 'zen.html', text: 'ZEN' },
            { href: 'dark-experimental.html', text: 'DARK' },
            { href: 'ethereal.html', text: 'ETHEREAL' },
            { href: 'glitch.html', text: 'GLITCH' },
            { href: 'matrix.html', text: 'MATRIX' },
            { href: 'retro90s.html', text: 'RETRO' },
            { href: 'cyberpunk.html', text: 'CYBERPUNK' }
        ];

        links.forEach(link => {
            const a = document.createElement('a');
            a.href = link.href;
            a.className = 'nav-link';
            a.textContent = link.text;
            
            // Set active link
            const currentPage = window.location.pathname.split('/').pop() || 'index.html';
            if (link.href === currentPage) {
                a.classList.add('active');
            }
            
            content.appendChild(a);
        });

        nav.appendChild(content);

        // Add toggle button
        const toggleContainer = document.createElement('div');
        toggleContainer.className = 'toggle-container';
        
        const toggleButton = document.createElement('button');
        toggleButton.className = 'toggle-button';
        
        const toggleIcon = document.createElement('span');
        toggleIcon.className = 'toggle-icon';
        
        toggleButton.appendChild(toggleIcon);
        toggleContainer.appendChild(toggleButton);

        // Add event listener for toggle
        toggleButton.addEventListener('click', () => {
            toggleButton.classList.toggle('active');
            nav.classList.toggle('active');
        });

        // Add everything to shadow DOM
        this.shadowRoot.appendChild(style);
        this.shadowRoot.appendChild(nav);
        this.shadowRoot.appendChild(toggleContainer);
    }
}

// Register component
customElements.define('nav-sidebar', NavComponent);
