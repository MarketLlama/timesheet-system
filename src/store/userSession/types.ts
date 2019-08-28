// Describing the shape of the system's slice of state
export interface UserSessionState {
    loggedIn: boolean;
    uid: string;
    userName: string;
}

// Describing the different ACTION NAMES available
export const UPDATE_SESSION = 'UPDATE_SESSION';

interface UpdateSessionAction {
    type: typeof UPDATE_SESSION;
    payload: UserSessionState;
}

export type SystemActionTypes = UpdateSessionAction;
