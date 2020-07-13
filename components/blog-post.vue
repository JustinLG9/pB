<template>
  <div class="blogContainer">
    <h1
      class="blogPostDate title"
      @mouseenter="showTime = true"
      @mouseleave="showTime = false"
    >{{ utcToDate(post.dateCreated) }}</h1>
    <h5 v-if="showTime" class="blogPostTime">{{ utcToTime(post.dateCreated) }}</h5>
    <div class="blogPostContent" v-html="post.content"></div>
    <i v-if="editMode" class="fas fa-times fa-2x deletePost" @click="deletePost"></i>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import Cookies from 'js-cookie';

const db = firebase.firestore();

export default {
  props: ['post'],
  data() {
    return {
      showTime: false
    };
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
    deletePost() {
      db.collection('users')
        .doc(Cookies.get('access_token'))
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
  background-color: #0e273c;
  border: 1px solid var(--color-4);
  border-radius: 10px;
  padding: 25px;
  margin: 40px;
  box-shadow: 0 1px 4px 0 rgba(255, 255, 255, 0.3);
  position: relative;
}
.blogPostContent {
  color: var(--color-4);
  margin: 25px;
  text-align: justify;
}
.blogPostTime {
  position: absolute;
  top: 75px;
  left: 60px;
  color: var(--color-4);
}
.deletePost {
  color: var(--color-2);
  position: absolute;
  top: 15px;
  right: 15px;
}
.deletePost:hover {
  cursor: pointer;
}
</style>
