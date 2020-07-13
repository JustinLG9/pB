<template>
  <div class="container">
    <i class="fas fa-bars fa-2x menuIcon" @click="toggleMenu()"></i>
    <div v-if="showMenu" class="menu">
      <menuScreen />
    </div>
    <i v-if="isScrolled" class="fas fa-arrow-up fa-2x scrollTopIcon" @click="scrollToTop()"></i>
    <div @click="hideMenu()">
      <br />
      <newBlogPost />
      <br />
      <blogPost v-for="post in posts" :key="post.uID" class="blogPost" :post="post" />
      <div
        v-if="posts.length == 0"
        class="noPostsMessage"
      >Looks like you haven't posted yet. Give it a try above!</div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import Cookies from 'js-cookie';
import newBlogPost from '../components/new-blog-post.vue';
import blogPost from '../components/blog-post.vue';
import menuScreen from '../components/menu.vue';
import CryptoJS from 'crypto-js';

const db = firebase.firestore();

export default {
  components: {
    newBlogPost,
    blogPost,
    menuScreen
  },

  asyncData({ req, redirect }) {
    if (process.server) {
      if (!req.headers.cookie) {
        redirect('/login');
      }
    } else {
      const user = firebase.auth().currentUser;
      if (!user) {
        redirect('/login');
      }
    }
  },

  data() {
    return {
      posts: [],
      menuItems: [
        { item: 'Edit', icon: 'fa-pencil-alt' },
        { item: 'Color Scheme', icon: 'fa-palette' },
        { item: 'Logout', icon: 'fa-sign-out-alt' }
      ],
      showMenu: false,
      isScrolled: false
    };
  },

  mounted() {
    window.addEventListener('scroll', this.setIsScrolled, {
      passive: true
    });

    this.setIsScrolled();

    this.fetchUserPosts();
  },

  destroyed() {
    window.removeEventListener('scroll', this.setIsScrolled, {
      passive: true
    });
  },

  methods: {
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
    hideMenu() {
      this.showMenu = false;
    },
    setIsScrolled() {
      this.isScrolled = window.scrollY > 0;
    },
    decryptObj(objJSON, key) {
      let bytes = CryptoJS.AES.decrypt(objJSON, key);
      return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    },
    fetchUserPosts() {
      db.collection('users')
        .doc(Cookies.get('access_token'))
        .collection('posts')
        .onSnapshot((snapshot) => {
          snapshot.docChanges().forEach((change) => {
            const decryptedData = this.decryptObj(
              change.doc.data().encryptedData,
              this.$store.state.key
            );
            if (change.type === 'added') {
              // add in order of dateCreated
              let index = 0;
              if (this.posts.length) {
                if (decryptedData.dateCreated > this.posts[0].dateCreated) {
                  index = 0;
                } else if (
                  decryptedData.dateCreated <
                  this.posts[this.posts.length - 1].dateCreated
                ) {
                  index = this.posts.length;
                } else {
                  index = this.posts.findIndex((post, index) => {
                    decryptedData.dateCreated < post.dateCreated &&
                      decryptedData.dateCreated >
                        this.posts[index + 1].dateCreated;
                  });
                }
              }
              this.posts.splice(index, 0, decryptedData);
            }
            if (change.type === 'removed') {
              const index = this.posts.findIndex(
                (post) => post.uID === decryptedData.uID
              );
              this.posts.splice(index, 1);
            }
          });
        });
    }
  }
};
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: var(--color-1);
}

.menuIcon,
.scrollTopIcon {
  position: fixed;
  cursor: pointer;
  color: var(--color-2);
}

.menuIcon {
  top: calc(8px + (50 - 8) * ((100vw - 340px) / (1600 - 340)));
  right: calc(8px + (50 - 8) * ((100vw - 340px) / (1600 - 340)));
}

.scrollTopIcon {
  bottom: calc(8px + (50 - 8) * ((100vw - 340px) / (1600 - 340)));
  left: calc(8px + (50 - 8) * ((100vw - 340px) / (1600 - 340)));
}

.title {
  font-weight: 300;
  font-size: 42px;
  color: var(--color-2);
  word-spacing: 5px;
  padding-bottom: 15px;
  display: flex;
  align-items: left;
  margin-left: 15px;
}

.noPostsMessage {
  color: var(--color-2);
}
</style>
