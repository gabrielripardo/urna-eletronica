<template>
  <div id="app">
    <div id="urna">
      <Teclado/>
    </div>
  </div>
</template>

<script>
import '@/css/global.css';
import Teclado from '@/components/Teclado.vue';

export default {
  name: 'App',
  components: {
    Teclado
  }
}
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
  #urna{
    width: 1000px;
    height: 500px;
    background-color: var(--ballot-box-background-color);
    padding: 30px;
    border-radius: 5px;
  }
</style>
