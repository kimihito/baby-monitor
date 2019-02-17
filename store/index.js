export const state = () => {
  return {
    authenticated: null
  }
}

export const mutations = {
  VERIFY_PASSWORD(state) {
    state.authenticated = true
  }
}

export const actions = {
  verifyPassword({ commit }, password) {
    if (password === process.env.VERIFY_PASSWORD) {
      commit('VERIFY_PASSWORD')
    } else {
      throw new Error('Bad password')
    }
  }
}
