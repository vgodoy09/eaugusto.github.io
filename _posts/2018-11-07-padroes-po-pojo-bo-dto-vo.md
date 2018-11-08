---
layout: post
title: 'Compreendendo padrões PO, POJO, BO, DTO e o VO'
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


Neste artigo iremos compreender a respeito dos padrões PO, POJO, BO, DTO e VO, vamos ver suas diferenças e alguns exemplos e compreendendo esses conceitos saberemos o melhor lugar e momento para empregar esses padrões no desenvolvimento de aplicações. 

### Persistent Object - PO

O PO trabalha em conjunto o framework de persistência <a href="#"> **ORM Hibernate** </a>, ele carrega uma semelhança com o VO e também o TO (Transfer Object) só que sem uma referência a códigos de transação com o banco de dados. Como o nome diz ele é um objeto de persistência simples com métodos de recuperação (get’s) e de definição (set’s). 

### Data Tranfer Object – DTO 

O DTO é um objeto que é utilizado para transferir dados de um local para outro em uma aplicação, ele não possui <a href="#"> **regras de negócios** </a> e está associada a transferência de dados entre a camada de visão e outra de persistência de dados. 

Este padrão de projeto é utilizado também quando não a necessidade de persistir algum dado, ou seja, somente exibir esses dados na camada de apresentação. 

Um exemplo disso seria assumir que uma determinada aplicação traz a exibição de uma tela, uma lista de dados de 5 produtos que estão armazenados em um <a href="#"> **banco de dados** </a>. 

Portanto para a camada de persistência acessar esses dados ele traz uma listagem de PO’s. 

Para enviar valores a tela é necessário converter os dados que vem do banco de dados para uma lista de DTO’s, isso é preciso ser feito, pois a aplicação utiliza o JPA, um exemplo clássico é o framework Hibernate, não permitindo os dados que estão como <a href="#"> **lazy(preguiçoso)** </a> permanecerem até a conexão ser fechada.

O que seria isto?! Por exemplo a lista de produtos possui uma ordem de serviço e esta ligação esta como lazy, ao selecionar um produto a ordem de serviço ainda não foi retornado do banco de dados, só irá retornar quando utilizarmos o get’s da ordem de serviço, porem se a conexão for perdida, pode ocorrer ai uma perca dos dados e a ordem de serviço não seja retornado, por isso, o uso do DTO’s, porque assim será retornado somente os dados necessário para a listagem na tela, este é um bom exemplo para se ganhar performance. 

Como assim ganhar performance?! Ao fazer uso de um DTO o banco de dados será acessado uma única vez, desta forma não haverá necessidade de ir várias vezes, assim não irá cair no problema de performance de n + 1, que aconteceria ao buscar uma ordem de serviço no banco de dados, e ela possuir três produtos atrelados a ela, referente ao banco de dados ira ter quatro acessos, um da ordem de serviço e três de produtos, já com o lazy isso não ocorre, pois ele só busca quando for requisitado, porem pode existir a perda de dados, já o DTO’s é uma boa pratica para solucionar esses problemas. 

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

O POJO traz a ideia de falar do bom e velho e simples objeto <a href="#"> **Java** </a>, ou seja, quanto mais simples melhor. 
O termo foi inventado em Setembro de 2000 por Martin Fowler, Rebecca Parsons e Josh MacKenzie. 
Este padrão POJO’s podem ser convertidos em outros padrões tais como PO, DTO, VO. 
Um objeto com algumas pré anotações como as de persistência do JPA é considerado um POJO também. 

### Business Object – BO

O BO é um objeto de negócio, que é utilizada na camada de negócio de uma arquitetura orientada a objeto. 
A ideia é <a href="#"> **encapsular** </a> toda logica de negócio para um objeto.
Existem três conceitos principais para que um objeto seja considerado um BO: 

- Contém apenas as propriedades do objeto de negócio. 
- Contém apenas os métodos de negócio. 
- Ambos.  

### Value Object – VO

O VO traz a ideia de ser simplesmente um objeto que representa uma entidade simples, é confuso compreender que dois objetos de valor, representa uma igualdade não sendo o mesmo objeto.

Você pode me perguntar qual é a diferença então entre o DTO e o VO, porque eles são a mesma coisa, pois bem, suas maiores diferenças são conceituais, o DTO é utilizado para transferência de dados e o VO é utilizado para ser visualizado pelo usuário em uma tela do sistema. 

Então se eu usar meu objeto para transferir dados ele é um DTO se eu utilizar ele para ser visualizado em uma tela do sistema ele é um VO.


### Biografia

- ZIEMOŃSKI, Grzegorz. **Value Objects**. 2017, DZone Java Zone. Disponível em: <https://dzone.com/articles/value-objects>. Acesso em 07 de nov. de 2018. 
- CONTEÚDO aberto. **Value Objects**. 2018, Wikipedia. Disponível em: <https://en.wikipedia.org/wiki/Value_object>. Acesso em 07 de nov. de 2018. 
- SOUZA, Diogo. **Diferença entre os patterns PO, POJO, BO, DTO e VO**. 2013, DevMedia. Disponível em: <https://www.devmedia.com.br/diferenca-entre-os-patterns-po-pojo-bo-dto-e-vo/28162>. Acesso em 07 de nov. de 2018.  
- ROCHA, Ezequias. **Figura Padrões**. 2017, Medium. Disponível em: <https://cdn-images-1.medium.com/max/2000/1*DZMwHPWC023oYqwDHrMnqQ.jpeg>. Acesso em 07 de nov. de 2018.
- ROCHA, Ezequias. **67 — Vamos Falar de Padrões de Projeto em Sistemas GIS. É vital!**. 2017, Medium. Disponível em: <https://medium.com/@ezequiasrocha/67-porqu%C3%AA-aplicar-padr%C3%B5es-de-projeto-sistemas-gis-%C3%A9-vital-c4132581930>. Acesso em 07 de nov. de 2018.