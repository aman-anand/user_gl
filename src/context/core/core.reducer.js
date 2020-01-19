const TYPES = {
  CORE_DIALOG: 'CORE_DIALOG',
  CORE_ERROR: 'CORE_ERROR',
  CORE_MODAL: 'CORE_MODAL',
  SCHOOL_DATA: 'SCHOOL_DATA',
  SET_HOME_DATA: 'SET_HOME_DATA'
}

const coreStateReducer = (state, action) => {
  switch (action.type) {
    case TYPES.CORE_DIALOG:
      return {
        ...state,
        coreDialog: action.data || null
      }
    case TYPES.CORE_ERROR:
      return {
        ...state,
        coreError: action.data || null
      }
    case TYPES.CORE_MODAL:
      return {
        ...state,
        coreModal: action.data || null
      }
    case TYPES.SCHOOL_DATA:
      return {
        ...state,
        schoolData: action.data || null
      }
    case TYPES.SET_HOME_DATA:
      return {
        ...state,
        setHomeData: action.data || null
      }
    default:
      return state
  }
}

const coreReducer = ({ commonState }, action) => ({
  commonState: coreStateReducer(commonState, action)
})

export { coreReducer, TYPES }
