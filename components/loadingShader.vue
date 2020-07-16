<template>
  <div class="shader">
    <hollow-dots-spinner :animation-duration="1000" :dot-size="15" :dots-num="3" color="white" />
  </div>
</template>

<script>
import { HollowDotsSpinner } from 'epic-spinners';

export default {
  components: {
    HollowDotsSpinner
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