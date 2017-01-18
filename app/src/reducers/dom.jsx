const CHANGE_ACTIVE_ELEMENT = 'CHANGE_ACTIVE_ELEMENT'

export default function reducer(state = {
    activeElement: undefined
}, action) {
    switch (action.type) {
        case CHANGE_ACTIVE_ELEMENT:
            return Object.assign({}, state, {activeElement: action.elmt})
        default:
            return state

    }
}

function chnageActiveElement(elmt) {
    return {type: CHANGE_ACTIVE_ELEMENT, elmt}
}

export function changeActiveElementIfNeeded(e) {
    return (dispatch, getState) => {
        let {activeElement} = getState()
        switch (e.type) {
            case 'focus':
            case 'change':
                if (!_.isEqual(e.target, activeElement)) {
                    dispatch(chnageActiveElement(e.target))
                }
                break;
            case 'blur':
                dispatch(chnageActiveElement(undefined))
                break;
        }
    }
}