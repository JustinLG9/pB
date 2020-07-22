<template>
  <div
    v-if="showPopUp"
    class="popUpShader"
    @click.native="$emit('toggle-pop-up')"
  >
    <themed-bright-div class="popUpWindow">
      <themed-i
        class="fas fa-times fa-2x closePopUp"
        @click.native="$emit('toggle-pop-up')"
      />
      <slot></slot>
    </themed-bright-div>
  </div>
</template>

<script>
import themedBrightDiv from './themed-components/themedBrightDiv.vue';
import themedI from './themed-components/themedI.vue';

export default {
  components: { themedBrightDiv, themedI },
  props: { showPopUp: Boolean }
};
</script>

<style>
.popUpShader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
}
.popUpWindow {
  border-radius: 10px;
  padding: 40px;
  max-width: 600px;
  position: relative;
}
.closePopUp {
  position: absolute;
  top: 20px;
  right: 25px;
}
.closePopUp:hover {
  cursor: pointer;
}
</style>
