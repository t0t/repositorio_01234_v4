class ContentLoader {
    constructor() {
        this.content = {
            conceptos_fundamentales: [],
            estados_mentales: [],
            elementos_misticos: [],
            procesos_creativos: []
        };
    }

    async loadContent() {
        try {
            const [tagsResponse, dbResponse] = await Promise.all([
                fetch('/tags.md'),
                fetch('/db.md')
            ]);

            const tagsText = await tagsResponse.text();
            const dbText = await dbResponse.text();

            // Procesar tags.md
            const lines = tagsText.split('\n');
            lines.forEach(line => {
                const words = line.trim().split(' ');
                words.forEach(word => {
                    if (word.length > 0) {
                        // Distribuir palabras entre las categorías
                        const rand = Math.random();
                        if (rand < 0.25) {
                            this.content.conceptos_fundamentales.push(word);
                        } else if (rand < 0.5) {
                            this.content.estados_mentales.push(word);
                        } else if (rand < 0.75) {
                            this.content.elementos_misticos.push(word);
                        } else {
                            this.content.procesos_creativos.push(word);
                        }
                    }
                });
            });

            return this.content;
        } catch (error) {
            console.error('Error loading content:', error);
            return this.content;
        }
    }

    getRandomContent(section, count = 1) {
        const content = this.content[section] || [];
        if (!content || content.length === 0) return [];

        const results = [];
        const maxCount = Math.min(count, content.length);
        
        while (results.length < maxCount) {
            const randomIndex = Math.floor(Math.random() * content.length);
            const word = content[randomIndex];
            if (!results.includes(word)) {
                results.push(word);
            }
        }

        return results;
    }
}

// Exportar para uso global
window.ContentLoader = ContentLoader;
