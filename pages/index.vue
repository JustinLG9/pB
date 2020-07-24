<template>
  <themed-container-div class="container">
    <hamburger-button
      :active="showMenu"
      class="menuIcon"
      @click.native="toggleMenu()"
    />
    <transition name="slide-fade">
      <menuScreen v-if="showMenu" @toggle-pop-up="togglePopUp" />
    </transition>
    <themed-i
      v-if="isScrolled"
      class="fas fa-arrow-up fa-2x scrollTopIcon"
      @click.native="scrollToTop()"
    />
    <div
      v-infinite-scroll="fetchLimitedPosts"
      infinite-scroll-disabled="disableInfiniteScroll"
      infinite-scroll-distance="10"
      @click="hideMenu()"
    >
      <br />
      <newBlogPost ref="newPost" @submit-post="submitPost($event)" />
      <br />
      <blogPost
        v-for="post in posts"
        :ref="post.uID"
        :key="post.uID"
        class="blogPost"
        :post="post"
        @edit-post="editPost($event)"
        @delete-post="deletePost($event)"
      />
      <themed-p v-if="posts.length === 0" class="footerMessage"
        >Looks like you haven't posted yet. Give it a try above!</themed-p
      >
      <themed-p v-else-if="allDocumentsLoaded" class="footerMessage"
        >That's all your posts!</themed-p
      >
      <div v-else class="footerMessage">
        <hollow-dots-loader />
      </div>
    </div>

    <pop-up :show-pop-up="showSecurityPopUp" @toggle-pop-up="togglePopUp">
      <themed-h1 class="popUpTitle">Security</themed-h1>

      <themed-p class="popUpParagraph">
        Looking for confidential journaling? You've come to the right place! All
        your entries are encrypted before they reach our database, ensuring that
        you and only you have access to your information.
      </themed-p>
      <themed-p class="popUpParagraph">
        Not on a shared device? We generally don't keep you logged in to add an
        extra layer of protection but if this isn't a shared computer feel free
        to check the box below!
      </themed-p>
      <div class="keepLoggedIn">
        <themed-p>Keep Me Logged In</themed-p>
        <input
          v-model="keepLoggedIn"
          type="checkbox"
          class="checkbox"
          @change="toggleKeepLoggedIn"
        />
      </div>
    </pop-up>
  </themed-container-div>
</template>

<script>
import firebase from 'firebase/app';
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';
import hollowDotsLoader from '../components/hollow-dots-loader.vue';
import newBlogPost from '../components/new-blog-post.vue';
import blogPost from '../components/blog-post.vue';
import menuScreen from '../components/menu.vue';
import themedI from '../components/themed-components/themedI.vue';
import themedContainerDiv from '../components/themed-components/themedContainerDiv.vue';
import themedP from '../components/themed-components/themedP.vue';
import themedH1 from '../components/themed-components/themedH1.vue';
import hamburgerButton from '../components/hamburger-button.vue';
import popUp from '../components/popUp.vue';

const db = firebase.firestore();

export default {
  components: {
    newBlogPost,
    blogPost,
    menuScreen,
    themedI,
    themedContainerDiv,
    themedP,
    hamburgerButton,
    popUp,
    themedH1,
    hollowDotsLoader
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

  head() {
    return {
      title: 'Private Journal'
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
      allDocumentsLoaded: false,
      showSecurityPopUp: false,
      keepLoggedIn: Boolean(Cookies.get('access_token')),
      stateRehydrated: false
    };
  },

  computed: {
    disableInfiniteScroll() {
      if (this.stateRehydrated) {
        return this.allDocumentsLoaded || this.loadingDocs;
      } else {
        return true;
      }
    },
    isStateRehydrated() {
      return Boolean(this.$store.state.UID) && Boolean(this.$store.state.key);
    }
  },

  watch: {
    isStateRehydrated(newData, oldData) {
      if (newData) {
        this.stateRehydrated = true;
      }
    }
  },

  mounted() {
    window.addEventListener('scroll', this.setIsScrolled, {
      passive: true
    });

    this.setIsScrolled();

    if (this.isStateRehydrated) {
      this.stateRehydrated = true;
    }
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
    togglePopUp() {
      this.showSecurityPopUp = !this.showSecurityPopUp;
    },
    setIsScrolled() {
      this.isScrolled = window.scrollY > 0;
    },
    generateUID() {
      const s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      };
      // return id of format 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaaaaaaaaaa'
      return s4() + s4() + '-' + +s4() + '-' + s4() + '-' + s4() + s4() + s4();
    },
    encryptString(str, key) {
      return CryptoJS.AES.encrypt(str, key).toString();
    },
    decryptString(str, key) {
      const bytes = CryptoJS.AES.decrypt(str, key);
      return bytes.toString(CryptoJS.enc.Utf8);
    },
    fetchLimitedPosts() {
      this.loadingDocs = true;
      setTimeout(() => {
        db.collection('users')
          .doc(this.$store.state.UID)
          .collection('posts')
          .orderBy('dateCreated', 'desc')
          .limit(5)
          .startAfter(this.lastDateCreated)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              const decryptedData = doc.data();
              decryptedData.content = this.decryptString(
                decryptedData.content,
                this.$store.state.key
              );

              this.posts.push(decryptedData);
              this.lastDateCreated = decryptedData.dateCreated;
            });

            if (querySnapshot.docs.length !== 5 || querySnapshot.empty) {
              this.allDocumentsLoaded = true;
            }
            this.loadingDocs = false;
          })
          .catch((error) => {
            console.error('Error getting documents: ', error);
            alert(
              'Error retrieving previous posts. Please check your internet connection and try again.'
            );
          });
      }, 1000);
    },
    deletePost(post) {
      db.collection('users')
        .doc(this.$store.state.UID)
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
          this.$refs[post.uID][0].loading = false;
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
          .doc(this.$store.state.UID)
          .collection('posts')
          .doc(post.uID)
          .set(docData)
          .then(() => {
            console.log('Document successfully updated!');
            const index = this.posts.findIndex(
              (localPost) => localPost.uID === post.uID
            );
            const decryptedData = {
              content,
              dateCreated: post.dateCreated,
              dateEdited: docData.dateEdited,
              uID: post.uID
            };

            this.posts.splice(index, 1, decryptedData);
            this.$refs[post.uID][0].editPost = false;
            this.$refs[post.uID][0].loading = false;
          })
          .catch((error) => {
            alert(
              'Error updating entry. Please check your internet connection and try again.'
            );
            this.$refs[post.uID][0].loading = false;
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
          .doc(this.$store.state.UID)
          .collection('posts')
          .doc(docData.uID)
          .set(docData)
          .then(() => {
            console.log('Document successfully written!');
            // add new post to local posts data for rendering
            const decryptedData = docData;
            decryptedData.content = content;
            this.posts.unshift(decryptedData);

            this.$refs.newPost.$refs.textEditor.content = '';
            this.$refs.newPost.submitting = false;
          })
          .catch((error) => {
            alert(
              'Error saving entry. Please check your internet connection and try again.'
            );
            this.$refs.newPost.submitting = false;
            console.error('Error adding document: ', error);
          });
      }
    },
    toggleKeepLoggedIn() {
      if (this.keepLoggedIn) {
        const uid = firebase.auth().currentUser.uid;
        Cookies.set(
          'access_token',
          this.encryptString(uid, this.$store.state.key)
        );
      } else {
        Cookies.remove('access_token');
      }
    }
  }
};
</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
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
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Pop Up */
.popUpParagraph {
  margin-top: 30px;
  margin-bottom: 30px;
}
.keepLoggedIn {
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
}
.checkbox {
  margin-left: 30px;
  height: 30px;
  width: 30px;
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
