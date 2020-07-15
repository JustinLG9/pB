<template>
  <div class="hamburgerContainer">
    <themed-hamburger-div :class="{active: active}" class="bar1" />
    <themed-hamburger-div :class="{active: active}" class="bar2" />
    <themed-hamburger-div :class="{active: active}" class="bar3" />
    <themed-hamburger-div :class="{active: active}" class="bar4" />
  </div>
</template>

<script>
import themedHamburgerDiv from './themed-components/themedHamburgerDiv.vue';

export default {
  props: ['active'],
  components: { themedHamburgerDiv }
};
</script>

<style>
.hamburgerContainer {
  display: flex;
  flex-wrap: wrap;
  height: 30px;
  width: 34px;
}

.bar1,
.bar2,
.bar3,
.bar4 {
  transition: all 0.3s ease;
  height: 6px;
  width: 100%;
  border-radius: 3px;
}

.bar1,
.bar2,
.bar3 {
  margin-bottom: 10px;
}

.bar1 {
  align-self: flex-start;
}

.bar4 {
  align-self: flex-end;
}

.bar2,
.bar3 {
  position: absolute;
  align-self: center;
}

.bar1.active {
  transform: translateY(16px) scale(0.2);
}

.bar4.active {
  transform: translateY(-16px) scale(0.2);
}

.bar2.active {
  transform: rotate(45deg);
}

.bar3.active {
  transform: rotate(-45deg);
}
</style>