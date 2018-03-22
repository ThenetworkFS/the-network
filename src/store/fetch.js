const START_FETCH = 'START_FETCH';
const STOP_FETCH = 'STOP_FETCH';

export const startFetch = () => ({ type: START_FETCH, isFetching: true });
export const stopFetch = () => ({ type: STOP_FETCH, isFetching: false });

export default function reducer(isFetching = false, action) {
  switch (action.type) {
    case START_FETCH:
      return action.isFetching;

    case STOP_FETCH:
      return action.isFetching;

    default:
      return isFetching;
  }
}
