<template>
  <div id="app">
    <div id="urna-cima">
      <!-- <div class="options">
        <button id="btn-restart" v-on:click="goToScreen('prefeito')"><img src="./assets/icons/restart.png"
            alt="votar novamente"></button>
        <button id="btn-statistics" v-on:click="goToScreen('resultados')"><img src="./assets/icons/trend.png"
            alt="votar novamente"></button>
      </div> -->
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
import { getCandidatos, getPartidos, setVote } from "./services/firestore"
// Import the functions you need from the SDKs you need

export default {
  name: "App",
  components: {
    Teclado,
    Tela,
  },

  data() {
    return {
      tela: "prefeito",
      numeroVoto: "",
      quantidadeNumeros: 2,
      candidato: {},
      candidatos: {},
      partidos: {},
      voteWhite: false,
      tipos: ["prefeitos", "vereadores"]
    };
  },

  methods: {
    adicionarNumero(numero) {
      //Adiciona o número selecionado
      if (this.numeroVoto.length < this.quantidadeNumeros && this.isVoteScreen()) {
        this.numeroVoto += '' + numero;
        if (this.candidatos[this.tela][this.numeroVoto]) {
          this.candidato = this.candidatos[this.tela][this.numeroVoto];
        } else if (Object.keys(this.partidos).length !== 0 && this.numeroVoto.length == 2) {
          for (const key in this.partidos) {
            if (String(key) == this.numeroVoto) {
              this.candidato['partido'] = this.partidos[key].nome;
            }
          }
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
        if (this.tela == 'prefeito') {
          this.tela = "gravando"
          setTimeout(() => this.tela = 'fim', 3000)
          setTimeout(() => this.tela = 'resultados', 5000)
          this.quantidadeNumeros = 2;
        } else {
          this.goToScreen('gravando')
          this.quantidadeNumeros = 5;
        }
      }
    },

    storeVote() {
      if (this.isVoteScreen()) {
        console.log('armazenando voto')
        if (this.candidatos[this.tela][this.numeroVoto]) {
          setVote(this.tela, this.numeroVoto);
          // console.log('votos: ', candidatos[this.tela][this.numeroVoto].votos)
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

  mounted() {
    window.addEventListener("keydown", e => {
      if (Number(e.key)) this.adicionarNumero(e.key)
      if (e.key === 'Backspace') {
        this.numeroVoto.length <= 1 ? this.clearDigits() : this.deleteOneDigit();
      }
      if (e.key === 'Delete') this.clearDigits()
      if (e.key === 'Enter') this.confirmVote()
    });

    (async () => {
      for (const iterator of this.tipos) {
        if (iterator === 'prefeitos') this.candidatos['prefeito'] = await getCandidatos(iterator)
        if (iterator === 'vereadores') this.candidatos['vereador'] = await getCandidatos(iterator)
      }

      this.partidos = await getPartidos()
    })()
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
  position: relative;
  padding: 20px;
}

#urna {
  display: flex;
  justify-content: space-between;
  width: 1000px;
  height: 500px;
  background-color: var(--ballot-box-background-color);
  padding: 30px;
  border-radius: 5px;
  border-top: 1px solid var(--light-border-color);
}

#urna-cima {
  width: 770px;
  height: 150px;
  perspective: 150px;
  position: relative;
  padding: 20px 50px;
}

#urna-cima::before {
  content: '';
  width: 100%;
  height: 100%;
  background-color: var(--ballot-box-background-color);
  border-radius: 5px;
  transform: rotateX(28deg);
  position: absolute;
  bottom: 6%;
  left: 0%;
}

.options {
  display: flex;
  gap: 40px;
  position: absolute;
  top: 40px;
  right: 50px;

}

#btn-restart {
  background: none;
}

#btn-statistics {
  background: none;
}

/* Deixar urna-cima colada com a urna */
@media only screen and (max-height: 700px) {
  #app {
    transform: scale(0.7);
  }

  #urna-cima {
    height: 52px;
  }

  #urna-cima::before {
    bottom: -3%;
  }
}

@media only screen and (max-height: 700px) {
  #urna-cima {
    width: 922px;
  }

  #urna-cima::before {
    bottom: -1%;
  }
}

@media only screen and (max-height: 473px) {
  #urna-cima {
    width: 940px;
  }

  #urna-cima::before {
    bottom: -3%;
  }
}

/* Mobile portrait*/
@media only screen and (max-width: 500px) {
  #app {
    transform: scale(.38);
  }
}

/*
@media only screen and (max-width: 1047px) and (max-height: 551px) {
  /*landscape*/
/*
  #app {
    flex-direction: column-reverse;
  }

  #urna-cima {
    width: 734px;
  }
}

@media only screen and (max-width: 1047px) {
  /*landscape*/

/* #urna,
  #urna-cima {
    transform: scale(0.72);
    margin: 40px 0 10px;
  }

  .options {
    transform: scale(.45);
    position: relative;
    top: -72px;
  } 
}

/*
@media only screen and (max-width: 1090px) and (min-height: 552px) {

  #urna,
  #urna-cima {
    transform: scale(0.38);
  }

  .options {
    gap: 0;
  }

  #btn-restart,
  #btn-statistics {
    transform: scale(.55);
  }
}*/
</style>
