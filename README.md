# 🎲 Dice Generator - Gerador de Dados RPG

Um site HTML simples que gera números aleatórios simulando dados de RPG através de URLs dinâmicas. Otimizado para uso por IA com estrutura HTML semântica específica.

## 🚀 Como usar

Acesse URLs no formato `/[quantidade]d[lados]` para gerar dados automaticamente:

- `/1d10` - Um dado de 10 lados
- `/1d20` - Um dado de 20 lados  
- `/2d6` - Dois dados de 6 lados
- `/5d10` - Cinco dados de 10 lados
- `/1d100` - Um dado de 100 lados

## 📋 Especificações

- **Quantidade:** 1 a 20 dados
- **Lados:** 2 a 1000 lados por dado
- **Aleatoriedade:** Criptograficamente segura usando `Crypto.getRandomValues()`
- **Fallback:** `Math.random()` para navegadores antigos
- **Performance:** Resposta em menos de 2 segundos

## 🤖 Para IA

O HTML gerado segue uma estrutura semântica específica para facilitar parsing:

```html
<!-- Dado único -->
<main id="dice-result">
  <div class="dice-type">1d20</div>
  <div class="result-primary" data-result="15">15</div>
</main>

<!-- Múltiplos dados -->
<main id="dice-result">
  <div class="dice-type">5d10</div>
  <div class="results-individual">
    <span class="roll" data-roll="7">7</span>
    <span class="roll" data-roll="3">3</span>
    <!-- ... -->
  </div>
  <div class="result-primary" data-result="29">Total: 29</div>
</main>
```

### Elementos-chave:
- `#dice-result` - Container principal dos resultados
- `.result-primary` - Resultado principal ou soma total
- `data-result` - Atributo com valor numérico principal
- `.roll` - Resultados individuais de cada dado
- `data-roll` - Atributo com valor de cada dado individual

## 🏗️ Arquitetura

- **Frontend:** HTML5, CSS3, JavaScript vanilla
- **Roteamento:** History API para URLs dinâmicas
- **Componentes:**
  - `DiceEngine` - Geração de números aleatórios
  - `DiceRouter` - Parsing e roteamento de URLs
  - `DiceValidator` - Validação de parâmetros
  - `UIController` - Renderização da interface
  - `App` - Controlador principal

## 🌐 Deploy no Netlify

O projeto está configurado para deploy automático no Netlify:

1. Conecte seu repositório ao Netlify
2. O deploy será automático (sem build necessário)
3. URLs de dados funcionarão corretamente via client-side routing

### Arquivos de configuração:
- `_redirects` - Regras de redirecionamento para SPA
- `netlify.toml` - Configurações de build e headers

## 🧪 Testes

Para executar os testes integrados, adicione `?test=true` à URL:
- Testes unitários para cada componente
- Testes de integração end-to-end
- Validação de performance

## 📁 Estrutura do projeto

```
/
├── index.html          # Página principal
├── styles.css          # Estilos CSS
├── js/
│   ├── app.js          # Controlador principal
│   ├── dice-engine.js  # Geração de dados
│   ├── dice-router.js  # Roteamento
│   ├── dice-validator.js # Validação
│   └── ui-controller.js # Interface
├── _redirects          # Configuração Netlify
├── netlify.toml        # Configuração Netlify
└── README.md           # Documentação
```

## 🔧 Desenvolvimento local

Para testar localmente:

```bash
# Servir arquivos estáticos (Python)
python -m http.server 8000

# Ou usar qualquer servidor HTTP estático
npx serve .
```

Acesse `http://localhost:8000` e teste as URLs de dados.

## ⚡ Performance

- Resposta garantida em menos de 2 segundos
- Distribuição uniforme de números
- Otimizado para múltiplas requisições
- Sem dependências externas

## 🛡️ Segurança

- Sanitização de todas as entradas
- Validação rigorosa de parâmetros
- Headers de segurança configurados
- Aleatoriedade criptograficamente segura

## 📄 Licença

Este projeto é de domínio público - use livremente para qualquer propósito.