export const state = () => ({
  UID: '',
  editMode: false
})

export const actions = {}

export const mutations = {
  SET_UID(state, UID) {
    state.UID = UID
  },
  SET_EDITMODE(state) {
    state.editMode = !state.editMode
  }
}
