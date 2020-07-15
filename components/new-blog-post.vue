<template>
  <themed-div class="blogContainer">
    <themed-h1 class="title">New Post</themed-h1>
    <text-editor ref="textEditor" />
    <themed-button
      class="submitNewPost"
      @click.native="$emit('submit-post', $refs.textEditor.content)"
    >Submit</themed-button>
  </themed-div>
</template>

<script>
import firebase from 'firebase/app';
import Cookies from 'js-cookie';
import textEditor from './quillEditor.vue';
import CryptoJS from 'crypto-js';
import themedDiv from '../components/themed-components/themedDiv.vue';
import themedButton from '../components/themed-components/themedButton.vue';
import themedH1 from '../components/themed-components/themedH1.vue';

const db = firebase.firestore();

export default {
  components: {
    textEditor,
    themedDiv,
    themedButton,
    themedH1
  },
  data() {
    return {
      input: ''
    };
  }
};
</script>

<style scoped>
.blogContainer {
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
