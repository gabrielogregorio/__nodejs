<template>
<div>
  <nav>
    <router-link :to="{name: 'Home'}">Inicio</router-link>
    <router-link class="active" :to="{name: 'Create'}">Adicionar</router-link>
    <router-link :to="{name: 'Login'}">Desconectar</router-link>
  </nav>
  
  <div class="breadcrumb">
    <router-link :to="{name: 'Home'}">Inicio</router-link>&gt;
    <router-link class="active" :to="{name: 'Create'}">Criar jogo</router-link>
  </div>

  <section>
    <div class="container">
      <h3>Preencha os dados do jogo</h3>
      <p class="red">{{error}}</p>

      <label for="name">Jogo: </label>
      <input type="text" v-model="name" placeholder="Nome do jogo">

      <label for="year">Ano lançamento: </label>
      <input type="number" v-model="year" placeholder="Ano de lançamento do jogo">

      <label for="price">Preço: </label>
      <input type="number" v-model="price" placeholder="Preço do jogo">

      <button @click="inserir">Cadastrar</button><br>
    </div>
  </section>
  </div>

</template>

<script>
import axios from 'axios';
import getToken from '../getToken';

export default {
  data() {
    return {
      name: '',
      year: 0,
      price: 0,
      error: ''
    }
  },
  methods: {
    inserir() {
      var req = getToken()
      var newGame = {
        name: this.name,
        year: this.year,
        price: this.price
      }
      axios.post('http://127.0.0.1:3333/game', newGame, req).then(() => {
        this.$router.push('Home');
      }).catch(error => {
        this.error = error;
      })
    }
  }
}
</script>

