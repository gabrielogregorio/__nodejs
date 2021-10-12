<template>
  <div>
    <nav>
      <router-link class="active" :to="{name: 'Home'}">Inicio</router-link>
      <router-link :to="{name: 'Create'}">Adicionar</router-link>
    <router-link :to="{name: 'Login'}">Desconectar</router-link>
    </nav>

    <div class="breadcrumb">
      <router-link class="active" :to="{name: 'Home'}">Inicio</router-link>
    </div>

    <section>
      <div class="container">
        <h1>Jogos</h1>
        <p class="red">{{error}}</p>
        <button><router-link :to="{name: 'Create'}">Adicionar Jogo</router-link></button>
        <table>
          <tr>
            <th>id</th>
            <th>nome</th>
            <th>ano</th>
            <th>preco</th>
            <th>Ações</th>
          </tr>

          <tr v-for="(game) in games" :key="game.id">
            <td>{{game.game.id}}</td>
            <td>{{game.game.name}}</td>
            <td>{{game.game.year}}</td>
            <td>{{game.game.price}}</td>
            <td>
              <router-link class="orange" :to="{name: 'Edit', params: {id: game.game.id}}">Editar</router-link>
              <a @click="deleteData(game._links.delete_game.href)" class="red" >Delete</a>
            </td>
          </tr>
        </table>  
      </div>
    </section>
  </div>
</template>

<script>
import getToken from '../getToken';
import axios from 'axios';
export default {
  name: 'Home',
  data() {
    return {
      games: [],
      error: '',
    }
  },
  created() {
    this.updateData();
  },

  methods: {
    deleteData(linkDelete) {
      var req =  getToken();
      axios.delete(linkDelete, req).then(() => {
        this.updateData();
      }).catch(error => {
        this.error = error;
      })
    },

    updateData() {
      var req =  getToken();
      axios.get('http://127.0.0.1:3333/games', req).then(res => {
        this.games = res.data.games;
      }).catch(error => {
        this.error = error;
      })
    }
  },
  components: {
  }
}
</script>
