<template>
  <div class="urna-tela">
    <div v-if="tela != 'fim'" class="urna-tela-voto">
      <div class="urna-tela-voto-textos">
        <div class="urna-tela-voto-titulo">Seu voto para:</div>
        <div class="urna-tela-voto-tipo">{{ tela }}</div>
      </div>
      <div class="urna-tela-voto-numeros">
        Números
        <div class="urna-tela-voto-numero" v-for="(value, key) in numeroVoto.padEnd(quantidadeNumeros, '0')" :key="key">
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
        <div class="urna-tela-voto-foto">
          <img :src="candidato.imagem" alt="foto do candidato">
        </div>
        <div class="urna-tela-voto-resultados">
          Total de votos: <span>{{ candidato.votos }}</span> votos
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

.urna-tela-voto-foto {
  position: absolute;
  top: 30px;
  right: 40px;
  width: 35%;
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

.urna-tela-voto-resultados {
  margin-top: 20px;
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
</style>
