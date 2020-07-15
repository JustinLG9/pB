<template>
  <ThemedI :color="$store.getters['colorPalette'].color3" />
</template>

<script>
import { ThemedI } from './styled-components.js';

export default {
  components: { ThemedI }
};
</script>

<style>
</style>