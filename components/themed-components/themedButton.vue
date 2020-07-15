<template>
  <ThemedButton
    :backgroundColor="$store.getters['colorPalette'].color2"
    :color="$store.getters['colorPalette'].color1Bright"
    :borderColor="$store.getters['colorPalette'].color1Bright"
    :hoverBackgroundColor="$store.getters['colorPalette'].color1Bright"
    :hoverColor="$store.getters['colorPalette'].color4"
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

<style>
</style>