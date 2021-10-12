<template>
  <section>
    <div class="container">
      <h1>Realizar Login</h1>
      <p class="red">{{error}}</p>
        <label for="email"></label>
        <input v-model="email" type="email" name="email" id="email" placeholder="Seu email" autocomplete="username">

        <label for="password"></label>
        <input v-model="password" type="password" name="password" id="password" placeholder="Sua senha" autocomplete="current-password">
        <button @click="login">Login</button>
    </div>
  </section>
</template>



<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      password: '',
      error: ''
    }
  },

  created() {
    localStorage.removeItem('auth');
  },
  methods: {
    login() {
      axios.post('http://127.0.0.1:3333/auth', {email:this.email, password:this.password}).then(res => {
        localStorage.setItem('auth', res.data.token);
        this.$router.push({name:'Home'});
      }).catch(error => {
        this.error = error;
      })
    }
  }
}

</script>
