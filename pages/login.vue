<template>
  <div class="login">
    <lockIcon v-if="!signingUp" :signed-in="signedIn" />
    <div v-else class="userBorder">
      <i class="fas fa-user-plus fa-5x userIcon"></i>
    </div>
    <form @submit.prevent="submitForm">
      <div class="email formField">
        <input
          v-model="email"
          :class="{ activeBorder: email }"
          type="email"
          placeholder="PrivateJournaling@gmail.com"
        />
      </div>
      <div class="password formField">
        <input
          id="passwordField"
          v-model="password"
          :class="{ activeBorder: password }"
          type="password"
          placeholder="Password"
        />
        <show-password :elem-i-d="'passwordField'" />
      </div>
      <div v-if="signingUp" class="passwordConfirm formField">
        <input
          id="confirmPasswordField"
          v-model="passwordConfirm"
          :class="{ activeBorder: passwordConfirm }"
          type="password"
          placeholder="Confirm Password"
        />
        <show-password :elem-i-d="'confirmPasswordField'" />
      </div>
      <button v-if="!signingUp">Log In</button>
      <button v-else>Sign Up</button>
      <div class="keepLoggedIn">
        <p class="keepLoggedInMessage">Keep Me Logged In</p>
        <input v-model="keepLoggedIn" type="checkbox" class="checkbox" />
      </div>
    </form>
    <div v-if="error" class="error">{{ error.message }}</div>
    <div class="toggleLoginSignUp" @click="toggleLoginSignUp">
      {{ loginSignUpMessage }}
    </div>
    <loading-shader v-if="signingIn" />
  </div>
</template>

<script>
import firebase from 'firebase/app';
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';
import lockIcon from '../components/lock-icon.vue';
import showPassword from '../components/show-password.vue';
import loadingShader from '../components/loadingShader.vue';

export default {
  components: {
    lockIcon,
    showPassword,
    loadingShader
  },
  head() {
    return {
      title: 'Login'
    };
  },
  data() {
    return {
      email: '',
      password: '',
      passwordConfirm: '',
      error: '',
      signingUp: false,
      loginSignUpMessage: 'New user? Sign up',
      keepLoggedIn: false,
      signedIn: false,
      signingIn: false
    };
  },
  methods: {
    encryptString(str, key) {
      return CryptoJS.AES.encrypt(str, key).toString();
    },
    setupStoreAndCookies() {
      const uid = firebase.auth().currentUser.uid;
      if (uid) {
        this.$store.commit('SET_UID', uid);
        this.$store.commit('SET_KEY', this.password);

        if (this.keepLoggedIn) {
          Cookies.set(
            'access_token',
            this.encryptString(uid, this.$store.state.key)
          );
        }
      }
    },
    updateErrorMessage() {
      const message = this.error.message;
      if (message === 'The email address is badly formatted.')
        this.error.message = 'Invalid email address';
      else if (
        message ===
        'There is no user record corresponding to this identifier. The user may have been deleted.'
      )
        this.error.message = 'User does not exist';
    },
    toggleLoginSignUp() {
      this.signingUp = !this.signingUp;
      if (this.signingUp)
        this.loginSignUpMessage = 'Already have an account? Log in';
      else this.loginSignUpMessage = 'New user? Sign up';
    },
    submitForm() {
      if (!this.email) {
        this.error = { message: 'Please enter an email' };
      } else if (!this.password) {
        this.error = { message: 'Please enter a password' };
      } else if (this.signingUp && !this.passwordConfirm) {
        this.error = {
          message: 'Please enter a password confirmation'
        };
      } else if (this.signingUp && this.password !== this.passwordConfirm) {
        this.error = { message: 'Passwords do not match' };
      } else if (this.signingUp) {
        this.signingIn = true;
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password)
          .then((data) => {
            setTimeout(() => {
              this.signingIn = false;
              this.signedIn = true;
              this.setupStoreAndCookies();
              setTimeout(() => {
                this.$router.push('/');
              }, 1000);
            }, 1000);
          })
          .catch((error) => {
            this.signingIn = false;
            this.error = error;
            this.updateErrorMessage();
          });
      } else {
        this.signingIn = true;
        firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then((data) => {
            setTimeout(() => {
              this.signingIn = false;
              this.signedIn = true;
              this.setupStoreAndCookies();
              setTimeout(() => {
                this.$router.push('/');
              }, 1000);
            }, 1000);
          })
          .catch((error) => {
            this.signingIn = false;
            this.error = error;
            this.updateErrorMessage();
          });
      }
    }
  }
};
</script>

<style scoped>
.login {
  height: 100vh;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: var(--color-1);
  overflow: hidden;
}
.userBorder {
  background-color: #0e273c;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  width: 200px;
  border-radius: 50%;
  box-shadow: 0 0 15px 0px black;
}
.userIcon {
  color: #5fadbf;
  position: relative;
}
form {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
input {
  width: calc(280px + (400 - 280) * ((100vw - 340px) / (1600 - 340)));
  padding: 14px;
  margin: 20px;
  font-size: 18px;
  background-color: var(--color-1);
  border: 0;
  border-bottom: 3px solid var(--color-2-inactive);
  color: var(--color-2);
}
input:focus {
  border-bottom: 3px solid var(--color-2);
  outline: none;
}
.activeBorder {
  border-bottom: 3px solid var(--color-2);
}
button {
  width: calc(280px + (400 - 280) * ((100vw - 340px) / (1600 - 340)));
  height: 60px;
  font-size: 18px;
  display: inline-block;
  border-radius: 10px;
  border: 2px solid var(--color-2);
  color: var(--color-2);
  background-color: var(--color-1);
  padding: 10px 30px;
  margin-top: 30px;
  outline: none;
}
button:hover {
  color: black;
  background-color: var(--color-2);
  cursor: pointer;
}
.toggleLoginSignUp {
  color: var(--color-2);
  text-decoration: none;
  margin: 20px;
}
.toggleLoginSignUp {
  cursor: pointer;
}
.error {
  color: red;
}
.keepLoggedIn {
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
}
.keepLoggedInMessage {
  color: var(--color-2);
}
.checkbox {
  margin-left: 30px;
  height: 25px;
  width: 25px;
}

::-webkit-input-placeholder {
  /* WebKit, Blink, Edge */
  color: var(--color-2-inactive);
}
:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: var(--color-2-inactive);
  opacity: 1;
}
::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: var(--color-2-inactive);
  opacity: 1;
}
:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: var(--color-2-inactive);
}
::-ms-input-placeholder {
  /* Microsoft Edge */
  color: var(--color-2-inactive);
}

::placeholder {
  /* Most modern browsers support this now. */
  color: var(--color-2-inactive);
}
</style>
