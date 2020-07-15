export const state = () => ({
  UID: '',
  editMode: false,
  key: 'penguin',
  colorPalette: {
    color1: '#064948', //main color
    color1Bright: '#3b8070', // accent main color
    color2: '#0e273c', // secondary color
    color3: '#eda02d', // accent color
    color3Inactive: '#a38436',
    color4: 'white' // text color
  }
})

export const actions = {}

export const mutations = {
  SET_UID(state, UID) {
    state.UID = UID
  },
  SET_EDITMODE(state) {
    state.editMode = !state.editMode
  },
  SET_KEY(state, key) {
    state.key = key
  },
  SET_COLORPALETTE(state, colorPalette) {
    state.colorPalette = colorPalette;
  }
}

export const getters = {
  colorPalette: state => state.colorPalette
}