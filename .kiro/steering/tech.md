# Technology Stack

## Core Technologies
- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Deployment**: Netlify static hosting
- **Routing**: Client-side routing using History API

## Architecture Pattern
- **Single Page Application (SPA)** with component-based architecture
- **No build system** - direct HTML/CSS/JS files
- **No external dependencies** - pure vanilla JavaScript

## Key Libraries & APIs
- `Crypto.getRandomValues()` for secure randomness (with `Math.random()` fallback)
- History API for client-side routing
- No external frameworks or libraries

## Component Structure
The application follows a modular component pattern:
- `App` - Main application controller and coordinator
- `DiceEngine` - Core random number generation logic
- `DiceRouter` - URL parsing and routing management
- `DiceValidator` - Input validation and parameter checking
- `UIController` - DOM manipulation and rendering

## Development Commands

### Local Development
```bash
# Serve files locally using Python
python -m http.server 8000

# Alternative: Use Node.js serve
npx serve .

# Access at http://localhost:8000
```

### Testing
- Add `?test=true` to any URL to run integrated unit tests
- Tests run automatically in browser console
- No separate test runner required

### Deployment
- **Automatic deployment** via Netlify Git integration
- **No build step** required - direct file serving
- Configuration handled by `netlify.toml` and `_redirects`

## Performance Requirements
- **Response time**: Must be under 2 seconds
- **Randomness**: Cryptographically secure when possible
- **Browser support**: Modern browsers with fallback for older ones