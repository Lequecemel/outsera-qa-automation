# Automação de QA — Outsera

Projeto de automação de testes de API e End-to-End (E2E) desenvolvido para o desafio técnico de QA da Outsera. Demonstra métodos HTTP, validações positivas e negativas, cenários BDD com Cucumber, Page Object Model, relatórios HTML, captura de screenshots em falhas E2E e workflow de CI no GitHub Actions.

## Escopo

### Requisitos contemplados no repositório

- **API:** GET, POST, PUT e DELETE; validações de status da resposta, content-type e body; cenários negativos.
- **E2E de login:** login com sucesso, credenciais inválidas e credenciais vazias.
- **E2E de checkout:** checkout com sucesso e validação de campos obrigatórios.
- **CI:** workflow do GitHub Actions em pushes para `main`/`master` e pull requests.
- **Relatórios:** relatórios HTML/JSON do Playwright e HTML/JSON do Cucumber.
- **Screenshots:** captura automática de screenshots quando cenários Cucumber falham.

## Tecnologias utilizadas

- Node.js 22+ (LTS recomendado)
- JavaScript (CommonJS)
- Playwright Test e automação de navegador com Playwright
- Cucumber.js / Gherkin
- Git e GitHub Actions

## Pré-requisitos

Instale o Node.js LTS, Git e um editor de código, como o VS Code. O Playwright instala um navegador Chromium local; não é necessário ter o Google Chrome instalado para executar a automação.

## Configuração

1. Clone este repositório.
2. Instale as dependências:

   ```bash
   npm ci
   ```

3. Instale o navegador Chromium:

   ```bash
   npx playwright install chromium
   ```

4. (Opcional) Copie `.env.example` para `.env` e personalize os valores. As credenciais padrão são destinadas exclusivamente ao site de treinamento Sauce Demo.

## Executando os testes

### Testes de API

```bash
npm run test:api
```

O relatório HTML do Playwright é gerado em `reports/api-html/`. O resultado em JSON é salvo em `reports/api-results.json` (arquivos ignorados pelo Git).

### Testes E2E com Cucumber

```bash
npm run test:e2e
```

Para visualizar o navegador durante a execução:

```bash
npm run test:e2e:headed
```

Os relatórios do Cucumber são gerados em `reports/`. Cenários que falharem tentam salvar screenshots de página inteira em `screenshots/`.

## Sistemas de demonstração utilizados

- **API:** [Restful Booker](https://restful-booker.herokuapp.com)
- **Aplicação web:** [Sauce Demo](https://www.saucedemo.com)

Esses são ambientes públicos de demonstração. Disponibilidade, limites de requisições e comportamentos podem mudar; portanto, podem ocorrer falhas ocasionais relacionadas ao ambiente.

## Estrutura de pastas

```text
.
|-- .github/
|   |-- workflows/
|       |-- ci.yml
|-- features/
|   |-- checkout.feature
|   |-- login.feature
|-- pages/
|   |-- CartPage.js
|   |-- CheckoutPage.js
|   |-- InventoryPage.js
|   |-- LoginPage.js
|-- reports/                 # Relatórios gerados localmente
|   |-- api-html/
|   |-- api-results.json
|   |-- cucumber-report.html
|   |-- cucumber-report.json
|-- scripts/
|   |-- open-cucumber-report.js
|-- screenshots/              # Evidências geradas em falhas
|-- step-definitions/
|   |-- checkout.steps.js
|   |-- login.steps.js
|-- support/
|   |-- hooks.js
|   |-- world.js
|-- tests/
|   |-- api/
|       |-- bookings.spec.js
|       |-- health-check.spec.js
|-- .env.example
|-- .gitignore
|-- cucumber.js
|-- package.json
|-- package-lock.json
|-- playwright.config.js
|-- README.md
|-- README.pt-BR.md
```

## CI/CD

O workflow definido em `.github/workflows/ci.yml` é executado em pushes para `main` ou `master` e em pull requests. Ele faz checkout do repositório, instala as dependências do Node.js usando `npm ci`, instala o Chromium, executa os testes de API e os cenários E2E com Cucumber e envia os relatórios e screenshots como artefatos do GitHub Actions, inclusive quando os testes falham. Os artefatos ficam disponíveis por 14 dias.

## Observações e limitações

- Esta implementação é destinada a demonstração e testes; não deve ser utilizada contra serviços de produção.
- O comportamento das respostas negativas da API pode variar. Se o serviço de demonstração compartilhado mudar seu contrato, ajuste as assertions com base na documentação atual da API e no comportamento observado.
- O checkout de demonstração não processa pagamentos reais. Os testes validam apenas o fluxo de interface do site de exemplo, não a validação de cartões por um gateway de pagamento.
- A suíte completa de testes foi executada localmente com sucesso. O workflow do GitHub Actions também foi executado e validado no runner do GitHub.
- As evidências dos testes devem vir de execuções reais. Não apresente relatórios de exemplo ou fabricados como resultados reais.

## Comandos úteis

| Comando | Finalidade |
|---|---|
| `npm run test:api` | Executa os testes de API e gera relatórios do Playwright |
| `npm run test:e2e` | Executa os cenários Cucumber em modo headless |
| `npm run test:e2e:headed` | Executa os cenários Cucumber com o navegador visível |
| `npm run report:api` | Abre o relatório HTML do Playwright |

## Checklist do desafio técnico

- [x] Cobertura de API para GET/POST/PUT/DELETE
- [x] Cenários positivos e negativos de API
- [x] Validação de status, headers e body das respostas
- [x] Cenários E2E de login utilizando Gherkin
- [x] Cenários E2E de checkout utilizando Gherkin
- [x] Implementação do Page Object Model
- [x] Relatórios HTML e JSON do Cucumber
- [x] Relatórios HTML e JSON do Playwright
- [x] Captura de screenshots em cenários E2E com falha
- [x] Workflow de CI com GitHub Actions configurado
- [x] Suíte completa de API e E2E executada localmente (8 testes de API e 5 cenários E2E aprovados)
- [x] Execução do GitHub Actions validada
- [x] Repositório publicado no GitHub
