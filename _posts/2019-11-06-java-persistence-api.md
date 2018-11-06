---
layout: post
title: 'JPA (Java Persistence API)'
description: "Conceito do JPA (Java Persistence API)"
image: 'http://res.cloudinary.com/mreaugusto/image/upload/v1528070388/access-control.jpg'
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
Devido a existência de muitos padrões de projetos por muitas vezes fica a dúvida de qual usar, quando usar e qual a real diferença entre alguns deles. Por esse motivo necessitamos de compreender a diferença entre os padrões PO (Persistent Object), POJO (Plain Old Java Object), BO (Business Object), DTO (Data Transfer Object) e o VO (Value Object) para poder entender a base que está fundamentada o JPA. 

### Persistent Object - PO

O PO trabalha em conjunto o framework de persistência <a href="#"> **ORM Hibernate** </a>, ele carrega uma semelhança com o VO e também o TO (Transfer Object) só que sem uma referência a códigos de transação com o banco de dados. Como o nome diz ele é um objeto de persistência simples com métodos de recuperação (get’s) e de definição (set’s). 

### Data Tranfer Object – DTO 

O DTO é um objeto que é utilizado para transferir dados de um local para outro em uma aplicação como o nome já diz Data Transfer Object, ele não possui nenhuma regra de negócios e está associada a transferência de dados entre uma camada de visão e outra de persistência de dados. 

Este padrão de projeto é utilizado também quando não a necessidade de persistir algum dado, ou seja, somente exibir esses dados na camada de apresentação. 
Um exemplo disto seria assumir que uma determinada aplicação traz a exibição de uma tela uma lista de dados de 5 produtos que estão armazenados em um <a href="#"> **banco de dados** </a>. 
Portanto para a camada de persistência acessar esses dados ele traz uma listagem de PO’s. 
Para enviar estes valores a tela ainda é necessário converter para uma lista de DTO’s, isso é preciso ser feito pois a aplicação utiliza o JPA, um exemplo clássico o framework Hibernate que não permite os dados que estão como <a href="#"> **lazy(preguiçoso)** </a> permanecerem até a conexão ser fechada e o que seria isto, exemplo nossa lista de produtos possui uma ordem de serviço e esta ligação esta como lazy ao selecionar um produto a ordem de serviço ainda não foi retornado do banco de dados somente quando utilizarmos o get’s da ordem de serviço, porem se a conexão foi perdida pode ocorrer ai uma perca dos dados e a ordem de serviço não seja retornado por isso o uso do DTO’s, pois será retornado somente os dados necessário para a listagem na tela este é um bom exemplo para se ganhar performance também, pois você irá fazer um acesso somente ao banco não a necessidade de ir várias vezes ao banco e não irá cair no problema de performance de n + 1 que seria ao buscar uma ordem de serviço no banco de dados e ela possuir três produtos ira ter quatro acessos ao banco pois irá trazer os três produtos também, com o lazy isso não ocorre pois ele só busca quando for requisitado porem pode existir a perda de dados, já o DTO’ é uma boa pratica para solucionar esses problemas. 

Exemplo da problemática descrita acima.

```java
package com.exemploblog.model;

import java.io.Externalizable;
import java.io.IOException;
import java.io.ObjectInput;
import java.io.ObjectOutput;
import java.time.LocalDate;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "ordemservico")
public class OrdermServico implements Externalizable {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	@Column
	private String descricao; 
	private LocalDate horadoregistro;
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "ordemServico")
	private List<Produto> produtos;
	
	//... continuação da classe incluindo get's and set's
}
```
A classe acima representa uma ordem de serviço que possui uma lista de produtos, uma descrição e a hora do registro.

```java
package com.exemploblog.model;

import java.io.Externalizable;
import java.io.IOException;
import java.io.ObjectInput;
import java.io.ObjectOutput;
import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "produto")
public class Produto implements Externalizable {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	private LocalDate validade;
	@Column
	private String name;
	@Column
	private Double valor;
	@Column
	private Integer qualidade;
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="id_ordem_servico", insertable=true, updatable=false, referencedColumnName="id")
	private OrdermServico ordemServico;
	
	
    //pode possuir regras na classe
	public void setQualidade(Integer qualidade) {
		if(qualidade > 10)
			throw new RuntimeException("Qualidade é de 0 a 10");
		this.qualidade = qualidade;
	}

    //... continuação da classe incluindo get's and set's
	

}
```
A classe acima representa um produto que possui validade, nome, valor, qualidade e está inserida em uma ordem de serviço e possui uma regra de qualidade.

```java
package com.exemploblog.model;

public class ProdutoDTO {
	
	private Integer id;
	private String validade;
	private String name;
	private Double valor;
	private String descricao;
	
	public ProdutoDTO(Integer id, String validade, String name, Double valor, String descricao) {
		this.id = id;
		this.validade = validade;
		this.name = name;
		this.valor = valor;
		this.descricao = descricao;
	}
	
	//.. continuação da classe incluindo get's and set's
}
```
A classe acima é um DTO ele é uma classe simples que só possui get's and set's sem regras, trazendo somente o que é para ser visto na tela.


### Plain Old Java Object – POJO 

O POJO traz a ideia de falar o bom e velho e simples objeto <a href="#"> **Java** </a>, ou seja, quanto mais simples melhor. 
O termo foi inventado em Setembro de 2000 por Martin Fowler, Rebecca Parsons e Josh MacKenzie. 
Este padrão POJO’s podem ser convertidos em outros padrões tais como PO, DTO, VO. 
Um objeto com algumas pré anotações como as de persistência do JPA é considerado um POJO também. 

### Business Object – BO

O BO como o nome já diz um objeto de negócio que é utilizada na camada de negócio de uma arquitetura orientada a objeto. 
A ideia é encapsular toda logica de negócio para um objeto e existem três conceitos principais para que um objeto seja considerado um BO: 

    - Contém apenas as propriedades do objeto de negócio. 

    - Contém apenas os métodos de negócio. 

    - Ambos.  

### Value Object – VO

O VO que a igualdade não é baseada na identidade ele simplesmente é um objeto que representa uma entidade simples é um pouco confuso compreender isto dois objetos de valor que representa uma igualdade não sendo o mesmo objeto sim é um pouco confuso.



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
| Anotação | Elemento    | Atributos | Descrição
|---
| @Entity  | Class       | -         | Identifica a classe como Entidade JPA. 
| @Id      | Propriedade | -         | Identifica a propriedade como chave primaria. 
| @GeneratedValue | Propriedade | strategy = <domínio> generator = <nome_sequencia> | Geração de valores pelo Banco de Dados. 
| @SequenceGenerator | Propriedade | name = <nome_dado> sequenceName = <nome_sequencia_banco> | Identifica a sequência utilizada na geração de valores do campo. 
| @Enumerated | Propriedade | value = <dominio> | Identifica a propriedade como Enum a ser guardado no banco. 
| @Temporal | Propriedade | value = <dominio> | Identifica a propriedade como tipo DATA, porém com a nova API de Data que saiu a partir do Java 8 não é necessário utiliza-la.  
| @ManyToOne | Propriedade | mappedBy=<atributo> fetch = <dominio> | Tipo de relacionamento entre objetos. _MappedBy_ sinaliza relacionamento bidirecional. fetch=FetchType.EAGER FetchType.LAZY. 
| @ManyToMany | Propriedade | mappedBy=<atributo> fetch = <dominio> | Tipo de relacionamento entre objetos. _MappedBy_ sinaliza relacionamento bidirecional. fetch=FetchType.EAGER FetchType.LAZY.
| @OneToOne | Propriedade | mappedBy=<atributo> fetch = <dominio> | Tipo de relacionamento entre objetos. _MappedBy_ sinaliza relacionamento bidirecional. fetch=FetchType.EAGER FetchType.LAZY.
| @OneToMany | Propriedade | mappedBy=<atributo> fetch = <dominio> | Tipo de relacionamento entre objetos. _MappedBy_ sinaliza relacionamento bidirecional. fetch=FetchType.EAGER FetchType.LAZY.
| @JoinColumn | Propriedade | unique = <boolean> | Restrição de valor único com @OneToOne. 
| @Column | Propriedade | name = <nome_dado> columnDefinition = <string> unique = <boolean> insertable = <boolean> length = <int> nullable = <boolean> precission = <int> scale = <int> table = <string> updatable = <boolean> | Restrição de valor único com @OneToOne. 

