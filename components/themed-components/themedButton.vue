<template>
  <ThemedButton
    :background-color="$store.getters['colorPalette'].color2"
    :color="$store.getters['colorPalette'].color1Bright"
    :border-color="$store.getters['colorPalette'].color1Bright"
    :hover-background-color="$store.getters['colorPalette'].color1Bright"
    :hover-color="$store.getters['colorPalette'].color4"
  >
    <slot></slot>
  </ThemedButton>
</template>

<script>
import { ThemedButton } from './styled-components.js';

export default {
  components: { ThemedButton }
};
</script>

<style></style>
