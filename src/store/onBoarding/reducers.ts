import { ONBOARDING_STEPS, OnBoardingState, SystemActionTypes } from './types';

const initialState: OnBoardingState = {
    step: 0,
};

export function onboardingReducer(
    state = initialState,
    action: SystemActionTypes
): OnBoardingState {
    switch (action.type) {
        case ONBOARDING_STEPS: {
            return {
                ...state,
                ...action.payload,
            };
        }
        default:
            return state;
    }
}
