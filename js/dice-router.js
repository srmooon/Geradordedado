/**
 * DiceRouter - Handles URL routing and parsing for dice notation
 * Supports URLs like /1d10, /5d20, etc.
 */
class DiceRouter {
    constructor() {
        this.currentRoute = null;
        this.routeChangeCallbacks = [];
        this.initializeRouter();
    }

    /**
     * Initialize the router and set up event listeners
     */
    initializeRouter() {
        // Handle browser back/forward buttons
        window.addEventListener('popstate', (event) => {
            this.handleRouteChange();
        });

        // Handle initial page load
        this.handleRouteChange();
    }

    /**
     * Parse a URL path and extract dice configuration
     * @param {string} path - URL path (e.g., "/5d10")
     * @returns {object} Parsed route information
     */
    parseRoute(path) {
        // Remove leading slash and convert to lowercase
        const cleanPath = path.replace(/^\/+/, '').toLowerCase();
        
        // Handle empty path (home page)
        if (!cleanPath) {
            return {
                type: 'home',
                isValid: true,
                path: '/'
            };
        }

        // Handle help page
        if (cleanPath === 'help') {
            return {
                type: 'help',
                isValid: true,
                path: '/help'
            };
        }

        // Parse dice notation (e.g., "1d10", "5d20")
        const dicePattern = /^(\d+)d(\d+)$/;
        const match = cleanPath.match(dicePattern);

        if (!match) {
            return {
                type: 'error',
                isValid: false,
                path: path,
                error: 'Invalid dice notation format. Use format like "1d10" or "5d20"'
            };
        }

        const quantity = parseInt(match[1], 10);
        const sides = parseInt(match[2], 10);

        // Validate parsed values
        const validation = this.validateDiceParams(quantity, sides);
        if (!validation.isValid) {
            return {
                type: 'error',
                isValid: false,
                path: path,
                error: validation.error,
                quantity: quantity,
                sides: sides
            };
        }

        return {
            type: 'dice',
            isValid: true,
            path: path,
            quantity: quantity,
            sides: sides,
            notation: `${quantity}d${sides}`
        };
    }

    /**
     * Validate dice parameters
     * @param {number} quantity - Number of dice
     * @param {number} sides - Number of sides per die
     * @returns {object} Validation result
     */
    validateDiceParams(quantity, sides) {
        if (quantity < 1) {
            return {
                isValid: false,
                error: 'Quantity must be at least 1'
            };
        }

        if (quantity > 20) {
            return {
                isValid: false,
                error: 'Maximum 20 dice allowed'
            };
        }

        if (sides < 2) {
            return {
                isValid: false,
                error: 'Dice must have at least 2 sides'
            };
        }

        if (sides > 1000) {
            return {
                isValid: false,
                error: 'Maximum 1000 sides allowed'
            };
        }

        return { isValid: true };
    }

    /**
     * Navigate to a new route
     * @param {string} path - Path to navigate to
     * @param {boolean} pushState - Whether to add to browser history
     */
    navigate(path, pushState = true) {
        if (pushState && path !== window.location.pathname) {
            window.history.pushState(null, '', path);
        }
        this.handleRouteChange();
    }

    /**
     * Handle route changes and notify callbacks
     */
    handleRouteChange() {
        const currentPath = window.location.pathname;
        const newRoute = this.parseRoute(currentPath);
        
        // Update current route
        this.currentRoute = newRoute;
        
        // Notify all registered callbacks
        this.routeChangeCallbacks.forEach(callback => {
            try {
                callback(newRoute);
            } catch (error) {
                console.error('Error in route change callback:', error);
            }
        });
    }

    /**
     * Register a callback for route changes
     * @param {function} callback - Function to call when route changes
     */
    onRouteChange(callback) {
        if (typeof callback === 'function') {
            this.routeChangeCallbacks.push(callback);
        }
    }

    /**
     * Remove a route change callback
     * @param {function} callback - Callback to remove
     */
    offRouteChange(callback) {
        const index = this.routeChangeCallbacks.indexOf(callback);
        if (index > -1) {
            this.routeChangeCallbacks.splice(index, 1);
        }
    }

    /**
     * Get the current route information
     * @returns {object} Current route data
     */
    getCurrentRoute() {
        return this.currentRoute;
    }

    /**
     * Check if a path represents a dice roll
     * @param {string} path - Path to check
     * @returns {boolean} True if path is a dice notation
     */
    isDiceRoute(path) {
        const route = this.parseRoute(path);
        return route.type === 'dice' && route.isValid;
    }

    /**
     * Generate a URL for dice notation
     * @param {number} quantity - Number of dice
     * @param {number} sides - Number of sides
     * @returns {string} Generated URL path
     */
    generateDiceUrl(quantity, sides) {
        return `/${quantity}d${sides}`;
    }
}

// Simple tests for DiceRouter
if (typeof window !== 'undefined' && window.location.search.includes('test=true')) {
    console.log('Running DiceRouter tests...');
    
    const router = new DiceRouter();
    
    // Test valid dice notation parsing
    const validRoute = router.parseRoute('/1d20');
    console.assert(validRoute.isValid === true, 'Valid route should be valid');
    console.assert(validRoute.quantity === 1, 'Quantity should be 1');
    console.assert(validRoute.sides === 20, 'Sides should be 20');
    console.log('✓ Valid dice notation test passed');
    
    // Test invalid dice notation
    const invalidRoute = router.parseRoute('/invalid');
    console.assert(invalidRoute.isValid === false, 'Invalid route should be invalid');
    console.log('✓ Invalid dice notation test passed');
    
    // Test home route
    const homeRoute = router.parseRoute('/');
    console.assert(homeRoute.type === 'home', 'Home route should be recognized');
    console.log('✓ Home route test passed');
    
    // Test parameter validation
    const tooManyDice = router.parseRoute('/25d10');
    console.assert(tooManyDice.isValid === false, 'Too many dice should be invalid');
    console.log('✓ Parameter validation test passed');
    
    console.log('DiceRouter tests completed');
}