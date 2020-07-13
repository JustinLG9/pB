<template>
  <div>
    <img class="logo" src="../static/pBLogo.png" @click="toggleLogoMenu()" />
    <div v-show="showLogoMenu" class="logoMenu"></div>
    <nuxt @click="hideLogoMenu()" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      showLogoMenu: false
    }
  },
  methods: {
    toggleLogoMenu() {
      this.showLogoMenu = !this.showLogoMenu
    },
    hideLogoMenu() {
      this.showLogoMenu = false
    }
  }
}
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
  position: absolute;
  top: 20px;
  left: 20px;
  width: 50px;
}
.logo:hover {
  cursor: pointer;
}
</style>
