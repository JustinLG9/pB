<template>
  <div>
    <themed-h1 class="logo" @click.native="toggleLogoMenu()">pB</themed-h1>
    <div v-show="showLogoMenu" class="logoMenu"></div>
    <nuxt @click="hideLogoMenu()" />
  </div>
</template>

<script>
import themedH1 from '../components/themed-components/themedH1.vue';

export default {
  data() {
    return {
      showLogoMenu: false
    };
  },
  components: {
    themedH1
  },
  methods: {
    toggleLogoMenu() {
      this.showLogoMenu = !this.showLogoMenu;
    },
    hideLogoMenu() {
      this.showLogoMenu = false;
    }
  },
  computed: {
    palette() {
      return {
        '--color-1': this.$store.state.colorPalette.color1,
        '--color-2': this.$store.state.colorPalette.color2,
        '--color-3': this.$store.state.colorPalette.color3,
        '--color-3-inactive': this.$store.state.colorPalette.color3Inactive,
        '--color-4': this.$store.state.colorPalette.color4,
        '--color-5': this.$store.state.colorPalette.color5
      };
    }
  }
};
</script>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  --color-1: #064948;
  --color-1-bright: #3b8070;
  --color-2: #eda02d;
  --color-2-inactive: #a38436;
  --color-3: #0e273c;
  --color-4: white;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.logo {
  font-family: 'Comic Sans MS';
  position: absolute;
  top: 15px;
  left: 25px;
  font-size: 35px;
}
.logo:hover {
  cursor: pointer;
}
</style>
