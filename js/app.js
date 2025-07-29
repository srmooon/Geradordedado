/**
 * App - Main application controller
 * Coordinates all components and manages application state
 */
class App {
    constructor() {
        this.diceEngine = null;
        this.diceValidator = null;
        this.diceRouter = null;
        this.uiController = null;
        this.isInitialized = false;
        
        this.initializeApp();
    }

    /**
     * Initialize the application and all components
     */
    async initializeApp() {
        try {
            // Initialize components
            this.diceEngine = new DiceEngine();
            this.diceValidator = new DiceValidator();
            this.diceRouter = new DiceRouter();
            this.uiController = new UIController();

            // Set up event listeners
            this.setupEventListeners();

            // Handle initial route
            this.handleInitialRoute();

            this.isInitialized = true;
            console.log('Dice Generator App initialized successfully');
            
        } catch (error) {
            console.error('Failed to initialize app:', error);
            this.handleInitializationError(error);
        }
    }

    /**
     * Set up event listeners for the application
     */
    setupEventListeners() {
        // Listen for route changes
        this.diceRouter.onRouteChange((route) => {
            this.handleRouteChange(route);
        });

        // Handle navigation clicks
        document.addEventListener('click', (event) => {
            const link = event.target.closest('a[href]');
            if (link && this.isInternalLink(link.href)) {
                event.preventDefault();
                this.diceRouter.navigate(link.getAttribute('href'));
            }
        });

        // Handle browser errors
        window.addEventListener('error', (event) => {
            console.error('Application error:', event.error);
            this.handleRuntimeError(event.error);
        });

        // Handle unhandled promise rejections
        window.addEventListener('unhandledrejection', (event) => {
            console.error('Unhandled promise rejection:', event.reason);
            this.handleRuntimeError(event.reason);
        });
    }

    /**
     * Handle initial route when app loads
     */
    handleInitialRoute() {
        const currentRoute = this.diceRouter.getCurrentRoute();
        if (currentRoute) {
            this.handleRouteChange(currentRoute);
        }
    }

    /**
     * Handle route changes and render appropriate content
     * @param {object} route - Route information from router
     */
    async handleRouteChange(route) {
        try {
            this.uiController.showLoading();

            switch (route.type) {
                case 'home':
                    this.uiController.renderHomePage();
                    break;

                case 'help':
                    this.uiController.renderHelpPage();
                    break;

                case 'dice':
                    if (route.isValid) {
                        await this.handleDiceRoll(route);
                    } else {
                        this.handleInvalidRoute(route);
                    }
                    break;

                case 'error':
                default:
                    this.handleInvalidRoute(route);
                    break;
            }

        } catch (error) {
            console.error('Error handling route change:', error);
            this.uiController.renderError('Erro interno do sistema. Tente novamente.');
        } finally {
            this.uiController.hideLoading();
        }
    }

    /**
     * Handle dice rolling for valid dice routes
     * @param {object} route - Valid dice route information
     */
    async handleDiceRoll(route) {
        try {
            const startTime = performance.now();

            // Generate dice rolls
            const rolls = this.diceEngine.rollDice(route.quantity, route.sides);
            const sum = this.diceEngine.calculateSum(rolls);

            // Create result object
            const result = {
                config: {
                    quantity: route.quantity,
                    sides: route.sides,
                    notation: route.notation
                },
                rolls: rolls,
                sum: sum,
                timestamp: new Date()
            };

            // Render results
            this.uiController.renderDiceResults(route.notation, rolls, sum);

            // Log performance
            const endTime = performance.now();
            const duration = endTime - startTime;
            
            if (duration > 2000) {
                console.warn(`Dice roll took ${duration.toFixed(2)}ms - exceeds 2s requirement`);
            }

            // Log result for debugging
            console.log('Dice roll result:', result);

        } catch (error) {
            console.error('Error rolling dice:', error);
            this.uiController.renderError('Erro ao gerar dados. Tente novamente.');
        }
    }

    /**
     * Handle invalid routes
     * @param {object} route - Invalid route information
     */
    handleInvalidRoute(route) {
        const errorMessage = route.error || 'URL inválida';
        this.uiController.renderError(errorMessage, route.errorType);
        
        // Optionally redirect to help after showing error
        if (route.shouldRedirect) {
            setTimeout(() => {
                this.diceRouter.navigate('/help');
            }, 3000);
        }
    }

    /**
     * Check if a URL is an internal link
     * @param {string} href - URL to check
     * @returns {boolean} True if internal link
     */
    isInternalLink(href) {
        try {
            const url = new URL(href, window.location.origin);
            return url.origin === window.location.origin;
        } catch {
            return false;
        }
    }

    /**
     * Handle initialization errors
     * @param {Error} error - Initialization error
     */
    handleInitializationError(error) {
        const errorHTML = `
            <div class="error-page">
                <div class="error-message">
                    <h2>❌ Erro de Inicialização</h2>
                    <p>Falha ao inicializar o aplicativo. Recarregue a página.</p>
                    <button onclick="window.location.reload()">Recarregar</button>
                </div>
            </div>
        `;
        
        const container = document.getElementById('app-content');
        if (container) {
            container.innerHTML = errorHTML;
        }
    }

    /**
     * Handle runtime errors
     * @param {Error} error - Runtime error
     */
    handleRuntimeError(error) {
        if (this.uiController && this.isInitialized) {
            this.uiController.renderError('Erro inesperado. Tente recarregar a página.');
        }
    }

    /**
     * Get application status and information
     * @returns {object} App status information
     */
    getStatus() {
        return {
            initialized: this.isInitialized,
            currentRoute: this.diceRouter ? this.diceRouter.getCurrentRoute() : null,
            randomInfo: this.diceEngine ? this.diceEngine.getRandomInfo() : null,
            timestamp: new Date()
        };
    }

    /**
     * Manually trigger a dice roll (for testing/debugging)
     * @param {string} notation - Dice notation (e.g., "1d20")
     * @returns {object} Roll result
     */
    rollDice(notation) {
        if (!this.isInitialized) {
            throw new Error('App not initialized');
        }

        const validation = this.diceValidator.validateDiceNotation(notation);
        if (!validation.isValid) {
            throw new Error(validation.error);
        }

        const rolls = this.diceEngine.rollDice(validation.quantity, validation.sides);
        const sum = this.diceEngine.calculateSum(rolls);

        return {
            notation: validation.notation,
            rolls: rolls,
            sum: sum,
            timestamp: new Date()
        };
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.diceApp = new App();
});

// Simple tests for App
if (typeof window !== 'undefined' && window.location.search.includes('test=true')) {
    console.log('Running App integration tests...');
    
    // Wait for DOM to be ready
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
            if (window.diceApp) {
                const status = window.diceApp.getStatus();
                console.assert(status.initialized === true, 'App should be initialized');
                console.log('✓ App initialization test passed');
                
                try {
                    const result = window.diceApp.rollDice('1d6');
                    console.assert(result.rolls.length === 1, 'Should roll one die');
                    console.assert(result.rolls[0] >= 1 && result.rolls[0] <= 6, 'Result should be in range');
                    console.log('✓ Manual dice roll test passed');
                } catch (e) {
                    console.error('✗ Manual dice roll test failed:', e);
                }
                
                console.log('App integration tests completed');
            }
        }, 1000);
    });
}