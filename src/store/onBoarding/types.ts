export interface OnBoardingState {
    step: number;
}

// Describing the different ACTION NAMES available
export const ONBOARDING_STEPS = 'ONBOARDING_STEPS';

interface UpdateOnboardingAction {
    type: typeof ONBOARDING_STEPS;
    payload: OnBoardingState;
}

export type SystemActionTypes = UpdateOnboardingAction;
