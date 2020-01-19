import { TYPES } from './'

const setCommonModal = (data) => {
  return {
    type: TYPES.CORE_MODAL,
    data
  }
}

const showCoreDialog = (data) => {
  return {
    type: TYPES.CORE_DIALOG,
    data
  }
}

const showCoreError = (data) => {
  return {
    type: TYPES.CORE_ERROR,
    data
  }
}


const setHomeData = (data) => {
  return {
    type: TYPES.SET_HOME_DATA,
    data
  }
}

export { showCoreDialog, showCoreError, setCommonModal, setHomeData }
