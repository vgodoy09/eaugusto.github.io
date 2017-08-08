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

  <h2>Fale Comigo</h2>

  <div id="form" class="contact-form">
    <form accept-charset="UTF-8" method="POST" action="https://formspree.io/thiago.rossener@gmail.com" v-on:submit.prevent="validateBeforeSubmit" ref="contact">
      <fieldset>
        <input type="hidden" name="_subject" value="Novo contato!" />
        <input type="hidden" name="_next" value="https://www.rossener.com/contato/mensagem-enviada/" />
        <input type="hidden" name="_language" value="pt" />

        <input type="text" name="nome" placeholder="Seu nome" v-validate="'required'"
               :class="{ 'has-error': errors.has('nome') }">
        <span v-if="errors.has('nome')">${ errors.first('nome') }</span>

        <input type="text" name="email" placeholder="Seu e-mail" v-validate="'required|email'"
               :class="{ 'has-error': errors.has('email') }">
        <span v-if="errors.has('email')">${ errors.first('email') }</span>

        <textarea name="mensagem" onkeyup="adjust_textarea(this)" placeholder="Sua mensagem" v-validate="'required'"
                  :class="{ 'has-error': errors.has('mensagem') }"></textarea>
        <span v-if="errors.has('mensagem')">${ errors.first('mensagem') }</span>

        <button type="submit">Enviar</button>
      </fieldset>
    </form>
  </div>

  <h2>Redes Sociais</h2>

  <ul>
    <li><a href="https://github.com/{{ site.github_username }}" alt="Github">Github</a></li>
    <li><a href="https://www.facebook.com/{{ site.facebook_username }}" alt="Facebook">Facebook</a></li>
    <li><a href="https://twitter.com/{{ site.twitter_username }}" alt="Twitter">Twitter</a></li>
    <li><a href="https://medium.com/@{{ site.medium_username }}" alt="Medium">Medium</a></li>
    <li><a href="https://www.instagram.com/{{ site.instagram_username }}" alt="Instagram">Instagram</a></li>
    <li><a href="https://www.linkedin.com/in/{{ site.linkedin_username }}" alt="LinkedIn">LinkedIn</a></li>
  </ul>

</div>

<script type="text/javascript">
function adjust_textarea(h) {
    h.style.height = "200px";
    h.style.height = (h.scrollHeight)+"px";
}
</script>

<script src="https://unpkg.com/vue@2.4.2"></script>
<script src="https://unpkg.com/vee-validate@2.0.0-rc.8"></script>
<script type="text/javascript">
Vue.use(VeeValidate);

const dictionary = {
  pt: {
    custom: {
      nome: {
        required: 'Por favor, insira seu nome'
      },
      email: {
        required: 'Por favor, insira seu e-mail',
        email: 'O e-mail deve ser válido'
      },
      mensagem: {
        required: 'Por favor, insira sua mensagem'
      }
    }
  }
};

VeeValidate.Validator.updateDictionary(dictionary);
VeeValidate.Validator.setLocale('pt');

new Vue({
  el: '#form',
  delimiters: ['${', '}'],
  methods: {
    validateBeforeSubmit: function () {
      this.$validator.validateAll();
      if (!this.errors.any()) {
        this.$refs.contact.submit();
      }
    }
  }
});
</script>
