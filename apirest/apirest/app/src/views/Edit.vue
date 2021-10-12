<template>
<div>
  <nav>
    <router-link :to="{name: 'Home'}">Inicio</router-link>
    <router-link :to="{name: 'Create'}">Adicionar</router-link>
    <router-link :to="{name: 'Login'}">Desconectar</router-link>
  </nav>

  <div class="breadcrumb">
    <router-link :to="{name: 'Home'}">Inicio</router-link>&gt;
    <router-link class="active" :to="{name: 'Edit', params: {id:id}}">Editar Game</router-link>
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

      <button @click="update">Atualizar</button><br>
    </div>
  </section>
</div>
</template>

<script>
import getToken from '../getToken';
import axios from 'axios';
export default {
  data() {
    return {
      name: '',
      year: 0,
      price: 0,
      id: 0,
      error: ""
    }
  },
  created() {
    var req =  getToken();
    this.id = this.$route.params.id;
    axios.get(`http://127.0.0.1:3333/game/${this.id }`, req).then(res => {
      console.log(res.data.game[0].name)
      this.name = res.data.game[0].name;
      this.year = res.data.game[0].year;
      this.price = res.data.game[0].price;
    }).catch(error => {
      this.error = error
    })
  },
  methods: {
    update() {
      var req =  getToken();
      var editData = {
        name: this.name,
        year: this.year,
        price: this.price
      }

      axios.put(`http://127.0.0.1:3333/game/${this.$route.params.id}`, editData, req).then(() => {
        this.$router.push('Home');
      }).catch(error => {
        this.error = error
      })
    }
  }
}
</script>

