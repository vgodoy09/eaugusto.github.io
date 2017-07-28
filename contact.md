---
layout: page
title: Contato
description: Vamos conversar.
permalink: /contato/
redirect_from:
 - /pt/contato/
 - /en/contact/
---

<style type="text/css" media="screen">
  .container {
    margin: 0px auto;
    max-width: 600px;
  }
</style>

<div class="container">

  <h2>Contato</h2>

  <div class="contact-form">
    <form accept-charset="UTF-8" action="https://formkeep.com/f/b403fc31ae82" method="POST">
      <fieldset>
        <input type="hidden" name="utf8" value="✓">

        <input type="text" id="name" name="Nome" placeholder="Seu nome">

        <input type="email" id="email-address" name="E-mail" placeholder="Seu e-mail">

        <textarea id="message" name="Mensagem" onkeyup="adjust_textarea(this)" placeholder="Sua mensagem"></textarea>

        <button type="submit">Enviar</button>
      </fieldset>
    </form>
  </div>

</div>

<script type="text/javascript">
function adjust_textarea(h) {
    h.style.height = "200px";
    h.style.height = (h.scrollHeight)+"px";
}
</script>
