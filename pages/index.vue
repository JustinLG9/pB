<template>
  <themed-container-div class="container">
    <hamburger-button :active="showMenu" class="menuIcon" @click.native="toggleMenu()" />
    <transition name="slide-fade">
      <menuScreen v-if="showMenu" />
    </transition>
    <themed-i
      v-if="isScrolled"
      class="fas fa-arrow-up fa-2x scrollTopIcon"
      @click.native="scrollToTop()"
    />
    <div
      v-infinite-scroll="fetchLimitedPosts"
      infinite-scroll-disabled="loadMoreDocs"
      infinite-scroll-distance="10"
      @click="hideMenu()"
    >
      <br />
      <newBlogPost v-on:submit-post="submitPost($event)" ref="newPost" />
      <br />
      <blogPost
        :ref="post.uID"
        v-for="post in posts"
        :key="post.uID"
        class="blogPost"
        :post="post"
        v-on:edit-post="editPost($event)"
        v-on:delete-post="deletePost($event)"
      />
      <themed-p
        v-if="posts.length === 0"
        class="footerMessage"
      >Looks like you haven't posted yet. Give it a try above!</themed-p>
      <themed-p
        v-if="posts.length !== 0 && allDocumentsLoaded"
        class="footerMessage"
      >That's all your posts!</themed-p>
    </div>
  </themed-container-div>
</template>

<script>
import firebase from 'firebase/app';
import Cookies from 'js-cookie';
import newBlogPost from '../components/new-blog-post.vue';
import blogPost from '../components/blog-post.vue';
import menuScreen from '../components/menu.vue';
import CryptoJS from 'crypto-js';
import themedI from '../components/themed-components/themedI.vue';
import themedContainerDiv from '../components/themed-components/themedContainerDiv.vue';
import themedP from '../components/themed-components/themedP.vue';
import hamburgerButton from '../components/hamburger-button.vue';

const db = firebase.firestore();

let docsLoaded = 0;

export default {
  components: {
    newBlogPost,
    blogPost,
    menuScreen,
    themedI,
    themedContainerDiv,
    themedP,
    hamburgerButton
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
      isScrolled: false,
      loadingDocs: false,
      lastDateCreated: 9999999999999,
      allDocumentsLoaded: false
    };
  },

  mounted() {
    window.addEventListener('scroll', this.setIsScrolled, {
      passive: true
    });

    this.setIsScrolled();

    // this.fetchUserPosts();
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
    generateUID() {
      let s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      };
      //return id of format 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaaaaaaaaaa'
      return s4() + s4() + '-' + +s4() + '-' + s4() + '-' + s4() + s4() + s4();
    },
    encryptString(str, key) {
      return CryptoJS.AES.encrypt(str, key).toString();
    },
    decryptString(str, key) {
      let bytes = CryptoJS.AES.decrypt(str, key);
      return bytes.toString(CryptoJS.enc.Utf8);
    },
    fetchUserPosts() {
      db.collection('users')
        .doc(
          this.decryptString(Cookies.get('access_token'), this.$store.state.key)
        )
        .collection('posts')
        .onSnapshot((snapshot) => {
          snapshot.docChanges().forEach((change) => {
            let decryptedData = change.doc().data;
            decryptedData.content = this.decryptString(
              decryptedData.content,
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
                  index =
                    this.posts.findIndex((post, index) => {
                      return (
                        decryptedData.dateCreated < post.dateCreated &&
                        decryptedData.dateCreated >
                          this.posts[index + 1].dateCreated
                      );
                    }) + 1;
                }
              }
              this.posts.splice(index, 0, decryptedData);
            }
            if (change.type === 'modified') {
              const index = this.posts.findIndex(
                (post) => post.uID === decryptedData.uID
              );
              this.posts.splice(index, 1, decryptedData);
            }
            if (change.type === 'removed') {
              const index = this.posts.findIndex(
                (post) => post.uID === decryptedData.uID
              );
              this.posts.splice(index, 1);
            }
          });
        });
    },
    fetchLimitedPosts() {
      this.loadingDocs = true;
      db.collection('users')
        .doc(
          this.decryptString(Cookies.get('access_token'), this.$store.state.key)
        )
        .collection('posts')
        .orderBy('dateCreated', 'desc')
        .limit(5)
        .startAfter(this.lastDateCreated)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            let decryptedData = doc.data();
            decryptedData.content = this.decryptString(
              decryptedData.content,
              this.$store.state.key
            );
            this.posts.push(decryptedData);
            this.lastDateCreated = decryptedData.dateCreated;
          });

          if (querySnapshot.docs.length !== 5) {
            this.allDocumentsLoaded = true;
          }
          this.loadingDocs = false;
        });
    },
    deletePost(post) {
      db.collection('users')
        .doc(
          this.decryptString(Cookies.get('access_token'), this.$store.state.key)
        )
        .collection('posts')
        .doc(post.uID)
        .delete()
        .then(() => {
          console.log('Document successfully deleted!');
          const index = this.posts.findIndex(
            (localPost) => localPost.uID === post.uID
          );
          this.posts.splice(index, 1);
        })
        .catch(function(error) {
          alert(
            'Error deleting post. Please check your internet connection and try again.'
          );
          console.error('Error removing document: ', error);
        });
    },
    editPost(data) {
      const content = data.content;
      const post = data.post;
      if (content) {
        const docData = {
          content: this.encryptString(content, this.$store.state.key),
          dateCreated: post.dateCreated,
          dateEdited: Date.now(),
          uID: post.uID
        };

        db.collection('users')
          .doc(
            this.decryptString(
              Cookies.get('access_token'),
              this.$store.state.key
            )
          )
          .collection('posts')
          .doc(post.uID)
          .set(docData)
          .then(() => {
            console.log('Document successfully updated!');
            const index = this.posts.findIndex(
              (localPost) => localPost.uID === post.uID
            );
            const decryptedData = {
              content: content,
              dateCreated: post.dateCreated,
              dateEdited: docData.dateEdited,
              uID: post.uID
            };
            this.posts.splice(index, 1, decryptedData);
            this.$refs[post.uID][0].editPost = false;
          })
          .catch((error) => {
            alert(
              'Error updating entry. Please check your internet connection and try again.'
            );
            console.error('Error updating document: ', error);
          });
      }
    },
    submitPost(content) {
      if (content) {
        const docData = {
          content: this.encryptString(content, this.$store.state.key),
          dateCreated: Date.now(),
          dateEdited: Date.now(),
          uID: this.generateUID()
        };

        db.collection('users')
          .doc(
            this.decryptString(
              Cookies.get('access_token'),
              this.$store.state.key
            )
          )
          .collection('posts')
          .doc(docData.uID)
          .set(docData)
          .then(() => {
            console.log('Document successfully written!');
            // add new post to local posts data for rendering
            let decryptedData = docData;
            decryptedData.content = content;
            this.posts.unshift(decryptedData);

            this.$refs.newPost.$refs.textEditor.content = '';
          })
          .catch((error) => {
            alert(
              'Error saving entry. Please check your internet connection and try again.'
            );
            console.error('Error adding document: ', error);
          });
      }
    }
  },
  computed: {
    loadMoreDocs() {
      return this.allDocumentsLoaded || this.loadingDocs;
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
}

.menuIcon,
.scrollTopIcon {
  position: fixed;
  cursor: pointer;
}

.menuIcon {
  top: calc(8px + (35 - 8) * ((100vw - 340px) / (1600 - 340)));
  right: calc(8px + (35 - 8) * ((100vw - 340px) / (1600 - 340)));
  z-index: 9999;
}

.scrollTopIcon {
  bottom: calc(8px + (50 - 8) * ((100vw - 340px) / (1600 - 340)));
  left: calc(8px + (50 - 8) * ((100vw - 340px) / (1600 - 340)));
}

.title {
  font-weight: 300;
  font-size: 42px;
  word-spacing: 5px;
  padding-bottom: 15px;
  display: flex;
  align-items: left;
  margin-left: 15px;
}

.menuShowing {
  opacity: 0.5;
}

.footerMessage {
  margin-bottom: 60px;
}

/* menu animation */
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
