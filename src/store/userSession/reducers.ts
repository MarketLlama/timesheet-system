import { UPDATE_SESSION, UserSessionState, SystemActionTypes } from './types';

const initialState: UserSessionState = {
    loggedIn: false,
    uid: '',
    userName: '',
};

export function userSessionReducer(
    state = initialState,
    action: SystemActionTypes
): UserSessionState {
    switch (action.type) {
        case UPDATE_SESSION: {
            return {
                ...state,
                ...action.payload,
            };
        }
        default:
            return state;
    }
}
