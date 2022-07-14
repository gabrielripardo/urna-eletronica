<template>
  <div class="progress-bar">
    <div class="background-bar"></div>
    <transition appear type="transition" duration="3" @before-appear="beforeEnter" @after-enter="onAfterEnter"
      @leave="onLeave">
      <div class="tracker-bar"></div>
    </transition>
  </div>
</template>
<script>
export default {
  name: 'ProgressBar',
  props: {
    percentage: Number,
  },
  methods: {
    beforeEnter(el) {
      el.style.width = 0
    },
    onAfterEnter(el) {
      el.style.width = `${this.percentage}%`
      el.style.transition = `width 2s linear`
    },
    onLeave(el, done) {
      // call the done callback to indicate transition end
      // optional if used in combination with CSS
      console.log('feito!!', done);
      done()
    },
  }
}

</script>
<style>
.progress-bar {
  width: 50%;
}

.background-bar {
  /*background: #efefef;*/
  background: none;
  background-position: 170%;
  width: 100%;
  border-radius: 8px;
  height: 7px;
  border: 1px solid #bebebe;
  position: relative;
  z-index: 3;
}

.tracker-bar {
  background: green;
  width: 50%;
  height: 6px;
  transition: width 0.5s linear;
  position: relative;
  top: -6.5px;
  border-radius: 8px;
}
</style>
