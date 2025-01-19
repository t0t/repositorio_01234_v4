class Sidebar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        
        const pages = [
            { name: 'Inicio', url: 'index.html' },
            { name: 'Retro 90s', url: 'retro90s.html' },
            { name: 'Vaporwave', url: 'vaporwave.html' },
            { name: 'Brutalist', url: 'brutalist.html' },
            { name: 'Zen', url: 'zen.html' },
            { name: 'Glitch', url: 'glitch.html' },
            { name: 'Neomorphism', url: 'neomorphism.html' },
            { name: 'Matrix', url: 'matrix.html' },
            { name: 'Memphis', url: 'memphis.html' },
            { name: 'Ethereal', url: 'ethereal.html' },
            { name: 'Cyberpunk', url: 'cyberpunk.html' },
            { name: 'Dark Experimental', url: 'dark-experimental.html' }
        ];

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    --sidebar-bg: rgba(20, 20, 20, 0.95);
                    --text-color: #fff;
                    --hover-color: #00ff00;
                }

                .toggle-btn {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    z-index: 1000;
                    background: transparent;
                    border: 2px solid var(--text-color);
                    color: var(--text-color);
                    padding: 10px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    backdrop-filter: blur(5px);
                }

                .toggle-btn:hover {
                    border-color: var(--hover-color);
                    color: var(--hover-color);
                }

                .sidebar {
                    position: fixed;
                    top: 0;
                    right: -300px;
                    width: 300px;
                    height: 100vh;
                    background: var(--sidebar-bg);
                    transition: right 0.3s ease;
                    z-index: 999;
                    backdrop-filter: blur(10px);
                    padding: 80px 0;
                    box-sizing: border-box;
                }

                .sidebar.active {
                    right: 0;
                }

                .menu {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }

                .menu-item {
                    padding: 15px 30px;
                    transition: all 0.3s ease;
                }

                .menu-item:hover {
                    background: rgba(255, 255, 255, 0.1);
                }

                .menu-link {
                    color: var(--text-color);
                    text-decoration: none;
                    font-family: 'Space Grotesk', sans-serif;
                    font-size: 1.1rem;
                    display: block;
                    transition: color 0.3s ease;
                }

                .menu-link:hover {
                    color: var(--hover-color);
                }

                .menu-item.active .menu-link {
                    color: var(--hover-color);
                }

                @media (max-width: 768px) {
                    .sidebar {
                        width: 100%;
                        right: -100%;
                    }
                }
            </style>

            <button class="toggle-btn">☰</button>
            <nav class="sidebar">
                <ul class="menu">
                    ${pages.map(page => `
                        <li class="menu-item">
                            <a href="${page.url}" class="menu-link">${page.name}</a>
                        </li>
                    `).join('')}
                </ul>
            </nav>
        `;

        this.toggleBtn = this.shadowRoot.querySelector('.toggle-btn');
        this.sidebar = this.shadowRoot.querySelector('.sidebar');
        
        this.toggleBtn.addEventListener('click', () => {
            this.sidebar.classList.toggle('active');
        });

        // Cerrar el sidebar al hacer clic fuera
        document.addEventListener('click', (e) => {
            if (!this.contains(e.target) && this.sidebar.classList.contains('active')) {
                this.sidebar.classList.remove('active');
            }
        });

        // Marcar la página actual como activa
        const currentPath = window.location.pathname;
        const currentMenuItem = this.shadowRoot.querySelector(`a[href$="${currentPath}"]`);
        if (currentMenuItem) {
            currentMenuItem.parentElement.classList.add('active');
        }
    }
}

customElements.define('nav-sidebar', Sidebar);
