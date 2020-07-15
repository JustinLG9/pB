<template>
  <ThemedDiv
    :backgroundColor="$store.getters['colorPalette'].color1Bright"
    :borderColor="$store.getters['colorPalette'].color4"
  >
    <slot></slot>
  </ThemedDiv>
</template>

<script>
import { ThemedDiv } from './styled-components.js';

export default {
  components: { ThemedDiv }
};
</script>

<style>
</style>