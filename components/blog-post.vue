<template>
  <themed-div class="blogContainer">
    <themed-h1
      class="blogPostDate title"
      @mouseenter.native="showTime = true"
      @mouseleave.native="showTime = false"
      >{{ utcToDate(post.dateCreated) }}</themed-h1
    >
    <themed-p v-if="showTime" class="blogPostTime">{{
      utcToTime(post.dateCreated)
    }}</themed-p>

    <themed-p v-if="!editPost" class="blogPostContent" v-html="post.content" />
    <div v-else>
      <text-editor ref="textEditor" :previous-content="post.content" />
      <themed-button class="submitEditedPost" @click.native="submitEditedPost"
        >Submit</themed-button
      >
    </div>

    <div class="editIcons">
      <themed-i
        v-if="editMode"
        class="fas fa-pencil-alt editPost"
        @click.native="toggleEditPost"
      />
      <themed-i
        v-if="editMode"
        class="fas fa-times fa-2x deletePost"
        @click.native="deletePost"
      />
    </div>

    <loading-shader v-if="loading" />
  </themed-div>
</template>

<script>
import themedDiv from '../components/themed-components/themedDiv.vue';
import themedH1 from '../components/themed-components/themedH1.vue';
import themedP from '../components/themed-components/themedP.vue';
import themedI from '../components/themed-components/themedI.vue';
import themedButton from '../components/themed-components/themedButton.vue';
import textEditor from './quillEditor.vue';
import loadingShader from './loadingShader.vue';

export default {
  components: {
    themedDiv,
    themedH1,
    themedP,
    themedI,
    themedButton,
    textEditor,
    loadingShader
  },
  props: {
    post: Object
  },
  data() {
    return {
      showTime: false,
      editPost: false,
      loading: false
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

      return hours + ':' + minutes + ' ' + meridiam;
    },
    toggleEditPost() {
      this.editPost = !this.editPost;
    },
    deletePost() {
      this.loading = true;
      setTimeout(() => {
        this.$emit('delete-post', this.post);
      }, 1000);
    },
    submitEditedPost() {
      this.loading = true;
      setTimeout(() => {
        this.$emit('edit-post', {
          post: this.post,
          content: this.$refs.textEditor.content
        });
      }, 1000);
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
.editIcons {
  position: absolute;
  top: 15px;
  right: 15px;
  display: flex;
  align-items: center;
}
.editPost {
  margin-right: 20px;
  font-size: 25px;
}
.deletePost:hover,
.editPost:hover {
  cursor: pointer;
}

.submitEditedPost {
  display: inline-block;
  border-radius: 4px;
  border-width: 1px;
  border-style: solid;
  padding: 10px 30px;
  margin-top: 30px;
  outline: none;
}

.submitEditedPost:hover {
  cursor: pointer;
}
</style>
