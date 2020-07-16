<template>
  <ThemedButton
    :background-color="$store.getters['colorPalette'].color1Bright"
    :color="$store.getters['colorPalette'].color4"
    :border-color="$store.getters['colorPalette'].color1Bright"
    :hover-background-color="$store.getters['colorPalette'].color2"
    :hover-color="$store.getters['colorPalette'].color3"
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
