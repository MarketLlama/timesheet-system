import { UserSessionState, UPDATE_SESSION } from './types';

export function updateSession(newSession: UserSessionState) {
    return {
        type: UPDATE_SESSION,
        payload: newSession,
    };
}
