<template>
  <div class="urna-tela">
    <div v-if="tela != 'fim'" class="urn-tela-voto">
      <div class="urna-tela-voto-textos">
        <div class="urna-tela-voto-titulo">Seu voto para:</div>
        <div class="urna-tela-voto-tipo">{{ tela }}</div>
      </div>
      <div class="urna-tela-voto-numeros">
        Números
        <div
          class="urna-tela-voto-numero"
          v-for="(value, key) in numeroVoto.padEnd(quantidadeNumeros, '0')"
          :key="key"
        >
          {{ value }}
        </div>
      </div>
      votação
    </div>

    <div class="urna-tela-voto-imagem"></div>

    <div class="urna-tela-voto-instrucoes"></div>

    <div v-if="tela == 'fim'" class="urna-tela-fim">
      finalização
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

.urna-tela-voto-numeros{
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
</style>
