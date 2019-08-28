import { OnBoardingState, ONBOARDING_STEPS } from './types';

export function updateOnboardingState(playload: OnBoardingState) {
    return {
        type: ONBOARDING_STEPS,
        payload: playload,
    };
}
