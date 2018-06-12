---
layout: post
title: 'Java Top-level Access Control'
description: "A concise guide to mastering Java top-level access control"
image: 'http://res.cloudinary.com/mreaugusto/image/upload/v1528070388/access-control.jpg'
date: 2018-06-03 21:18:00
main-class: 'blog'
twitter_text: 'A concise guide to mastering Java top-level access control'
introduction: "A concise guide to mastering Java top-level access control"
category: ['java', 'access control', 'top-level']
tags: ['java', 'access control', 'top-level']
reviser: []
---

Welcome.

Today's post is about Java access control an important aspect of Object Oriented Design. If you want to go in-depth into class design and best practices encapsulation is the building block. So let's start it.

### Top-level
When we speak of access control in Java all you have to understand is that it all depends on:
- Where the entity's definition is and
- Which access modifier it was used.


### Definition
```txt
Top-level: Class or interface that is not nested in other class or interface.
```

Follow below a table with the rules before I explain.

| Access Control	| Modifier 	| Accessible
|---
| Public            | public 	| Everywhere
| Package-private   | 			| Within the same package

If you want to access a class/interface, you can do it:
- **With public modifier:** From any package.
- **Without modifier (Package-private):** Just from within the same package.

Easy, isn't it? I'm going to show you an example.

```java
package client;
import server.Server;
class Client {
    private Server server;
    public Client(Server server) {
        this.server = server;
    }
    public boolean checkServerUp() {
        return server.isUp();
    }
}

package server;
public class Server {
    private Connection conn;
    public Server(Connection conn) {
        this.conn = conn;
    }
    public boolean isUp() {
        return conn.connect();
    }
}

```
Did you see that? 
The **Client** can import and use the **Server** even though they're in different packages because **Server** is defined as _public_. The opposite is not true. **Server** couldn't reach the **Client** because **Client** has no modifier (implies _Private-package_ modifier) and they're in different packages. If **Client** would be in the same package as **Server** is could be possible.


Thanks,

Eduardo Augusto Benigno da Silva