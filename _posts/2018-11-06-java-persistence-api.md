---
layout: post
title: 'JPA (Java Persistence API)'
description: "Conceito do JPA (Java Persistence API)"
image: 'https://res.cloudinary.com/dxyyhadjr/image/upload/v1528070388/my/images_blog/jpa.jpg'
date: 2018-11-06 19:00:00
main-class: 'blog'
twitter_text: 'Conceito do JPA (Java Persistence API)'
introduction: "Conceito do JPA (Java Persistence API)"
category: ['java', 'persistence', 'api']
tags: ['java', 'persistence', 'api']
reviser: []
---


### Introdução à JPA (Java Persistence API) 

JPA é uma <a href="#"> **framework** </a> fundamentado em POJOs (Plan Old Java Objects), e o que seria esse tal POJOs, para compreender isto devemos ter em mente que ao redor do mundo existem diversos desenvolvedores de <a href="#"> **software** </a> que estão a resolver problemas através de uma linguagem de programação e a cada dia que passa essas necessidade tem sido exigida com mais velocidade em um curto prazo. 
Portanto, quando foi compreendido que essas necessidades de resolver os mesmos problemas eram recorrentes em todo o mundo, profissionais que utilizam linguagem que possui o conceito de <a href="#"> **orientação** </a> a objetos criaram os padrões de projeto e hoje são empregados em sistemas e exigidos por diversas empresas do ramo de TI (Tecnologia da Informação), pois já foram exaustivamente testados e aprovados. 
O conceito ficou tão consolidado que acabou sendo utilizado para solucionar problemas que não provinham do ramo de TI. 
Devido a existência de muitos padrões de projetos por muitas vezes fica a dúvida de qual usar, quando usar e qual a real diferença entre alguns deles. Por esse motivo necessitamos de compreender a diferença entre os padrões <a href="https://vgodoy09.github.io/padroes-po-pojo-bo-dto-vo/"> **PO (Persistent Object)** </a>, <a href="https://vgodoy09.github.io/padroes-po-pojo-bo-dto-vo/"> **POJO (Plain Old Java Object)** </a>, <a href="https://vgodoy09.github.io/padroes-po-pojo-bo-dto-vo/"> **BO (Business Object)** </a>, <a href="https://vgodoy09.github.io/padroes-po-pojo-bo-dto-vo/"> **DTO (Data Transfer Object)** </a> e o <a href="https://vgodoy09.github.io/padroes-po-pojo-bo-dto-vo/"> **VO (Value Object)** </a> para poder entender a base que está fundamentada o JPA. 

Compreendendo os Padrões citados acima conseguimos entender a base do JPA podemos observar que não é um framework somente para Mapeamento Objeto-Realcional(ORM-Object-Relational Mapping) ele proporciona muitas outras funcionalidades e facilidades por isso podemos observar que quase todas as aplicações de grande porte utilizam o JPA para fazer a persistência de dados. 

Falar de como o JPA surgiu, ou seja, um pouco da História, tudo começou por causa da complexidade que tinha-se para implementar uma aplicação Java, portanto quanto vamos analisar a especificação <a href="#"> **Java EE** </a> 5 é perceptível que o foco foi proporcionar uma facilidade para o desenvolvimento de aplicações JEE 5. 
O <a href="#"> **EJB (Enterprise Java Bean)** </a> foi que iniciou esse processo ao permitir que ficasse mais fácil e mais produtivos de se usar e a solução adotada para a problemática de usabilidade foi removendo os requisitos de implementação mais onerosos dos <a href="#"> **Session Beans** </a> e <a href="#"> **Message-Drive Beans** </a> sendo assim os componentes permanecem como POJOS porem o maior problema era com o <a href="#"> **Entity Beans** </a>, portanto a única maneira foi começar do zero, deixando os Entity Beans separados e inclui um novo modelo de persistência e como sempre uma ferrameta surgi para resolver problemas e o JPA nasceu para resolver os problemas com persistência e sua construção foi através de desenvolvedores experientes que já haviam participado de outras implementações referente a persistência. 
Foi então que os líderes de soluções de mapeamento objeto relacionais padronizaram seus produtos os primeiros a iniciar esse processo com o EJB foi <a href="#"> **Hibernate** </a> e <a href="#"> **TopLink** </a> o atual <a href="#"> **EclipseLink** </a> e não parou por ai na versão 2.0 do JPA é incluído o <a href="#"> **Java Persistence Query Language (JPQL)** </a>, a <a href="#"> **API Criteria** </a> que é utilizada para consultas dinâmicas, a capacidade adicional de mapeamento entre outras funcionalidades e continua a ser melhorada sempre. 

Algumas das funcionalidades que se destacam no JPA são: 

- **POJOS Persistentes:** são objetos simples que não existe a necessidade de herança de interfaces ou classes externas, um objeto que possua um construtor default pode ser persistido e além disto o ORM com JPA pode ser feito através de anotações ou um <a href="#"> **XML** </a> externo. 

- **Consultas em Objetos:** as consultas podem ser feitas por JPQL que é derivado do <a href="#"> **EJB QL** </a> essas são transformadas em <a href="#"> **SQL** </a>.

- **Configuração simples:** O JPA oferece diversas caraterísticas que são totalmente configuráveis sendo através de anotações, XML ou ambas, as anotações são fáceis de usar e pelo fato do JPA já possuir valores pré-estabelecido é fácil de utilizar basta algumas anotações podemos pensar assim por sua facilidade isso no começo do projeto é tranquilo, porém com o passar do tempo e o crescimento do projeto podemos sofrer com alguns problemas ao longo do projeto, por isso a necessidade de estudar bem e saber como está utilizando e estruturar bem já pensando no crescimento para que não venhamos a sofrer mais na frente. 

- **Integração e Teste:** Existem algumas dificuldades para testar as aplicações que estão rodando em um servidor de aplicação isto não é tão simples, portanto com uma API trabalhando fora do servidor de aplicação conseguimos fazer com que o JPA possa trabalhar sem um servidor de aplicação assim facilitando <a href="#"> **testes unitários** </a>.

Principais Anotações e Elementos do presistence.xml referente ao JPA.

| Anotação | Elemento | Atributos | Descrição
|---
| @Entity  | Class       | -         | Identifica a classe como Entidade JPA. 
| @Id      | Propriedade | -         | Identifica a propriedade como chave primaria. 



| Access Control | Modifier | Accessible
|---
| Public            | public | Everywhere
| Package-private   || Within the same package
