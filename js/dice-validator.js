/**
 * DiceValidator - Validates dice notation and parameters
 * Provides detailed error messages and validation rules
 */
class DiceValidator {
    constructor() {
        this.VALIDATION_RULES = {
            MAX_QUANTITY: 20,
            MIN_QUANTITY: 1,
            MIN_SIDES: 2,
            MAX_SIDES: 1000,
            DICE_PATTERN: /^(\d+)d(\d+)$/i
        };
    }

    /**
     * Validate dice notation string
     * @param {string} notation - Dice notation (e.g., "1d20", "5d10")
     * @returns {object} Validation result with details
     */
    validateDiceNotation(notation) {
        if (typeof notation !== 'string') {
            return {
                isValid: false,
                error: 'Dice notation must be a string',
                errorType: 'invalid_type'
            };
        }

        const cleanNotation = notation.trim().toLowerCase();
        
        if (!cleanNotation) {
            return {
                isValid: false,
                error: 'Dice notation cannot be empty',
                errorType: 'empty_notation'
            };
        }

        const match = cleanNotation.match(this.VALIDATION_RULES.DICE_PATTERN);
        
        if (!match) {
            return {
                isValid: false,
                error: 'Invalid dice notation format. Use format like "1d10" or "5d20"',
                errorType: 'invalid_format',
                suggestion: 'Try formats like: 1d10, 2d6, 5d20'
            };
        }

        const quantity = parseInt(match[1], 10);
        const sides = parseInt(match[2], 10);

        // Validate quantity
        const quantityValidation = this.isValidQuantity(quantity);
        if (!quantityValidation.isValid) {
            return {
                isValid: false,
                error: quantityValidation.error,
                errorType: 'invalid_quantity',
                value: quantity,
                limits: {
                    min: this.VALIDATION_RULES.MIN_QUANTITY,
                    max: this.VALIDATION_RULES.MAX_QUANTITY
                }
            };
        }

        // Validate sides
        const sidesValidation = this.isValidSides(sides);
        if (!sidesValidation.isValid) {
            return {
                isValid: false,
                error: sidesValidation.error,
                errorType: 'invalid_sides',
                value: sides,
                limits: {
                    min: this.VALIDATION_RULES.MIN_SIDES,
                    max: this.VALIDATION_RULES.MAX_SIDES
                }
            };
        }

        return {
            isValid: true,
            quantity: quantity,
            sides: sides,
            notation: `${quantity}d${sides}`
        };
    }

    /**
     * Validate quantity of dice
     * @param {number} quantity - Number of dice to roll
     * @returns {object} Validation result
     */
    isValidQuantity(quantity) {
        if (!Number.isInteger(quantity)) {
            return {
                isValid: false,
                error: 'Quantity must be a whole number'
            };
        }

        if (quantity < this.VALIDATION_RULES.MIN_QUANTITY) {
            return {
                isValid: false,
                error: `Quantity must be at least ${this.VALIDATION_RULES.MIN_QUANTITY}`
            };
        }

        if (quantity > this.VALIDATION_RULES.MAX_QUANTITY) {
            return {
                isValid: false,
                error: `Maximum ${this.VALIDATION_RULES.MAX_QUANTITY} dice allowed`
            };
        }

        return { isValid: true };
    }

    /**
     * Validate number of sides on dice
     * @param {number} sides - Number of sides per die
     * @returns {object} Validation result
     */
    isValidSides(sides) {
        if (!Number.isInteger(sides)) {
            return {
                isValid: false,
                error: 'Number of sides must be a whole number'
            };
        }

        if (sides < this.VALIDATION_RULES.MIN_SIDES) {
            return {
                isValid: false,
                error: `Dice must have at least ${this.VALIDATION_RULES.MIN_SIDES} sides`
            };
        }

        if (sides > this.VALIDATION_RULES.MAX_SIDES) {
            return {
                isValid: false,
                error: `Maximum ${this.VALIDATION_RULES.MAX_SIDES} sides allowed`
            };
        }

        return { isValid: true };
    }

    /**
     * Get validation rules for reference
     * @returns {object} Current validation rules
     */
    getValidationRules() {
        return { ...this.VALIDATION_RULES };
    }

    /**
     * Generate helpful error message with suggestions
     * @param {object} validationResult - Result from validateDiceNotation
     * @returns {string} User-friendly error message
     */
    getErrorMessage(validationResult) {
        if (validationResult.isValid) {
            return '';
        }

        let message = validationResult.error;

        // Add suggestions based on error type
        switch (validationResult.errorType) {
            case 'invalid_format':
                message += '\n\nExemplos válidos:\n• 1d10 (um dado de 10 lados)\n• 5d6 (cinco dados de 6 lados)\n• 2d20 (dois dados de 20 lados)';
                break;
            
            case 'invalid_quantity':
                message += `\n\nQuantidade deve estar entre ${this.VALIDATION_RULES.MIN_QUANTITY} e ${this.VALIDATION_RULES.MAX_QUANTITY}`;
                break;
            
            case 'invalid_sides':
                message += `\n\nNúmero de lados deve estar entre ${this.VALIDATION_RULES.MIN_SIDES} e ${this.VALIDATION_RULES.MAX_SIDES}`;
                break;
        }

        return message;
    }

    /**
     * Validate URL path for dice notation
     * @param {string} path - URL path to validate
     * @returns {object} Validation result with routing info
     */
    validatePath(path) {
        if (typeof path !== 'string') {
            return {
                isValid: false,
                error: 'Path must be a string',
                shouldRedirect: true,
                redirectTo: '/help'
            };
        }

        // Remove leading slash and clean path
        const cleanPath = path.replace(/^\/+/, '').toLowerCase();

        // Handle special paths
        if (!cleanPath || cleanPath === 'home') {
            return {
                isValid: true,
                type: 'home',
                path: '/'
            };
        }

        if (cleanPath === 'help') {
            return {
                isValid: true,
                type: 'help',
                path: '/help'
            };
        }

        // Validate dice notation
        const validation = this.validateDiceNotation(cleanPath);
        
        if (!validation.isValid) {
            return {
                isValid: false,
                error: validation.error,
                errorType: validation.errorType,
                shouldRedirect: true,
                redirectTo: '/help',
                originalPath: path
            };
        }

        return {
            isValid: true,
            type: 'dice',
            path: path,
            quantity: validation.quantity,
            sides: validation.sides,
            notation: validation.notation
        };
    }
}

// Simple tests for DiceValidator
if (typeof window !== 'undefined' && window.location.search.includes('test=true')) {
    console.log('Running DiceValidator tests...');
    
    const validator = new DiceValidator();
    
    // Test valid notation
    const validResult = validator.validateDiceNotation('1d20');
    console.assert(validResult.isValid === true, 'Valid notation should pass');
    console.assert(validResult.quantity === 1, 'Quantity should be parsed correctly');
    console.assert(validResult.sides === 20, 'Sides should be parsed correctly');
    console.log('✓ Valid notation test passed');
    
    // Test invalid format
    const invalidFormat = validator.validateDiceNotation('invalid');
    console.assert(invalidFormat.isValid === false, 'Invalid format should fail');
    console.assert(invalidFormat.errorType === 'invalid_format', 'Should detect format error');
    console.log('✓ Invalid format test passed');
    
    // Test quantity limits
    const tooManyDice = validator.validateDiceNotation('25d10');
    console.assert(tooManyDice.isValid === false, 'Too many dice should fail');
    console.assert(tooManyDice.errorType === 'invalid_quantity', 'Should detect quantity error');
    console.log('✓ Quantity limits test passed');
    
    // Test sides limits
    const tooFewSides = validator.validateDiceNotation('1d1');
    console.assert(tooFewSides.isValid === false, 'Too few sides should fail');
    console.assert(tooFewSides.errorType === 'invalid_sides', 'Should detect sides error');
    console.log('✓ Sides limits test passed');
    
    // Test path validation
    const pathResult = validator.validatePath('/5d10');
    console.assert(pathResult.isValid === true, 'Valid path should pass');
    console.assert(pathResult.type === 'dice', 'Should recognize dice path');
    console.log('✓ Path validation test passed');
    
    console.log('DiceValidator tests completed');
}