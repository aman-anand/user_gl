import { TYPES } from './'

const showHomeDialog = (data) => {
  return {
    type: TYPES.HOME_DIALOG,
    data
  }
}

const showHomeError = (data) => {
  return {
    type: TYPES.HOME_ERROR,
    data
  }
}

export { showHomeDialog, showHomeError }
