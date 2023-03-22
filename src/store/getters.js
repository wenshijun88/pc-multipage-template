const getters = {
  size: state => state.common.styleSize,
  closeOnclickModal: state => state.common.closeOnclickModal,
  isLoading: state => !!state.app.loadingNumber,
  locationData: state => state.app.locationData,
  initData: state => state.app.initData
}

export default getters
