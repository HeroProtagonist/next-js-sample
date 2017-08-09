import { combineReducers, createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import fetch from 'isomorphic-unfetch'
import Router from 'next/router'

const actionTypes = {
  SHOW_LIST_SUCCESS: 'SHOW_LIST_SUCCESS',
  SHOW_DETAILS_SUCCESS: 'SHOW_DETAILS_SUCCESS',
  TOGGLE_MODAL: 'TOGGLE_MODAL',
}

// REDUCERS
const showList = (state = null, action) => {
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
      return { ...state, [action.id]: action.show }
    default:
      return state
  }
}

const modalVisible = (state = false, action) => {
  switch (action.type) {
    case actionTypes.TOGGLE_MODAL:
      return !state
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

export const updateShowDetails = id => async dispatch => {

  const res = await fetch(`https://api.tvmaze.com/shows/${id}`)
  const show = await res.json()

  return dispatch({
    type: actionTypes.SHOW_DETAILS_SUCCESS,
    show,
    id,
  })
}

export const toggleModal = id => dispatch => {
  let replaceUrl = 'http://localhost:8000'
console.log(id)
  if (id) replaceUrl = `http://localhost:8000/p/${id}`

  window.history.pushState('data to be passed', 'Title of the page', replaceUrl)

  return dispatch({
    type: actionTypes.TOGGLE_MODAL,
  })
}

const rootReducer = combineReducers({
  showDetails,
  showList,
  modalVisible,
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
