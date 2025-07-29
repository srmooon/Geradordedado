/**
 * DiceEngine - Core logic for generating random dice rolls
 * Uses Crypto.getRandomValues() for cryptographically secure randomness
 * with fallback to Math.random() for older browsers
 */
class DiceEngine {
    constructor() {
        this.usesCrypto = this.checkCryptoSupport();
    }

    /**
     * Check if Crypto.getRandomValues is available
     * @returns {boolean} True if crypto is supported
     */
    checkCryptoSupport() {
        return typeof window !== 'undefined' && 
               window.crypto && 
               typeof window.crypto.getRandomValues === 'function';
    }

    /**
     * Generate a single random number between 1 and sides (inclusive)
     * @param {number} sides - Number of sides on the die (minimum 2)
     * @returns {number} Random number between 1 and sides
     */
    rollSingle(sides) {
        if (!Number.isInteger(sides) || sides < 2) {
            throw new Error(`Invalid number of sides: ${sides}. Must be an integer >= 2`);
        }

        if (this.usesCrypto) {
            return this.rollSingleCrypto(sides);
        } else {
            return this.rollSingleMath(sides);
        }
    }

    /**
     * Generate random number using Crypto.getRandomValues()
     * @param {number} sides - Number of sides on the die
     * @returns {number} Random number between 1 and sides
     */
    rollSingleCrypto(sides) {
        // Use rejection sampling to ensure uniform distribution
        const maxValue = Math.floor(0xFFFFFFFF / sides) * sides;
        let randomValue;
        
        do {
            const array = new Uint32Array(1);
            window.crypto.getRandomValues(array);
            randomValue = array[0];
        } while (randomValue >= maxValue);
        
        return (randomValue % sides) + 1;
    }

    /**
     * Generate random number using Math.random() as fallback
     * @param {number} sides - Number of sides on the die
     * @returns {number} Random number between 1 and sides
     */
    rollSingleMath(sides) {
        return Math.floor(Math.random() * sides) + 1;
    }

    /**
     * Roll multiple dice and return array of results
     * @param {number} quantity - Number of dice to roll (1-20)
     * @param {number} sides - Number of sides on each die
     * @returns {number[]} Array of dice roll results
     */
    rollDice(quantity, sides) {
        if (!Number.isInteger(quantity) || quantity < 1) {
            throw new Error(`Invalid quantity: ${quantity}. Must be an integer >= 1`);
        }

        if (quantity > 20) {
            throw new Error(`Too many dice: ${quantity}. Maximum is 20`);
        }

        const results = [];
        for (let i = 0; i < quantity; i++) {
            results.push(this.rollSingle(sides));
        }

        return results;
    }

    /**
     * Calculate sum of dice roll results
     * @param {number[]} results - Array of dice roll results
     * @returns {number} Sum of all results
     */
    calculateSum(results) {
        if (!Array.isArray(results)) {
            throw new Error('Results must be an array');
        }

        return results.reduce((sum, roll) => {
            if (!Number.isInteger(roll)) {
                throw new Error(`Invalid roll result: ${roll}. Must be an integer`);
            }
            return sum + roll;
        }, 0);
    }

    /**
     * Get information about the random number generator being used
     * @returns {object} Information about RNG
     */
    getRandomInfo() {
        return {
            usesCrypto: this.usesCrypto,
            method: this.usesCrypto ? 'Crypto.getRandomValues()' : 'Math.random()',
            secure: this.usesCrypto
        };
    }
}

// Simple unit tests for DiceEngine
if (typeof window !== 'undefined' && window.location.search.includes('test=true')) {
    console.log('Running DiceEngine tests...');
    
    const engine = new DiceEngine();
    
    // Test single die rolling
    try {
        const result = engine.rollSingle(6);
        console.assert(result >= 1 && result <= 6, 'Single die result out of range');
        console.log('✓ Single die test passed');
    } catch (e) {
        console.error('✗ Single die test failed:', e);
    }
    
    // Test multiple dice rolling
    try {
        const results = engine.rollDice(3, 10);
        console.assert(results.length === 3, 'Wrong number of dice results');
        console.assert(results.every(r => r >= 1 && r <= 10), 'Dice results out of range');
        console.log('✓ Multiple dice test passed');
    } catch (e) {
        console.error('✗ Multiple dice test failed:', e);
    }
    
    // Test sum calculation
    try {
        const sum = engine.calculateSum([1, 2, 3]);
        console.assert(sum === 6, 'Sum calculation incorrect');
        console.log('✓ Sum calculation test passed');
    } catch (e) {
        console.error('✗ Sum calculation test failed:', e);
    }
    
    // Test error handling
    try {
        engine.rollSingle(1);
        console.error('✗ Error handling test failed: should throw for sides < 2');
    } catch (e) {
        console.log('✓ Error handling test passed');
    }
    
    console.log('DiceEngine tests completed');
}