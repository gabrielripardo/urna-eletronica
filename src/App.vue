<template>
  <div id="app">
    <div class="options">
      <button id="btn-restart" v-on:click="goToScreen('prefeito')"><img src="./assets/icons/restart.png"
          alt="votar novamente"></button>
      <button id="btn-statistics" v-on:click="goToScreen('resultados')"><img src="./assets/icons/trend.png"
          alt="votar novamente"></button>
    </div>
    <div id="urna">
      <Tela :tela="tela" :numeroVoto="numeroVoto" :quantidadeNumeros="quantidadeNumeros" :candidato="candidato"
        :voteWhite="voteWhite" :candidatos="candidatos" />
      <Teclado :adicionarNumero="adicionarNumero" :clearDigits="clearDigits" :confirmVote="confirmVote"
        :handleWhiteVote="handleWhiteVote" />
    </div>
  </div>
</template>

<script>
import "@/css/global.css";
import Teclado from "@/components/Teclado.vue";
import Tela from "@/components/Tela.vue";
import candidatos from "@/assets/candidatos.js"

export default {
  name: "App",
  components: {
    Teclado,
    Tela,
  },
  methods: {
    adicionarNumero(numero) {
      //Adiciona o número selecionado
      this.numeroVoto += '' + numero;
      if (candidatos[this.tela][this.numeroVoto]) {
        this.candidato = candidatos[this.tela][this.numeroVoto];
      }
    },

    clearDigits() {
      console.log('limpando os números digitados...')
      this.numeroVoto = '';
      this.candidato = {};
      this.handleWhiteVote(false)
    },

    confirmVote() {
      if (this.voteWhite) {
        this.candidatos[this.tela].branco += 1
        this.handleWhiteVote(false)
        console.log('voto branco');
      } else if (Object.keys(this.candidato).length !== 0) {
        this.storeVote()
        console.log('voto ok');
      } else {
        this.candidatos[this.tela].nulo += 1
        console.log('voto nulo');
      }

      if (this.tela == 'vereador') {
        this.tela = "fim"
        this.quantidadeNumeros = 2;
      } else {
        this.goToScreen('vereador')
        this.quantidadeNumeros = 5;
      }

      console.log('# Candidatos json:');
      console.log(candidatos);
    },

    storeVote() {
      console.log('armazenando voto')
      if (candidatos[this.tela][this.numeroVoto]) {
        candidatos[this.tela][this.numeroVoto].votos += 1
        console.log('votos: ', candidatos[this.tela][this.numeroVoto].votos)
      }
    },

    goToScreen(name) {
      console.log('tela: ', name)
      this.clearDigits()
      this.tela = name
      if (this.tela === 'prefeito') {
        this.quantidadeNumeros = 2;
      }
    },

    handleWhiteVote(vote = true) {
      console.log('voto branco: ', vote);
      this.voteWhite = vote
    }
  },
  data() {
    return {
      tela: "prefeito",
      numeroVoto: "",
      quantidadeNumeros: 2,
      candidato: {},
      candidatos,
      voteWhite: false,
    };
  },
};
</script>

<style>
#app {
  background-color: var(--background-color);
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#urna {
  display: flex;
  justify-content: space-between;
  width: 1000px;
  height: 500px;
  background-color: var(--ballot-box-background-color);
  padding: 30px;
  border-radius: 5px;
}

.options {
  display: flex;
  gap: 40px;
  position: absolute;
  top: 20px;
  right: 30px;

}

#btn-restart {
  background: none;
}

#btn-statistics {
  background: none;
}
</style>
