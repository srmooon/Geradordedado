/**
 * UIController - Manages UI rendering and user interactions
 * Creates semantic HTML structure optimized for AI parsing
 */
class UIController {
    constructor() {
        this.contentContainer = null;
        this.navigationLinks = null;
        this.initializeUI();
    }

    /**
     * Initialize UI controller and get DOM references
     */
    initializeUI() {
        this.contentContainer = document.getElementById('app-content');
        this.navigationLinks = document.querySelectorAll('.nav-link');
        
        if (!this.contentContainer) {
            console.error('Content container not found');
        }
    }

    /**
     * Render the home page with instructions and examples
     */
    renderHomePage() {
        const homeHTML = `
            <div class="home-page">
                <h1>🎲 Gerador de Dados RPG</h1>
                <p>Gere números aleatórios usando notação padrão de dados de RPG através de URLs simples.</p>
                
                <div class="examples">
                    <h2>Como usar</h2>
                    <p>Acesse URLs no formato <code>/[quantidade]d[lados]</code> para gerar dados:</p>
                    
                    <div class="example-links">
                        <a href="/1d10" class="example-link">
                            <strong>1d10</strong><br>
                            Um dado de 10 lados
                        </a>
                        <a href="/1d20" class="example-link">
                            <strong>1d20</strong><br>
                            Um dado de 20 lados
                        </a>
                        <a href="/1d100" class="example-link">
                            <strong>1d100</strong><br>
                            Um dado de 100 lados
                        </a>
                        <a href="/2d6" class="example-link">
                            <strong>2d6</strong><br>
                            Dois dados de 6 lados
                        </a>
                        <a href="/5d10" class="example-link">
                            <strong>5d10</strong><br>
                            Cinco dados de 10 lados
                        </a>
                        <a href="/3d20" class="example-link">
                            <strong>3d20</strong><br>
                            Três dados de 20 lados
                        </a>
                    </div>
                </div>

                <div class="examples">
                    <h2>Especificações</h2>
                    <ul>
                        <li><strong>Quantidade:</strong> 1 a 20 dados</li>
                        <li><strong>Lados:</strong> 2 a 1000 lados por dado</li>
                        <li><strong>Formato:</strong> /[quantidade]d[lados]</li>
                        <li><strong>Aleatoriedade:</strong> Criptograficamente segura</li>
                    </ul>
                </div>

                <div class="examples">
                    <h2>Para IA</h2>
                    <p>Este site foi otimizado para análise por IA:</p>
                    <ul>
                        <li>Resultados principais em <code>data-result</code></li>
                        <li>Resultados individuais em <code>data-roll</code></li>
                        <li>Estrutura HTML semântica consistente</li>
                        <li>IDs e classes CSS específicas</li>
                    </ul>
                </div>
            </div>
        `;

        this.updateContent(homeHTML);
        this.updateNavigation('/');
    }

    /**
     * Render dice results with semantic HTML for AI parsing
     * @param {string} diceType - Type of dice (e.g., "1d20", "5d10")
     * @param {number[]} results - Array of dice roll results
     * @param {number} sum - Sum of all results
     */
    renderDiceResults(diceType, results, sum) {
        let resultsHTML;

        if (results.length === 1) {
            // Single die result
            resultsHTML = `
                <main id="dice-result">
                    <div class="dice-type">${diceType}</div>
                    <div class="result-primary" data-result="${results[0]}">${results[0]}</div>
                    <p><a href="/">← Voltar ao início</a></p>
                </main>
            `;
        } else {
            // Multiple dice results
            const individualRolls = results.map(roll => 
                `<span class="roll" data-roll="${roll}">${roll}</span>`
            ).join('');

            resultsHTML = `
                <main id="dice-result">
                    <div class="dice-type">${diceType}</div>
                    <div class="results-individual">
                        ${individualRolls}
                    </div>
                    <div class="sum-label">Total:</div>
                    <div class="result-primary" data-result="${sum}">${sum}</div>
                    <p><a href="/">← Voltar ao início</a></p>
                </main>
            `;
        }

        this.updateContent(resultsHTML);
        this.updateNavigation(window.location.pathname);
    }

    /**
     * Render error page with helpful information
     * @param {string} message - Error message to display
     * @param {string} errorType - Type of error for specific handling
     */
    renderError(message, errorType = 'general') {
        const errorHTML = `
            <div class="error-page">
                <div class="error-message">
                    <h2>❌ Erro</h2>
                    <p>${message}</p>
                </div>
                
                <div class="examples">
                    <h2>Formatos válidos</h2>
                    <p>Use URLs no formato <code>/[quantidade]d[lados]</code>:</p>
                    <div class="example-links">
                        <a href="/1d10" class="example-link">1d10</a>
                        <a href="/1d20" class="example-link">1d20</a>
                        <a href="/2d6" class="example-link">2d6</a>
                        <a href="/5d10" class="example-link">5d10</a>
                    </div>
                </div>

                <p><a href="/">← Voltar ao início</a></p>
            </div>
        `;

        this.updateContent(errorHTML);
        this.updateNavigation('/help');
    }

    /**
     * Render help page with comprehensive documentation
     */
    renderHelpPage() {
        const helpHTML = `
            <div class="help-page">
                <h1>📖 Ajuda - Gerador de Dados RPG</h1>
                
                <h2>Como usar</h2>
                <p>Este site gera números aleatórios usando notação padrão de dados de RPG através de URLs simples.</p>
                
                <h2>Formato de URL</h2>
                <p>Use o formato: <code>/[quantidade]d[lados]</code></p>
                <ul>
                    <li><strong>quantidade:</strong> Número de dados a rolar (1-20)</li>
                    <li><strong>lados:</strong> Número de lados em cada dado (2-1000)</li>
                </ul>

                <h2>Exemplos</h2>
                <ul>
                    <li><code>/1d10</code> - Um dado de 10 lados</li>
                    <li><code>/1d20</code> - Um dado de 20 lados</li>
                    <li><code>/2d6</code> - Dois dados de 6 lados</li>
                    <li><code>/5d10</code> - Cinco dados de 10 lados</li>
                    <li><code>/1d100</code> - Um dado de 100 lados</li>
                </ul>

                <h2>Limites</h2>
                <ul>
                    <li><strong>Quantidade mínima:</strong> 1 dado</li>
                    <li><strong>Quantidade máxima:</strong> 20 dados</li>
                    <li><strong>Lados mínimos:</strong> 2 lados</li>
                    <li><strong>Lados máximos:</strong> 1000 lados</li>
                </ul>

                <h2>Para desenvolvedores e IA</h2>
                <p>O HTML gerado segue uma estrutura semântica específica:</p>
                <ul>
                    <li><code>#dice-result</code> - Container principal dos resultados</li>
                    <li><code>.result-primary</code> - Resultado principal ou soma total</li>
                    <li><code>data-result</code> - Atributo com valor numérico principal</li>
                    <li><code>.roll</code> - Resultados individuais de cada dado</li>
                    <li><code>data-roll</code> - Atributo com valor de cada dado individual</li>
                </ul>

                <h2>Aleatoriedade</h2>
                <p>O sistema usa <code>Crypto.getRandomValues()</code> para aleatoriedade criptograficamente segura, 
                com fallback para <code>Math.random()</code> em navegadores mais antigos.</p>

                <div class="example-links">
                    <a href="/1d10" class="example-link">Testar 1d10</a>
                    <a href="/1d20" class="example-link">Testar 1d20</a>
                    <a href="/5d6" class="example-link">Testar 5d6</a>
                </div>

                <p><a href="/">← Voltar ao início</a></p>
            </div>
        `;

        this.updateContent(helpHTML);
        this.updateNavigation('/help');
    }

    /**
     * Update the main content area
     * @param {string} html - HTML content to display
     */
    updateContent(html) {
        if (this.contentContainer) {
            this.contentContainer.innerHTML = html;
        }
    }

    /**
     * Update navigation highlighting
     * @param {string} currentPath - Current URL path
     */
    updateNavigation(currentPath) {
        if (!this.navigationLinks) return;

        this.navigationLinks.forEach(link => {
            link.classList.remove('active');
            
            const linkPath = new URL(link.href).pathname;
            if (linkPath === currentPath) {
                link.classList.add('active');
            }
        });
    }

    /**
     * Show loading state
     */
    showLoading() {
        if (this.contentContainer) {
            this.contentContainer.classList.add('loading');
        }
    }

    /**
     * Hide loading state
     */
    hideLoading() {
        if (this.contentContainer) {
            this.contentContainer.classList.remove('loading');
        }
    }

    /**
     * Create semantic HTML element for dice results
     * @param {object} result - Dice result object
     * @returns {HTMLElement} Created element
     */
    createSemanticHTML(result) {
        const container = document.createElement('main');
        container.id = 'dice-result';

        const diceType = document.createElement('div');
        diceType.className = 'dice-type';
        diceType.textContent = result.notation;
        container.appendChild(diceType);

        if (result.rolls.length === 1) {
            // Single die
            const resultElement = document.createElement('div');
            resultElement.className = 'result-primary';
            resultElement.setAttribute('data-result', result.rolls[0]);
            resultElement.textContent = result.rolls[0];
            container.appendChild(resultElement);
        } else {
            // Multiple dice
            const individualContainer = document.createElement('div');
            individualContainer.className = 'results-individual';
            
            result.rolls.forEach(roll => {
                const rollElement = document.createElement('span');
                rollElement.className = 'roll';
                rollElement.setAttribute('data-roll', roll);
                rollElement.textContent = roll;
                individualContainer.appendChild(rollElement);
            });
            
            container.appendChild(individualContainer);

            const sumLabel = document.createElement('div');
            sumLabel.className = 'sum-label';
            sumLabel.textContent = 'Total:';
            container.appendChild(sumLabel);

            const sumElement = document.createElement('div');
            sumElement.className = 'result-primary';
            sumElement.setAttribute('data-result', result.sum);
            sumElement.textContent = result.sum;
            container.appendChild(sumElement);
        }

        return container;
    }
}

// Simple tests for UIController
if (typeof window !== 'undefined' && window.location.search.includes('test=true')) {
    console.log('Running UIController tests...');
    
    // Create a test container
    const testContainer = document.createElement('div');
    testContainer.id = 'app-content';
    document.body.appendChild(testContainer);
    
    const ui = new UIController();
    
    // Test home page rendering
    ui.renderHomePage();
    const homeContent = testContainer.innerHTML;
    console.assert(homeContent.includes('Gerador de Dados RPG'), 'Home page should render');
    console.log('✓ Home page rendering test passed');
    
    // Test dice results rendering
    ui.renderDiceResults('1d20', [15], 15);
    const diceContent = testContainer.innerHTML;
    console.assert(diceContent.includes('data-result="15"'), 'Dice result should have data attribute');
    console.log('✓ Dice results rendering test passed');
    
    // Test error rendering
    ui.renderError('Test error message');
    const errorContent = testContainer.innerHTML;
    console.assert(errorContent.includes('Test error message'), 'Error message should render');
    console.log('✓ Error rendering test passed');
    
    // Clean up
    document.body.removeChild(testContainer);
    
    console.log('UIController tests completed');
}