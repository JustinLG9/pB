<template>
  <div
    v-if="showPopUp"
    class="popUpShader"
    @click.native="$emit('toggle-pop-up')"
  >
    <themed-bright-div class="popUpWindow">
      <themed-p class="popUpTitle">Security</themed-p>
    </themed-bright-div>
  </div>
</template>

<script>
export default {
  props: { showPopUp: Boolean }
};
</script>

<style>
.securityPopUpShader {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
}

.securityPopUp {
  border-radius: 10px;
  padding: 25px;
}
</style>
