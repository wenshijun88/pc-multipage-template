
const state = {
  device: 'desktop',
  showLoading: false,
  loadingNumber: 0,
  locationData: {},
  initData: {
    rgCode: '440000000',
    nd: '2022'
  }
}

const mutations = {
  PLUS_LOADING_NUMBER (state) {
    state.loadingNumber++
  },
  SUBTRACT_LOADING_NUMBER (state) {
    if (state.loadingNumber > 0) {
      state.loadingNumber--
    }
  },
  SET_LOADING_STATE (state, loadingState) {
    state.showLoading = loadingState
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  },
  SET_LOCATION_DATA (state, locationData){
    state.locationData = locationData
  },
  SET_INIT_DATA (state, initData) {
    state.initData = initData
  }
}

const actions = {
  toggleDevice ({
    commit
  }, device) {
    commit('TOGGLE_DEVICE', device)
  },
  setLoading ({
    commit
  }) {
    return new Promise(() => {
      commit('SUBTRACT_LOADING_NUMBER')
      if (state.loadingNumber <= 0) {
        commit('SET_LOADING_STATE', false)
      }
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
