import { combineReducers, createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import fetch from 'isomorphic-unfetch'

const actionTypes = {
  SHOW_LIST_SUCCESS: 'SHOW_LIST_SUCCESS',
  SHOW_DETAILS_SUCCESS: 'SHOW_DETAILS_SUCCESS',
}

// REDUCERS
const showList = (state = null, action) => {
  console.log(action)
  switch (action.type) {
    case actionTypes.SHOW_LIST_SUCCESS:
      return action.list
    default:
      return state
  }
}

const showDetails = (state = null, action) => {
  switch (action.type) {
    case actionTypes.SHOW_DETAILS_SUCCESS:
      return Object.assign(
        {},
        state,
        {}//{ [action.showId]: {action.showDetails, action.showImage} }
      )
    default:
      return state
  }
}

// ACTIONS
export const updateShowList = () => async dispatch => {
  const res = await fetch('https://api.tvmaze.com/search/shows?q=batman')
  const data = await res.json()

  return dispatch({
    type: actionTypes.SHOW_LIST_SUCCESS,
    list: data,
  })
}


export const updateShowDetails = detaild => dispatch => {
  return dispatch({
    type: actionTypes.SHOW_LIST_SUCCESS,
    showDetails: detailed,
    showImage: detailed,
    showId: detailed,
  })
}

const rootReducer = combineReducers({
  showDetails,
  showList,
})


const exampleInitialState = {
  showDetails: null,
  showList: null,
}

export const initStore = (initialState = initialState) => {
  return createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  )
}
