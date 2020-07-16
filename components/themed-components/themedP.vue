<template>
  <ThemedP :color="$store.getters['colorPalette'].color4">
    <slot></slot>
  </ThemedP>
</template>

<script>
import { ThemedP } from './styled-components.js';

export default {
  components: {
    ThemedP
  }
};
</script>

<style></style>
