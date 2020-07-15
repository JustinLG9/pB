<template>
  <themed-hamburger-div :backgroundColor="$store.getters['colorPalette'].color3" />
</template>

<script>
import { ThemedHamburgerDiv } from './styled-components.js';

export default {
  components: { ThemedHamburgerDiv }
};
</script>

<style>
</style>