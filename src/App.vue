<template>
  <div id="app">
    <div id="urna">
      <Tela :tela="tela" :numeroVoto="numeroVoto" :quantidadeNumeros="quantidadeNumeros" :candidato="candidato" />
      <Teclado :adicionarNumero="adicionarNumero" :clearDigits="clearDigits" :confirmVote="confirmVote" />
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
    },

    clearDigits() {
      console.log('limpando os números digitados...')
      this.numeroVoto = '';
    },

    confirmVote() {
      this.storeVote()
      console.log('voto confirmado')
      // this.tela = "fim"      
    },

    storeVote() {
      console.log('armazenando voto')
      if (candidatos[this.tela][this.numeroVoto]) {
        candidatos[this.tela][this.numeroVoto].votos += 1
        console.log('votos: ', candidatos[this.tela][this.numeroVoto].votos)
        this.candidato = { votos: candidatos[this.tela][this.numeroVoto].votos }
      }
    }
  },
  data() {
    return {
      tela: "prefeito",
      numeroVoto: "",
      quantidadeNumeros: 2,
      candidato: {},
      candidatos,
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
</style>
