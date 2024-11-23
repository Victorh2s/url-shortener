<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<p align="center">
  <a href="https://www.linkedin.com/in/victorhdss/" target="_blank">
    <img src="https://img.icons8.com/color/48/000000/linkedin-circled--v1.png" alt="LinkedIn" width="30"/>
  </a>
  <a href="mailto:victor.henriqueoff@gmail.com" target="_blank">
    <img src="https://img.icons8.com/color/48/000000/gmail.png" alt="Gmail" width="30"/>
  </a>
  <a href="https://www.youtube.com/@victorh2s" target="_blank">
    <img src="https://img.icons8.com/color/48/000000/youtube-play.png" alt="YouTube" width="30"/>
  </a>
</p>

# URL Shortener 

## Sobre

Este projeto é uma API REST desenvolvida com [NestJS](https://github.com/nestjs/nest) e tem como objetivo proporcionar uma solução eficiente para o encurtamento de URLs, atendendo tanto usuários autenticados quanto anônimos.

## Funcionalidades do Sistema

- **Cadastro de Usuários**: Usuários podem se cadastrar e autenticar no sistema.
- **Encurtamento de URLs**: Permite encurtar URLs para um formato de no máximo 6 caracteres.
  - Exemplo:
    - **Entrada**: `https://teddy360.com.br/material/marco-legal-das-garantias-sancionado-entenda-o-que-muda/`
    - **Saída**:   `http://localhost:3000/url/r/aO1vU`
- **Gerenciamento de URLs**:
  - Usuários autenticados podem listar, editar e excluir suas URLs encurtadas.
  - Contabilização de cliques em cada URL encurtada.
  - Registros de URLs mantêm informações sobre a data de criação e atualização.
  - Exclusões lógicas, mantendo a integridade dos dados.
- **Documentação**: A API está documentada utilizando Swagger.

## Estrutura do Banco de Dados

- Estrutura de tabelas em um banco de dados relacional, com suporte a operações CRUD para usuários e URLs.

## Requisitos para Rodar a Aplicação Localmente

- **Node.js**: v20.18.0 (LTS)
- **NestJS**: O NestJS será instalado automaticamente com as dependências do projeto.
- **Git** (opcional): Para clonar o repositório.

## Configurando o Ambiente

```bash
# Clonar o repositório
$ git clone <URL_DO_REPOSITORIO>

# Navegar até a pasta do projeto
$ cd url-shortener

# Instalar as dependências
$ npm install
```

## Configurar o Banco de dados com Prisma ORM
```bash

# Gerar os arquivos necessários a partir do seu schema.prisma:
$ npx prisma generate

# Para aplicar as migrações e criar o banco de dados
$ npm prisma migrate dev
```

## Compilar e rodar a aplicação

```bash
# Rodar em desenvolvimeto
$ npm run start:dev

# Rodar em produção
$ npm run start:prod
```

## Para rodar os testes

```bash
# Testes unitários
$ npm run test:watch

# Teste coverage
$ npm run test:cov
```

## Pontos de Melhoria para Escalabilidade Horizontal

  1. **Arquitetura de Microserviços**: 
    - Dividir a aplicação em serviços independentes, permitindo que cada serviço se concentre em uma lógica de negócio específica. Isso facilita a manutenção e o escalonamento individual dos componentes.

  2. **Migração do SQLite**: 
    - Considerar a migração para um banco de dados mais robusto, como o PostgreSQL, que oferece melhor desempenho e escalabilidade para grandes volumes de dados e alta concorrência.

  3. **Monitoramento e Observabilidade**: 
    - Implementar ferramentas de monitoramento, como Sentry e Prometheus, para rastrear erros e métricas de desempenho da aplicação. Isso ajudará a identificar problemas de desempenho.

  4. **Testes Abrangentes**: 
    - Realizar testes unitários e testes (e2e) para garantir a confiabilidade da aplicação. Evitando problemas em produção.

  5. **Migração de Provedor**: 
    - Se o deploy estiver em um provedor de nuvem menor (como Render), considerar a migração para uma das "Big Clouds", como Oracle, AWS ou Google Cloud, que oferecem mais recursos e melhor suporte para escalabilidade.

  6. **Implementação de Filas**: 
    - Utilizar sistemas de filas, como RabbitMQ ou outros produtos similares, para gerenciar melhor o processamento de requisições. Melhorando o desempenho com picos de carga.

  7. **Otimização de Requisições ao Banco de Dados**: 
    - Reduzir e aprimorar as requisições relacionadas ao banco de dados, garantindo que elas sejam eficientes e escaláveis. Isso pode incluir o uso de caching e otimização de consultas.

  8. **Balanceamento de Carga**: 
    - Implementar balanceamento de carga utilizando NGINX ou outro software para distribuir requisições entre múltiplos servidores, evitando sobrecarga em qualquer servidor individual e melhorando a performance da aplicação.

## Deploy
  Deploy realizado na Amazon ec2

  - [Clique aqui](http://3.85.14.135:3000/api) para acessar a documentação feita com Swagger em produção.

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
