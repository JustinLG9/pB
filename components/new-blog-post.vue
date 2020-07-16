<template>
  <themed-div class="blogContainer">
    <themed-h1 class="title">New Post</themed-h1>

    <text-editor ref="textEditor" />
    <themed-button class="submitNewPost" @click.native="submitPost">Submit</themed-button>

    <loading-shader v-if="submitting" />
  </themed-div>
</template>

<script>
import themedDiv from '../components/themed-components/themedDiv.vue';
import themedButton from '../components/themed-components/themedButton.vue';
import themedH1 from '../components/themed-components/themedH1.vue';
import textEditor from './quillEditor.vue';
import loadingShader from './loadingShader.vue';

export default {
  components: {
    textEditor,
    themedDiv,
    themedButton,
    themedH1,
    loadingShader
  },
  data() {
    return {
      input: '',
      submitting: false
    };
  },
  methods: {
    submitPost() {
      this.submitting = true;
      setTimeout(() => {
        this.$emit('submit-post', this.$refs.textEditor.content);
      }, 1000);
    }
  }
};
</script>

<style scoped>
.blogContainer {
  position: relative;
  width: calc(280px + (1000 - 280) * ((100vw - 340px) / (1600 - 340)));
  border-width: 1px;
  border-style: solid;
  border-radius: 10px;
  padding: 25px;
  margin: 60px 40px;
  box-shadow: 0 1px 4px 0 rgba(255, 255, 255, 0.3);
}

.submitNewPost {
  display: inline-block;
  border-radius: 4px;
  border-width: 1px;
  border-style: solid;
  padding: 10px 30px;
  margin-top: 30px;
  outline: none;
}

.submitNewPost:hover {
  cursor: pointer;
}
</style>
