const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const SELECT_USER = 'SELECT_USER'

const initialState = {
  loggedInUser: {},
  selectedUser: {}
}

export const getUser = user => ({ type: GET_USER, user })
export const removeUser = () => ({ type: REMOVE_USER })
export const selectUser = user => ({ type: SELECT_USER, user })

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return { ...state, loggedInUser: action.user };
    case REMOVE_USER:
      return { ...state, loggedInUser: {} };
    case SELECT_USER:
      return { ...state, selectedUser: action.user };
    default:
      return state;
  }
}
