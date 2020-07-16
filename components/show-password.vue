<template>
  <div>
    <i v-if="!passwordVisible" class="far fa-eye" @click="togglePassword" />
    <i v-else class="far fa-eye-slash" @click="togglePassword" />
  </div>
</template>

<script>
export default {
  props: { elemID: String },
  data() {
    return {
      passwordVisible: false
    };
  },
  methods: {
    togglePassword() {
      const obj = document.getElementById(`${this.elemID}`);
      obj.type === 'text' ? (obj.type = 'password') : (obj.type = 'type');
      this.passwordVisible = !this.passwordVisible;
    }
  }
};
</script>

<style scoped>
i {
  color: var(--color-2);
  position: relative;
  bottom: 55px;
  left: 90%;
}
i:hover {
  cursor: pointer;
}
</style>
