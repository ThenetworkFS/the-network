const DELETE_PROJECT = 'DELETE_PROJECT'

const initialState = {
    projects: [],
}

export const deleteProject = project => ({ type: DELETE_PROJECT, project })

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case DELETE_PROJECT:
            return
        default:
            return state
    }
}
