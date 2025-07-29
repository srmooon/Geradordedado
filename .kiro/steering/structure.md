# Project Structure

## File Organization
```
/
├── index.html          # Main HTML entry point
├── styles.css          # Global CSS styles
├── js/                 # JavaScript components
│   ├── app.js          # Main application controller
│   ├── dice-engine.js  # Random number generation
│   ├── dice-router.js  # URL routing and parsing
│   ├── dice-validator.js # Input validation
│   └── ui-controller.js # DOM manipulation
├── _redirects          # Netlify SPA routing rules
├── netlify.toml        # Netlify deployment config
└── README.md           # Project documentation
```

## Component Loading Order
JavaScript files must be loaded in this specific order in `index.html`:
1. `dice-engine.js` - Core functionality
2. `dice-validator.js` - Validation logic
3. `dice-router.js` - Routing system
4. `ui-controller.js` - UI management
5. `app.js` - Main coordinator (loads last)

## Key Conventions

### File Naming
- Use kebab-case for JavaScript files (`dice-engine.js`)
- Component classes use PascalCase (`DiceEngine`)
- CSS uses kebab-case for classes (`.dice-result`)

### HTML Structure
- Main content container: `#app-content`
- Dice results container: `#dice-result`
- Navigation: `.navigation` with `.nav-links`

### CSS Organization
- Global styles in single `styles.css` file
- Component-specific styles grouped by functionality
- Responsive design with mobile-first approach

### JavaScript Architecture
- Each component is a standalone ES6 class
- No module system - relies on global scope
- Components communicate through the main `App` controller
- Error handling at component and application level

### URL Structure
- Home: `/`
- Dice rolls: `/{quantity}d{sides}` (e.g., `/1d20`, `/5d10`)
- Help page: `/help`
- All routes serve `index.html` via client-side routing

### Data Attributes
Use semantic data attributes for AI parsing:
- `data-result` - Primary result value
- `data-roll` - Individual dice roll values
- CSS classes: `.result-primary`, `.roll`, `.dice-type`