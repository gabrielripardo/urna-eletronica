<template>
  <div class="urna-tela">
    <div v-if="tela === 'prefeito' || tela === 'vereador'" class="urna-tela-voto">
      <div class="urna-tela-voto-textos">
        <div class="urna-tela-voto-titulo" v-if="numeroVoto.length === quantidadeNumeros">Seu voto para:</div>
        <div class="urna-tela-voto-tipo">{{ tela }}</div>
        <div class="urna-tela-voto-numeros">
          <span v-if="numeroVoto.length === quantidadeNumeros">Número:</span>
          <div class="urna-tela-voto-numero" v-for="(value, key) in numeroVoto.padEnd(quantidadeNumeros, '0')"
            :key="key">
            {{ value }}
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
          <span class="urna-tela-voto-nulo">VOTO NULO</span>
        </div>
      </div>
      <div v-if="Object.keys(candidato).length !== 0" class="urna-tela-voto-foto">
        <img :src="candidato.imagem" alt="foto do candidato">
      </div>
    </div>
    <div v-if="tela === 'resultados'" class="urna-tela-resultados">
      <h1>Total de votos</h1>
      <div class="urna-tela-resultados-tipos">
        <div class="urna-tela-tipo" v-for="(cand, key) in candidatos" :key="key">
          <h2>{{ key }}</h2>
          <div class="urna-tela-candidatos">
            <div class="urna-tela-candidato-card" v-for="(c, key, index) in candidatos[key]" :key="key">
              <span class="ranking-number">#{{ index + 1 }}</span>
              <div class="candidato-image">
                <img :src="c.imagem" alt="foto do candidato" />
              </div>
              <div class="candidato-data">
                <p>
                  Nome: <span>{{ c.nome }}</span>
                </p>

                <p>
                  Número: <span>{{ key }}</span>
                </p>

                <p>
                  Partido: <span>{{ c.partido }}</span>
                </p>

                <p>
                  Total de votos: <span class="total-votes">{{ c.votos }}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="urna-tela-voto-instrucoes"></div>

    <div v-if="tela == 'fim'" class="urna-tela-fim">
      <audio src="../assets/audios/fim.mp3" autoplay></audio>
      <h1>FIM</h1>
      <h2>VOTOU</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: "Tela",
  props: {
    tela: String,
    numeroVoto: String,
    quantidadeNumeros: Number,
    candidato: Object,
    candidatos: Object,
  },
};
</script>

<style>
.urna-tela {
  width: 55%;
  height: 100%;
  background-color: var(--ballot-box-screen-color);
  border-radius: 5px;
  border: 2px solid var(--light-border-color);
  padding: 20px;
  color: var(--dark-text-color);
  font-family: Arial, Helvetica, sans-serif;
  position: relative;
}

.urna-tela-voto {
  display: flex;
  justify-content: space-between;
  gap: 8px;
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

.urna-tela-resultados-tipos {
  display: flex;
  justify-content: space-between;
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
  gap: 10px;
}

.urna-tela-candidato-card {
  width: 230px;
  display: flex;
  column-gap: 5px;
  border: 1px solid #7a7a7a;
  padding: 10px 5px;
  font-size: .95em;
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

.urna-tela-voto-erros-textos {
  height: 150px;
  width: 460px;
  position: relative;
}

.urna-tela-voto-erro {
  font-size: 1.8rem;
}

.urna-tela-voto-nulo {
  font-size: 2.1rem;
  position: absolute;
  bottom: 0;
  left: 30%;
  animation: blinkblink 1.5s linear infinite;
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
