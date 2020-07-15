<template>
  <ThemedButton
    :backgroundColor="$store.getters['colorPalette'].color1Bright"
    :color="$store.getters['colorPalette'].color4"
    :borderColor="$store.getters['colorPalette'].color1Bright"
    :hoverBackgroundColor="$store.getters['colorPalette'].color2"
    :hoverColor="$store.getters['colorPalette'].color3"
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