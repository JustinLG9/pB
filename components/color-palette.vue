<template>
  <div class="paletteContainer" @click="setColorTheme()">
    <div class="outerPaletteCircle" :style="style">
      <div class="paletteCircle" :style="style">{{ title.slice(0, 1) }}</div>
    </div>
    <themed-p>{{ title }}</themed-p>
  </div>
</template>

<script>
import themedP from './themed-components/themedP.vue';

export default {
  components: { themedP },
  props: {
    colorTheme: Object,
    title: String
  },
  computed: {
    style() {
      return {
        '--color-1': this.colorTheme.color1,
        '--color-1-bright': this.colorTheme.color1Bright,
        '--color-2': this.colorTheme.color2,
        '--color-3': this.colorTheme.color3,
        '--color-3-inactive': this.colorTheme.color3Inactive,
        '--color-4': this.colorTheme.color4
      };
    }
  },
  methods: {
    setColorTheme() {
      this.$store.commit('SET_COLORPALETTE', this.colorTheme);
    }
  }
};
</script>

<style>
.paletteContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}

.outerPaletteCircle {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-bottom: 5px;
  background-color: var(--color-1);
}

.paletteCircle {
  display: flex;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  background-color: var(--color-2);
  color: var(--color-4);
  border-width: 3px;
  border-style: solid;
  border-color: var(--color-3);
}
</style>
