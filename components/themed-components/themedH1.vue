<template>
  <ThemedH1 :color="$store.getters['colorPalette'].color3">
    <slot></slot>
  </ThemedH1>
</template>

<script>
import { ThemedH1 } from './styled-components.js';

export default {
  components: {
    ThemedH1
  }
};
</script>

<style>
</style>