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
      if (this.numeroVoto.length < this.quantidadeNumeros && this.isVoteScreen()) {
        this.numeroVoto += '' + numero;
        if (candidatos[this.tela][this.numeroVoto]) {
          this.candidato = candidatos[this.tela][this.numeroVoto];
        } else {
          this.candidato = {}
        }
      }
    },

    clearDigits() {
      if (this.isVoteScreen()) {
        this.numeroVoto = '';
        this.candidato = {};
        this.handleWhiteVote(false)
      }
    },

    confirmVote() {
      if (this.numeroVoto != '' || this.voteWhite) {
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
          this.tela = "gravando"
          setTimeout(() => this.tela = 'fim', 3000)
          this.quantidadeNumeros = 2;
        } else {
          this.goToScreen('vereador')
          this.quantidadeNumeros = 5;
        }
      }
    },

    storeVote() {
      if (this.isVoteScreen()) {
        console.log('armazenando voto')
        if (candidatos[this.tela][this.numeroVoto]) {
          candidatos[this.tela][this.numeroVoto].votos += 1
          console.log('votos: ', candidatos[this.tela][this.numeroVoto].votos)
        }
      }
    },

    goToScreen(name) {
      this.tela = name
      console.log('tela: ', name)
      this.clearDigits()
      if (this.tela === 'prefeito') {
        this.quantidadeNumeros = 2;
      }
    },

    handleWhiteVote(vote = true) {
      if (this.isVoteScreen()) {
        if (this.numeroVoto === '') {
          this.voteWhite = vote
        } else {
          alert('Pressione a tecla CORRIGE antes de pressionar BRANCO.')
        }
      }
    },

    isVoteScreen() {
      if (this.tela == 'prefeito' || this.tela == 'vereador') {
        return true;
      }

      return false;
    },

    deleteOneDigit() {
      this.numeroVoto = this.numeroVoto.slice(0, -1);
      this.candidato = {}
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
  mounted() {
    window.addEventListener("keydown", e => {
      if (Number(e.key)) this.adicionarNumero(e.key)
      if (e.key === 'Backspace') {
        this.numeroVoto.length <= 1 ? this.clearDigits() : this.deleteOneDigit();
      }
      if (e.key === 'Delete') this.clearDigits()
      if (e.key === 'Enter') this.confirmVote()
    });
  }
};
</script>

<style>
#app {
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
  position: fixed;
  top: 20px;
  right: 30px;

}

#btn-restart {
  background: none;
}

#btn-statistics {
  background: none;
}

@media only screen and (max-width: 1047px) and (max-height: 551px) {
  /*landscape*/

  #app {
    flex-direction: column-reverse;
  }

  #urna {
    transform: scale(0.72);
    margin: 40px 0 10px;
  }

  .options {
    transform: scale(.45);
    position: relative;
    top: -72px;
  }
}

@media only screen and (max-width: 1090px) and (min-height: 552px) {
  #urna {
    transform: scale(0.38);
  }

  .options {
    gap: 0;
  }

  #btn-restart,
  #btn-statistics {
    transform: scale(.55);
  }
}
</style>
