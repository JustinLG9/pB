<template>
  <div class="lockBorder">
    <span
      class="lock"
      :class="{ unlocked: unlocked }"
      @click="unlocked = !unlocked"
    ></span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      unlocked: false
    }
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  --locked-color: #5fadbf;
  --unlocked-color: #ef8a17;
}
.lockBorder {
  --lock-size: 70px;
  background-color: #0e273c;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  width: 200px;
  border-radius: 50%;
  box-shadow: 0 0 15px 0px black;
}
.lock {
  width: var(--lock-size);
  height: calc(var(--lock-size) * 7 / 8);
  border: calc(var(--lock-size) * 1 / 8) solid var(--locked-color);
  border-radius: 5px;
  position: relative;
  top: 5%;
  cursor: pointer;
  -webkit-transition: all 0.1s ease-in-out;
  transition: all 0.1s ease-in-out;
}
.lock:after {
  content: '';
  display: block;
  background: var(--locked-color);
  width: calc(var(--lock-size) * 1 / 8);
  height: calc(var(--lock-size) * 2 / 8);
  position: absolute;
  top: calc(var(--lock-size) * 4 / 16);
  left: calc(var(--lock-size) * 5.5 / 16);
  margin: -3.5px 0 0 -2px;
  -webkit-transition: all 0.1s ease-in-out;
  transition: all 0.1s ease-in-out;
}
.lock:before {
  content: '';
  display: block;
  width: calc(var(--lock-size) * 5 / 8);
  height: calc(var(--lock-size) * 5 / 8);
  bottom: 100%;
  position: absolute;
  left: 50%;
  margin-left: -40%;
  border: calc(var(--lock-size) * 1 / 8) solid var(--locked-color);
  border-top-right-radius: 50%;
  border-top-left-radius: 50%;
  border-bottom: 0;
  -webkit-transition: all 0.1s ease-in-out;
  transition: all 0.1s ease-in-out;
}
/* Locked Hover */
.lock:hover:before {
  height: calc(var(--lock-size) * 5 / 8 + var(--lock-size) * 0.1);
}
/* Unlocked */
.unlocked {
  transform: rotate(10deg);
}
.unlocked:before {
  bottom: 125%;
  left: 0%;
  margin-left: -15px;
  transform: rotate(-45deg);
}
.unlocked,
.unlocked:before {
  border-color: var(--unlocked-color);
}
.unlocked:after {
  background: var(--unlocked-color);
}
.unlocked:hover:before {
  height: calc(var(--lock-size) * 5 / 8);
}
</style>
