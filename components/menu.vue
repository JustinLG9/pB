<template>
  <themed-bright-div class="menu">
    <div class="menuItems">
      <div class="colorPalettes">
        <themedP class="colorTitle">Color Palette</themedP>
        <div class="palettes">
          <colorpalette
            v-for="palette in colorPalettes"
            :key="palette.color1"
            :colorTheme="palette"
            :title="palette.title"
            class="palette"
          />
        </div>
      </div>
      <themed-hr class="themed-hr" />
      <themed-menu-button class="menuItem" @click.native="$store.commit('SET_EDITMODE')">
        <span class="iconHolder">
          <i class="fas fa-pencil-alt" />
        </span>
        <div>Edit</div>
      </themed-menu-button>
      <themed-menu-button class="menuItem">
        <span class="iconHolder">
          <i class="fas fa-question" />
        </span>
        <div>How it works</div>
      </themed-menu-button>
    </div>
    <themed-hr class="themed-hr" />
    <themed-menu-button class="menuItem logout" @click.native="logout">
      <span class="iconHolder">
        <i class="fas fa-sign-out-alt" />
      </span>
      <div>Logout</div>
    </themed-menu-button>
  </themed-bright-div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';
import colorpalette from './color-palette.vue';
import themedBrightDiv from './themed-components/themedBrightDiv.vue';
import themedHr from './themed-components/themedHr.vue';
import themedMenuButton from './themed-components/themedMenuButton.vue';
import themedP from './themed-components/themedP.vue';

export default {
  data() {
    return {
      colorPalettes: [
        {
          title: 'Deep Ocean',
          color1: '#064948',
          color1Bright: '#3b8070',
          color2: '#0e273c',
          color3: '#eda02d',
          color3Inactive: '#a38436',
          color4: 'white'
        },
        {
          title: 'Ashes',
          color1: '#403d39',
          color1Bright: '#fffcf2',
          color2: '#ccc5b9',
          color3: '#eb5e28',
          color3Inactive: '#e0a84c',
          color4: '#252422'
        },
        {
          title: 'Seashell',
          color1: '#f5cac3',
          color1Bright: '#f28482',
          color2: '#84a59d',
          color3: '#f6bd60',
          color3Inactive: 'orange',
          color4: '#f7ede2'
        },
        {
          title: 'Beach',
          color1: '#f2cc8f',
          color1Bright: '#e07a5f',
          color2: '#f4f1de',
          color3: '#81b29a',
          color3Inactive: 'orange',
          color4: '#3d405b'
        },
        {
          title: 'Cool Steel',
          color1: '#46494c',
          color1Bright: '#dcdcdd',
          color2: '#c5c3c6',
          color3: '#4c5c68',
          color3Inactive: 'orange',
          color4: '#1985a1'
        },
        {
          title: 'Tiger',
          color1: '#d97332',
          color1Bright: '#202c39',
          color2: '#283845',
          color3: '#b8b08d',
          color3Inactive: 'orange',
          color4: '#f2d492'
        }
      ]
    };
  },
  components: {
    colorpalette,
    themedBrightDiv,
    themedHr,
    themedMenuButton,
    themedP
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push('login');
        });
    }
  }
};
</script>

<style>
.menu {
  display: flex;
  flex-direction: column;
  position: fixed;
  box-shadow: 0 0 1px 0px;
  padding-top: 100px;
  height: 100vh;
  right: 0;
  top: 0;
  width: 220px;
  z-index: 9998;
}

.menuItems {
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
}

.menuItem {
  display: flex;
  justify-content: space-between;
  padding: 20px 25px;
  height: 80px;
  align-items: center;
  border: 0;
  outline: none;
}

.menuItem:hover {
  cursor: pointer;
}

.colorTitle {
  margin: 0 0 20px 0;
  text-decoration: underline;
}

.colorPalettes {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.palettes {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin-bottom: 50px;
}

.palette {
  margin: 10px;
}

.logout {
  justify-self: flex-end;
}

.iconHolder {
  padding-right: 40px;
}

.themed-hr {
  width: 75%;
  margin-left: auto;
  margin-right: auto;
  border-width: 0;
  height: 2px;
}
</style>
