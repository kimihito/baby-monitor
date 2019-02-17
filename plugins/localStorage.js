import createPersistedState from 'vuex-persistedstate'

export default ({ store, isHMR }) => {
  if (isHMR) return
  createPersistedState({
    paths: ['authenticated']
  })(store)
}
