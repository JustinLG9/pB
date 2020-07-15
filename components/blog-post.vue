<template>
  <themed-div class="blogContainer">
    <themed-h1
      class="blogPostDate title"
      @mouseenter.native="showTime = true"
      @mouseleave.native="showTime = false"
    >{{ utcToDate(post.dateCreated) }}</themed-h1>
    <themed-p v-if="showTime" class="blogPostTime">{{ utcToTime(post.dateCreated) }}</themed-p>
    <themed-p class="blogPostContent" v-html="post.content" />
    <themed-i v-if="editMode" class="fas fa-times fa-2x deletePost" @click.native="deletePost" />
  </themed-div>
</template>

<script>
import firebase from 'firebase/app';
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';
import themedDiv from '../components/themed-components/themedDiv.vue';
import themedH1 from '../components/themed-components/themedH1.vue';
import themedP from '../components/themed-components/themedP.vue';
import themedI from '../components/themed-components/themedI.vue';

const db = firebase.firestore();

export default {
  props: ['post'],
  data() {
    return {
      showTime: false
    };
  },
  components: {
    themedDiv,
    themedH1,
    themedP,
    themedI
  },
  computed: {
    editMode() {
      return this.$store.state.editMode;
    }
  },
  methods: {
    utcToDate(utcDate) {
      let date = new Date(utcDate);
      date = date.toDateString();
      const lastIndex = date.lastIndexOf(' ');

      return date.substring(0, lastIndex);
    },
    utcToTime(time) {
      const date = new Date(time);
      let hours = date.getHours();
      const meridiam = hours > 11 ? 'pm' : 'am';
      hours = hours > 11 ? hours - 12 : hours;
      hours = hours === 0 ? 1 : hours;
      let minutes = date.getMinutes();
      minutes = String(minutes).length === 1 ? '0' + minutes : minutes;
      let seconds = date.getSeconds();
      seconds = String(seconds).length === 1 ? '0' + seconds : seconds;

      return hours + ':' + minutes + ' ' + meridiam;
    },
    decryptString(str, key) {
      let bytes = CryptoJS.AES.decrypt(str, key);
      return bytes.toString(CryptoJS.enc.Utf8);
    },
    deletePost() {
      db.collection('users')
        .doc(
          this.decryptString(Cookies.get('access_token'), this.$store.state.key)
        )
        .collection('posts')
        .doc(this.post.uID)
        .delete()
        .then(function() {
          console.log('Document successfully deleted!');
        })
        .catch(function(error) {
          console.error('Error removing document: ', error);
        });
    }
  }
};
</script>

<style>
.blogPostContent > blockquote {
  border-left: 5px solid gray;
  padding: 0px 0px 0px 20px;
  margin: 5px 0;
  font-style: italic;
}
</style>

<style scoped>
.blogContainer {
  width: calc(280px + (1000 - 280) * ((100vw - 340px) / (1600 - 340)));
  border-width: 1px;
  border-style: solid;
  border-radius: 10px;
  padding: 25px;
  margin: 40px;
  box-shadow: 0 1px 4px 0 rgba(255, 255, 255, 0.3);
  position: relative;
}
.blogPostContent {
  margin: 25px;
  text-align: justify;
}
.blogPostTime {
  position: absolute;
  top: 75px;
  left: 60px;
}
.deletePost {
  position: absolute;
  top: 15px;
  right: 15px;
}
.deletePost:hover {
  cursor: pointer;
}
</style>
