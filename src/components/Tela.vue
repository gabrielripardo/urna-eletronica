<template>
  <div class="urna-tela">
    <div class="urna-tela-wrapper" v-if="tela === 'prefeito' || tela === 'vereador'">
      <main class="urna-tela-voto">
        <div class="urna-tela-voto-textos">
          <div class="urna-tela-voto-titulo" v-if="numeroVoto.length === quantidadeNumeros">Seu voto para:</div>
          <div class="urna-tela-voto-tipo">{{ tela === 'prefeito' ? 'Presidente' : tela }}</div>
          <div class="urna-tela-voto-numeros" v-if="!voteWhite">
            <span v-if="numeroVoto.length === quantidadeNumeros">Número:</span>
            <div v-for="(value, key) in numeroVoto.padEnd(quantidadeNumeros, ' ')" :key="key">
              <div v-if="numeroVoto.length == key" class="urna-tela-blink urna-tela-voto-numero">
                {{ value }}
              </div>
              <div v-else class="urna-tela-voto-numero">
                {{ value }}
              </div>
            </div>
          </div>
          <div v-if="Object.keys(candidato).length !== 0" class="urna-tela-voto-dados">
            <p>
              Nome: <span>{{ candidato.nome }}</span>
            </p>

            <p>
              Partido: <span>{{ candidato.partido }}</span>
            </p>
          </div>
          <div class="urna-tela-voto-erros-textos"
            v-if="Object.keys(candidato).length === 0 && numeroVoto.length === quantidadeNumeros">
            <span class="urna-tela-voto-erro">Número errado</span>
            <span class="urna-tela-voto-nulo urna-tela-blink">VOTO NULO</span>
          </div>

          <div class="urna-tela-voto-erros-textos" v-if="voteWhite">
            <span class="urna-tela-voto-branco urna-tela-blink" v-if="voteWhite">VOTO EM BRANCO</span>
          </div>
        </div>
        <div v-if="Object.keys(candidato).length !== 0" class="urna-tela-voto-foto">
          <img :src="candidato.imagem" alt="foto do candidato">
        </div>
      </main>
      <div class="urna-tela-voto-instrucoes">
        <p><b>Aperte a tecla:</b></p>
        <p>CONFIRMA para CONFIRMAR este voto</p>
        <p>CORRIGE para REINICIAR este voto</p>
      </div>
    </div>
    <div v-if="tela === 'gravando'" class="urna-tela-gravando">
      <label for="progress-bar">Gravando</label>
      <ProgressBar :percentage="100" />
    </div>
    <div v-if="tela === 'resultados'" class="urna-tela-resultados">
      <h1>Total de votos</h1>
      <h2>Presidente</h2>
      <div class="urna-tela-resultados-tipos">
        <div class="urna-tela-tipo" v-for="(value, key) in candidatos" :key="key">
          <div v-if="key === 'prefeito'" class="urna-tela-candidatos">
            <div v-for="(c, index) in orderByCandidates(candidatos[key])" :key="index">
              <div class="urna-tela-candidato-card" v-if="c[1].nome != 'nulo' && c[1].nome != 'branco'">
                <span class="ranking-number">#{{ index + 1 }}</span>
                <div class="candidato-image">
                  <img :src="c[1].imagem" alt="foto do candidato" />
                </div>
                <div class="candidato-data">
                  <p>
                    <span v-if="c[1].nome.length < 10">Nome:</span> <em>{{ c[1].nome }}</em>
                  </p>

                  <p>
                    Número: <span>{{ c[0] }}</span>
                  </p>

                  <p>
                    <span v-if="c[1].partido.length <= 7">Partido:</span> <span>{{ c[1].partido }}</span>
                  </p>

                  <p>
                    Total de votos: <span class="total-votes">{{ c[1].votos }}</span>
                  </p>
                </div>
              </div>
              <div class="urna-tela-candidato-card" v-else>
                <p v-if="c[1].nome == 'nulo'">
                  Votos nulos: <b>{{ c[1].votos }}</b>
                </p>
                <p v-if="c[1].nome == 'branco'">
                  Votos brancos: <b>{{ c[1].votos }}</b>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="tela == 'fim'" class="urna-tela-fim">
      <audio src="../assets/audios/fim.mp3" autoplay></audio>
      <h1>FIM</h1>
      <h2>VOTOU</h2>
    </div>
  </div>
</template>

<script>
import ProgressBar from './ProgressBar.vue';
export default {
  name: "Tela",
  props: {
    tela: String,
    numeroVoto: String,
    quantidadeNumeros: Number,
    candidato: Object,
    candidatos: Object,
    voteWhite: Boolean
  },
  methods: {
    sortObjectEntries(obj) {
      let sortedList = [];
      sortedList = Object.entries(obj).sort((a, b) => {
        if (a.votos !== null && b.votos !== null) {
          if (b[1].votos > a[1].votos)
            return 1;
          else if (b[1].votos < a[1].votos)
            return -1;
          //if values are same do edition checking if keys are in the right order
          else {
            if (a[0].votos > b[0].votos)
              return 1;
            else if (a[0].votos < b[0].votos)
              return -1;
            else
              return 0;
          }
        }
      });
      console.log('# sortedList: ', sortedList);
      return sortedList;
    },

    orderByCandidates(candidatos) {
      console.log('# candidatos: ', candidatos);
      const nullAndWhite = Object.entries(candidatos).filter(el => el[0] == String(null) || el[0] == String(0))
      const candidates = this.sortObjectEntries(candidatos).filter(el => el[0] != String(null) && el[0] != String(0))
      return candidates.concat(nullAndWhite)
    },
  },
  components: { ProgressBar }
};
</script>

<style>
.urna-tela {
  width: 55%;
  height: 100%;
  background-color: var(--ballot-box-screen-color);
  border-radius: 5px;
  border: 2px solid var(--light-border-color);
  color: var(--dark-text-color);
  font-family: Arial, Helvetica, sans-serif;
  position: relative;
}

.urna-tela-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.urna-tela-voto {
  height: 100%;
  display: flex;
  justify-content: space-between;
  gap: 8px;
  padding: 20px;
}

.urna-tela-voto-foto {
  max-width: 140px;
}

.urna-tela-voto-foto img {
  width: 100%;
}

.urna-tela-voto-titulo {
  font-size: 20px;
}

.urna-tela-voto-tipo {
  font-size: 30px;
  font-weight: bold;
  margin: 20px 0;
  text-transform: uppercase;
}

.urna-tela-voto-numeros {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.urna-tela-voto-numero {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  border: 1px solid var(--dark-border-color);
  margin-left: 10px;
  font-size: 30px;
}

.urna-tela-fim {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.urna-tela-fim h1 {
  font-size: 4.8em;
  letter-spacing: 1.5px;
}

.urna-tela-resultados {
  padding: 20px 8px 10px 20px;
}

.urna-tela-resultados-tipos {
  height: 330px;
  display: flex;
  justify-content: center;
  gap: 6px;
  overflow: scroll;
}

.urna-tela-resultados * {
  margin: 0;
  padding: 0;
}

.urna-tela-resultados h1 {
  font-size: 1.8em;
}

.urna-tela-resultados h2 {
  padding: 10px 0;
  font-size: 1.45em;
  text-transform: capitalize;
}

.urna-tela-candidatos {
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.urna-tela-candidato-card {
  /*width: 230px;*/
  max-height: 114.8px;
  display: flex;
  column-gap: 5px;
  border: 1px solid #7a7a7a;
  padding: 10px 5px;
  font-size: .95em;
  overflow: auto;
}

.candidato-image img {
  width: 65px;
}

.candidato-data {
  margin-top: 10px;
}

.total-votes {
  font-weight: 600;
}

.ranking-number {
  font-size: 1.3em;
  font-weight: 600;
}

.urna-tela-voto-textos {
  height: 100%;
}

.urna-tela-voto-erros-textos {
  width: 460px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.urna-tela-voto-erro {
  align-self: flex-start;
  font-size: 1.8rem;
}

.urna-tela-voto-nulo,
.urna-tela-voto-branco {
  text-align: center;
  font-size: 1.8rem;
}

.urna-tela-blink {
  animation: blinkblink 1.5s linear infinite;
}

.urna-tela-voto-nulo {
  position: absolute;
  bottom: 30%;
}


.urna-tela-voto-branco {
  position: absolute;
  bottom: 50%;
}

.urna-tela-voto-instrucoes {
  border-top: 1px solid #000;
  padding: 5px 20px;
}

.urna-tela-voto-instrucoes * {
  margin: 6px 0;
}

.urna-tela-gravando {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column-reverse;
  gap: 5px;
}

@keyframes blinkblink {
  0% {
    opacity: 0;
  }

  50% {
    opacity: 0.7;
  }

  100% {
    opacity: 0;
  }
}
</style>
