---
layout: page
title: Contact
description: Let's Talk
permalink: /contact/
redirect_from:
  - /pt/contact/
  - /en/contact/
---

<style type="text/css" media="screen">
  .container {
    margin: 0px auto;
    max-width: 600px;
  }
</style>

<div class="container">

  <h2>Fale comigo</h2>

  <div id="form" class="contact-form">
    <form accept-charset="UTF-8" method="POST" action="https://formspree.io/victorpradodegodoy09@gmail.com" v-on:submit.prevent="validateBeforeSubmit" ref="contact">
      <fieldset>
        <input type="hidden" name="_subject" value="New contact!" />
        <input type="hidden" name="_next" value="https://vgodoy09.github.io/contato/sent-message/" />
        <input type="hidden" name="_language" value="pt" />

        <input type="text" name="nome" placeholder="Your name here" v-validate="'required'"
               :class="{ 'has-error': errors.has('nome') }">
        <span v-if="errors.has('nome')" v-cloak>${ errors.first('nome') }</span>

        <input type="text" name="email" placeholder="Your e-mail here" v-validate="'required|email'"
               :class="{ 'has-error': errors.has('email') }">
        <span v-if="errors.has('email')" v-cloak>${ errors.first('email') }</span>

        <textarea name="mensagem" onkeyup="adjust_textarea(this)" placeholder="Your message here" v-validate="'required'"
                  :class="{ 'has-error': errors.has('mensagem') }"></textarea>
        <span v-if="errors.has('mensagem')" v-cloak>${ errors.first('mensagem') }</span>

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

<script src="https://unpkg.com/vue@2.4.2"></script>
<script src="https://unpkg.com/vee-validate@2.0.0-rc.8"></script>
<script type="text/javascript">
Vue.use(VeeValidate);

const dictionary = {
  pt: {
    custom: {
      nome: {
        required: 'Please, your name here'
      },
      email: {
        required: 'Por favor, your e-mail here',
        email: 'Inform a valid e-mail'
      },
      mensagem: {
        required: 'Please, write the message here'
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
