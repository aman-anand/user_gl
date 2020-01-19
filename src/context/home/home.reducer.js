const TYPES = {
  HOME_DATA: 'HOME_DATA',
  HOME_ERROR: 'HOME_ERROR'
}

const homeReducer = (state = {}, action) => {
  switch (action.type) {
    case TYPES.HOME_DATA:
      return {
        ...state,
        homeData: action.data
      }
    case TYPES.HOME_ERROR:
      return {
        ...state,
        homeError: action.data
      }
    default:
      return state
  }
}

export { homeReducer, TYPES }
