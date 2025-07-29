# Product Overview

This is a **Dice Generator** (Gerador de Dados RPG) - a simple HTML-based web application that generates random numbers simulating RPG dice through dynamic URLs.

## Core Purpose
- Generate cryptographically secure random dice rolls via URL patterns like `/1d20`, `/5d10`
- Optimized specifically for AI consumption with semantic HTML structure
- Provides instant dice rolling without forms or user interaction

## Key Features
- **URL-based dice rolling**: Access `/[quantity]d[sides]` to generate dice automatically
- **Semantic HTML output**: Structured specifically for AI parsing with data attributes
- **Cryptographically secure randomness**: Uses `Crypto.getRandomValues()` with `Math.random()` fallback
- **Performance guarantee**: Response time under 2 seconds
- **Wide dice support**: 1-20 dice, 2-1000 sides per die

## Target Users
- AI systems that need to generate dice rolls
- RPG players and game masters
- Developers integrating dice functionality

## Language
The application is primarily in **Portuguese (pt-BR)** with some English technical terms.