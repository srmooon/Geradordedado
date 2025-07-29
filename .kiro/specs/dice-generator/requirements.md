# Requirements Document

## Introduction

Este projeto visa criar um site HTML que gera números aleatórios simulando dados de RPG através de URLs dinâmicas. O sistema suporta diferentes notações de dados (1d10, 1d20, 1d100, 5d10, etc.) onde cada URL específica gera automaticamente os resultados correspondentes a cada visita. O sistema é projetado para ser usado por uma IA, proporcionando uma interface simples baseada em URLs que seguem a notação padrão de dados de RPG.

## Requirements

### Requirement 1

**User Story:** Como uma IA, eu quero acessar URLs com notação de dados padrão, para que eu possa obter resultados aleatórios específicos através da URL.

#### Acceptance Criteria

1. WHEN a IA acessa uma URL no formato /[quantidade]d[lados] THEN o sistema SHALL interpretar e gerar os dados correspondentes
2. WHEN a IA acessa /1d10 THEN o sistema SHALL exibir um número aleatório entre 1 e 10
3. WHEN a IA acessa /1d20 THEN o sistema SHALL exibir um número aleatório entre 1 e 20
4. WHEN a IA acessa /1d100 THEN o sistema SHALL exibir um número aleatório entre 1 e 100
5. WHEN a IA recarrega qualquer URL de dado THEN o sistema SHALL gerar novos números aleatórios

### Requirement 2

**User Story:** Como uma IA, eu quero acessar URLs para múltiplos dados, para que eu possa obter vários resultados de uma só vez.

#### Acceptance Criteria

1. WHEN a IA acessa /5d10 THEN o sistema SHALL exibir 5 números aleatórios entre 1 e 10
2. WHEN a IA acessa /3d20 THEN o sistema SHALL exibir 3 números aleatórios entre 1 e 20
3. WHEN múltiplos dados são gerados THEN o sistema SHALL exibir cada resultado individualmente
4. WHEN múltiplos dados são gerados THEN o sistema SHALL também exibir a soma total dos resultados
5. WHEN a quantidade de dados excede 20 THEN o sistema SHALL limitar a 20 dados e exibir aviso

### Requirement 3

**User Story:** Como uma IA, eu quero que o sistema valide as URLs de dados, para que eu receba feedback claro sobre formatos inválidos.

#### Acceptance Criteria

1. WHEN a IA acessa uma URL com formato inválido THEN o sistema SHALL exibir uma mensagem de erro explicativa
2. WHEN a IA acessa uma URL com valores não numéricos THEN o sistema SHALL redirecionar para uma página de ajuda
3. WHEN a IA acessa uma URL com lados de dado inválidos (menor que 2) THEN o sistema SHALL exibir erro de validação
4. WHEN a IA acessa uma URL com quantidade de dados inválida (menor que 1) THEN o sistema SHALL exibir erro de validação

### Requirement 4

**User Story:** Como uma IA, eu quero uma página inicial com exemplos e navegação, para que eu possa entender como usar o sistema.

#### Acceptance Criteria

1. WHEN a IA acessa a URL raiz THEN o sistema SHALL exibir uma página inicial com instruções
2. WHEN a página inicial é carregada THEN o sistema SHALL mostrar exemplos de URLs válidas
3. WHEN a página inicial é exibida THEN o sistema SHALL incluir links rápidos para dados comuns (1d10, 1d20, 1d100)
4. WHEN a IA está em qualquer página de dado THEN o sistema SHALL exibir um link para voltar à página inicial
5. WHEN a página inicial é carregada THEN o sistema SHALL explicar o formato de URL esperado

### Requirement 5

**User Story:** Como uma IA, eu quero que o sistema exiba resultados de forma clara e estruturada, para que eu possa processar facilmente as informações.

#### Acceptance Criteria

1. WHEN dados são gerados THEN o sistema SHALL exibir o tipo de dado usado (ex: "1d20", "5d10")
2. WHEN um único dado é gerado THEN o sistema SHALL exibir apenas o resultado
3. WHEN múltiplos dados são gerados THEN o sistema SHALL exibir cada resultado individual e a soma total
4. WHEN resultados são exibidos THEN o sistema SHALL usar formatação clara e legível
5. WHEN a página é carregada THEN o sistema SHALL responder em menos de 2 segundos

### Requirement 6

**User Story:** Como uma IA, eu quero que o site funcione de forma consistente e confiável, para que eu possa confiar nos resultados gerados.

#### Acceptance Criteria

1. WHEN o site é acessado THEN o sistema SHALL usar JavaScript para garantir aleatoriedade adequada
2. WHEN números são gerados THEN o sistema SHALL garantir distribuição uniforme dentro do intervalo
3. WHEN o site é usado repetidamente THEN o sistema SHALL manter performance consistente
4. WHEN erros ocorrem THEN o sistema SHALL exibir mensagens de erro apropriadas
5. WHEN o site é acessado em diferentes navegadores THEN o sistema SHALL funcionar consistentemente