<template>
  <div class="menu">
    <div class="menuItem" @click="$store.commit('SET_EDITMODE')">
      <span class="iconHolder"><i class="fas fa-pencil-alt"></i></span>
      <div>Edit</div>
    </div>
    <hr />
    <div class="menuItem">
      <span class="iconHolder"><i class="fas fa-palette"></i></span>
      <div>Color Scheme</div>
    </div>
    <hr />
    <div class="menuItem" @click="logout">
      <span class="iconHolder"><i class="fas fa-sign-out-alt"></i></span>
      <div>Logout</div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push('login')
        })
    }
  }
}
</script>

<style>
.menu {
  border: 1px solid var(--color-2);
  border-radius: 5px;
  position: fixed;
  background-color: var(--color-1-bright);
  box-shadow: 0 0 15px 2px;
  top: calc(8px + (50 - 8) * ((100vw - 340px) / (1600 - 340)));
  right: calc(60px + (102 - 60) * ((100vw - 340px) / (1600 - 340)));
  z-index: 9999;
}

.menuItem {
  display: flex;
  justify-content: space-between;
  color: var(--color-4);
  padding: 20px 25px;
}

.menuItem:hover {
  cursor: pointer;
  background-color: var(--color-1);
  color: var(--color-2);
}

.iconHolder {
  padding-right: 40px;
}

hr {
  width: 85%;
  margin: auto;
  color: var(--color-4);
}
</style>
