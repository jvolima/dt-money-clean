# Documentação

## Casos de uso da aplicação
- Listar transações da API
- Adicionar nova transação na API passando os parâmetros: description, type, price e category

## Funcionalidades a serem desacopladas dos componentes
- [x] Fetch das transações
- [x] Post das transações 
- [x] Validação do formulário de adicionar nova transação
- [x] Summary dinâmico
- [x] Search

## Validações para os campos
- Description: campo obrigatório e mínimo de caracteres igual a 5
- Price: campo obrigatório e deve ser um número
- Categoria: campo obrigatório e mínimo de caracteres igual a 3

## Milhas extra
- [x] Toast após cadastrar transação
- [x] Campo createdAt
- [x] Responsive
- [x] 100% coverage
- [x] Move summary to a custom hook
- [] Refactor geral
- [] Paginação