import history from '../history'


const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'


const initialState = {
  loggedInUser: {}
}


export const getUser = user => ({ type: GET_USER, user })
export const removeUser = () => ({ type: REMOVE_USER })

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return { ...state, loggedInUser: action.user };
    case REMOVE_USER:
      return Object.assign({}, state, { loggedInUser: {} });
    default:
      return state;
  }
}
