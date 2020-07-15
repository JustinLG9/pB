<template>
  <ThemedContainerDiv :backgroundColor="$store.getters['colorPalette'].color1">
    <slot></slot>
  </ThemedContainerDiv>
</template>

<script>
import { ThemedContainerDiv } from './styled-components.js';

export default {
  components: {
    ThemedContainerDiv
  }
};
</script>

<style>
</style>