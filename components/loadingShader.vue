<template>
  <div class="shader">
    <hollow-dots-loader />
  </div>
</template>

<script>
import hollowDotsLoader from './hollow-dots-loader.vue';

export default {
  components: {
    hollowDotsLoader
  }
};
</script>

<style>
.shader {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>