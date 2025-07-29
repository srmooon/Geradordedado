# Design Document

## Overview

O sistema será implementado como uma Single Page Application (SPA) em HTML/CSS/JavaScript que utiliza roteamento client-side para interpretar URLs no formato de notação de dados de RPG. O sistema processará URLs como `/1d10`, `/5d20`, `/1d100` e gerará automaticamente os resultados correspondentes a cada visita.

## Architecture

### Client-Side Architecture
- **Frontend**: HTML5, CSS3, JavaScript vanilla (sem frameworks externos)
- **Roteamento**: JavaScript History API para gerenciar URLs dinâmicas
- **Geração de números**: Crypto.getRandomValues() para aleatoriedade criptograficamente segura
- **Estrutura**: Arquitetura modular com separação de responsabilidades

### URL Structure
```
/                    -> Página inicial com instruções
/[quantidade]d[lados] -> Gerador de dados específico
/help               -> Página de ajuda (fallback para URLs inválidas)
```

### Core Modules
1. **Router Module**: Gerencia navegação e parsing de URLs
2. **Dice Engine**: Lógica de geração de números aleatórios
3. **UI Controller**: Gerencia renderização e interações
4. **Validator**: Valida formatos de dados e parâmetros

## Components and Interfaces

### 1. Router Component
```javascript
class DiceRouter {
  // Gerencia roteamento e parsing de URLs
  parseRoute(path) -> {quantity, sides, isValid}
  navigate(path) -> void
  handleRouteChange() -> void
}
```

**Responsabilidades:**
- Interpretar URLs no formato `/[quantidade]d[lados]`
- Validar parâmetros de entrada
- Gerenciar histórico de navegação
- Redirecionar URLs inválidas

### 2. Dice Engine Component
```javascript
class DiceEngine {
  // Core logic para geração de dados
  rollDice(quantity, sides) -> Array<number>
  rollSingle(sides) -> number
  calculateSum(results) -> number
}
```

**Responsabilidades:**
- Gerar números aleatórios usando Crypto.getRandomValues()
- Garantir distribuição uniforme
- Suportar múltiplos dados
- Calcular somas totais

### 3. UI Controller Component
```javascript
class UIController {
  // Gerencia interface e renderização
  renderHomePage() -> void
  renderDiceResults(diceType, results, sum) -> void
  renderError(message) -> void
  updateNavigation(currentRoute) -> void
  createSemanticHTML(result) -> HTMLElement
}
```

**Responsabilidades:**
- Renderizar diferentes estados da aplicação
- Criar HTML semântico com data attributes para IA
- Garantir que o resultado principal seja facilmente identificável
- Gerenciar navegação visual
- Mostrar mensagens de erro com estrutura consistente

### 4. Validator Component
```javascript
class DiceValidator {
  // Validação de entrada
  validateDiceNotation(quantity, sides) -> {isValid, error}
  isValidQuantity(quantity) -> boolean
  isValidSides(sides) -> boolean
}
```

**Responsabilidades:**
- Validar formato de notação de dados
- Verificar limites (quantidade ≤ 20, lados ≥ 2)
- Retornar mensagens de erro específicas

## Data Models

### Dice Configuration
```javascript
interface DiceConfig {
  quantity: number;    // 1-20
  sides: number;       // ≥ 2
  notation: string;    // "5d10"
}
```

### Dice Result
```javascript
interface DiceResult {
  config: DiceConfig;
  rolls: number[];     // Resultados individuais
  sum: number;         // Soma total
  timestamp: Date;     // Para debugging
}
```

### Route State
```javascript
interface RouteState {
  path: string;        // URL atual
  isValid: boolean;    // URL válida
  diceConfig?: DiceConfig;
  error?: string;
}
```

## Error Handling

### URL Parsing Errors
- **Formato inválido**: Redireciona para `/help` com explicação
- **Parâmetros não numéricos**: Mostra erro específico
- **Valores fora do limite**: Exibe limites permitidos

### Runtime Errors
- **Falha na geração de números**: Fallback para Math.random()
- **Erro de renderização**: Exibe página de erro genérica
- **Problemas de navegação**: Reset para página inicial

### Validation Rules
```javascript
const VALIDATION_RULES = {
  MAX_QUANTITY: 20,
  MIN_SIDES: 2,
  MAX_SIDES: 1000,
  ALLOWED_PATTERNS: /^(\d+)d(\d+)$/
};
```

## Testing Strategy

### Unit Tests
1. **DiceEngine Tests**
   - Verificar distribuição uniforme de números
   - Testar limites de quantidade e lados
   - Validar cálculos de soma

2. **Router Tests**
   - Parsing correto de URLs válidas
   - Handling de URLs inválidas
   - Navegação entre rotas

3. **Validator Tests**
   - Validação de formatos corretos
   - Rejeição de formatos inválidos
   - Mensagens de erro apropriadas

### Integration Tests
1. **End-to-End Flow**
   - Navegação completa entre páginas
   - Geração de dados em diferentes cenários
   - Handling de erros em fluxo completo

2. **Browser Compatibility**
   - Testes em Chrome, Firefox, Safari
   - Verificação de APIs modernas (Crypto, History)
   - Fallbacks para navegadores antigos

### Performance Tests
1. **Load Testing**
   - Geração rápida de múltiplos dados
   - Navegação fluida entre rotas
   - Tempo de resposta < 2 segundos

2. **Memory Testing**
   - Verificar vazamentos de memória
   - Limpeza adequada de event listeners
   - Otimização de DOM updates

## Implementation Notes

### Security Considerations
- Usar `Crypto.getRandomValues()` para aleatoriedade segura
- Sanitizar todas as entradas de URL
- Evitar eval() ou execução de código dinâmico

### Performance Optimizations
- Lazy loading de componentes não essenciais
- Debounce em navegação rápida
- Minimal DOM manipulation

### HTML Structure for AI Parsing

Para facilitar a análise por IA, o HTML seguirá uma estrutura semântica específica:

```html
<!-- Para dado único -->
<main id="dice-result">
  <div class="dice-type">1d20</div>
  <div class="result-primary" data-result="15">15</div>
</main>

<!-- Para múltiplos dados -->
<main id="dice-result">
  <div class="dice-type">5d10</div>
  <div class="results-individual">
    <span class="roll" data-roll="7">7</span>
    <span class="roll" data-roll="3">3</span>
    <span class="roll" data-roll="10">10</span>
    <span class="roll" data-roll="1">1</span>
    <span class="roll" data-roll="8">8</span>
  </div>
  <div class="result-primary" data-result="29">Total: 29</div>
</main>
```

**Elementos-chave para IA:**
- `data-result`: Atributo com o valor numérico principal
- `.result-primary`: Classe CSS para identificar resultado principal
- `#dice-result`: ID único para localizar a seção de resultados
- `data-roll`: Atributos individuais para cada dado

### Browser Support
- **Target**: Navegadores modernos (ES6+)
- **Fallbacks**: Math.random() se Crypto não disponível
- **Progressive Enhancement**: Funcionalidade básica sem JavaScript