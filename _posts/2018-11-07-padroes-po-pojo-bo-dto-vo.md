---
layout: post
title: 'Compreendendo um pouco dos padrões PO, POJO, BO, DTO e o VO'
description: "PO (Persistent Object), POJO (Plain Old Java Object), BO (Business Object), DTO (Data Transfer Object) e o VO (Value Object)."
image: 'https://res.cloudinary.com/dxyyhadjr/image/upload/v1528070388/my/images_blog/padroes.jpg'
date: 2018-11-07 19:00:00
main-class: 'blog'
twitter_text: 'PO (Persistent Object), POJO (Plain Old Java Object), BO (Business Object), DTO (Data Transfer Object) e o VO (Value Object).'
introduction: "PO (Persistent Object), POJO (Plain Old Java Object), BO (Business Object), DTO (Data Transfer Object) e o VO (Value Object)."
category: ['java', 'PO', 'POJO', 'BO', 'DTO', 'VO']
tags: ['java', 'PO', 'POJO', 'BO', 'DTO', 'VO']
reviser: []
---


Bom neste artigo iremos compreender um pouco sobre os padrões PO, POJO, BO, DTO e VO, vamos ver suas diferenças e alguns exemplos e ao compreendermos esses conceitos saberemos o melhor lugar e momento para empregar esses padrões em nossas aplicações. 

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
Você pode me perguntar qual é a diferença então entre o DTO e o VO pois eles são a mesma coisa, pois bem, suas maiores diferenças são conceitual o DTO ele é utilizado para transferência de dados como o nome diz e o VO é utilizado para ser visualizado pelo usuário vamos dizer assim em uma tela que seu sistema. Então se eu usar meu objeto para transferir dados ele é um DTO se eu utilizar ele para ser visualizado em uma tela do sistema ele é um VO.


### Biografia

- https://dzone.com/articles/value-objects 
- https://en.wikipedia.org/wiki/Value_object 
- https://www.devmedia.com.br/diferenca-entre-os-patterns-po-pojo-bo-dto-e-vo/28162 
- https://cdn-images-1.medium.com/max/2000/1*DZMwHPWC023oYqwDHrMnqQ.jpeg 
- https://medium.com/@ezequiasrocha/67-porqu%C3%AA-aplicar-padr%C3%B5es-de-projeto-sistemas-gis-%C3%A9-vital-c4132581930