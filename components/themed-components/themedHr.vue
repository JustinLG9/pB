<template>
  <themed-hr :color="$store.getters['colorPalette'].color4" />
</template>

<script>
import { ThemedHr } from './styled-components.js';

export default {
  components: { ThemedHr }
};
</script>

<style></style>
