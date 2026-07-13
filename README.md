# 📊 Ranking Vendas Web

🌐 **Aplicação online:** https://rankingvendasonline.netlify.app

Projeto desenvolvido para transformar o controle de vendas analógico e planilhas locais em uma ferramenta web acessível, atualizada automaticamente e focada em inteligência de dados.

---

## 📌 Contexto e Evolução do Projeto

O controle de vendas original era feito de forma analógica (anotado em uma lousa na parede) e acompanhado internamente via planilhas Excel. O objetivo deste projeto foi automatizar esse processo, centralizando as informações e gerando engajamento para a equipe.

* **Versão 1.0 (Java Local):** Inicialmente, a aplicação foi desenvolvida localmente em **Java**, utilizando **JSP**, **Servlets** e **Apache Tomcat** para realizar a leitura das planilhas Excel através da biblioteca **Apache POI**.
* **Versão 2.0 (Nuvem & Tempo Real):** Com a necessidade de disponibilizar o sistema externamente pela internet, a arquitetura evoluiu para uma solução baseada em **Firebase**, permitindo a sincronização instantânea dos dados integrados via Excel VBA.
* **Versão Atual (Nova Interface & Analytics):** A interface foi totalmente remodelada nesta nova versão, trazendo uma identidade visual profissional e novos recursos analíticos robustos para vendedores e gestores.

---

## 🚀 Novas Funcionalidades e Recursos

### 🏃 Visão do Vendedor e Nova Interface
* **Identidade Visual Reformulada:** Nova interface visual com a inclusão de logotipo e um design focado na experiência do usuário.
* **Função "Minha Corrida":** Ferramenta onde o vendedor seleciona seu nome e o sistema calcula, em porcentagem, a distância dele para o primeiro colocado, exibindo exatamente quantas vendas faltam para ele alcançar o topo.
* **Filtros Temporais:** Consulta do ranking de vendas segmentada por mês e destaque visual para os três primeiros colocados.

### 👔 Dashboard do Gestor (Model Administrativo)
* **Autenticação:** Área restrita com login seguro para a gerência.
* **Métricas Gerais:** Indicadores em tempo real do total de vendas gerais, melhor técnico e quantidade de vendedores ativos.
* **Análise Gráfica:** Gráfico dinâmico de acompanhamento de vendas diárias.
* **Cards Estratégicos:** Exibição do melhor dia do mês, média diária e um campo interativo para estipular a meta mensal (o sistema recalcula a porcentagem restante automaticamente a cada nova venda).

---

## 🛠️ Tecnologias Utilizadas

### Arquitetura de Back-end & Integração
* **Excel (.xlsm) + VBA:** Automação responsável por disparar os dados da planilha local diretamente para a nuvem assim que uma alteração ocorre.
* **Firebase Realtime Database:** Banco de dados NoSQL utilizado para persistência e sincronização em tempo real com o front-end.

### Front-end & Interface
* **HTML5 & CSS3:** Estruturação e estilização responsiva da nova interface (com inclusão de logotipo).
* **JavaScript (ES6+):** Lógica do lado do cliente para manipulação do DOM, consumo do Firebase, gráficos dinâmicos e cálculos dos algoritmos de metas e da "Corrida até o Líder".

---

## 🏗️ Fluxo da Arquitetura Atual
```text
Excel (.xlsm)
↓
VBA
↓
Firebase Realtime Database
↓
HTML / CSS / JavaScript
↓
Aplicação Web
```
## 🎯 Objetivo do Projeto

Demonstrar a evolução prática de uma solução local baseada em Excel para uma aplicação web moderna e escalável, aplicando conceitos de automação, computação em nuvem, banco de dados NoSQL e desenvolvimento web focado em resolver problemas reais de negócios.
