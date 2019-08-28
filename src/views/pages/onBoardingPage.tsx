import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { AppState } from '../../store';
import { updateSession } from '../../store/userSession/actions';
import { updateOnboardingState } from '../../store/onBoarding/actions';

import { createStyles, withStyles } from '@material-ui/core';
import { WithStyles } from '@material-ui/styles';

// core components
import { GridContainer, GridItem } from '../../components/grid';
import { Wizard } from '../../components/wizard';

import { Step0, Step1, Step2, Step3 } from './onBoardingSteps';

import { container } from '../../assets/jss';

const style = createStyles({
    container: {
        ...container,
        position: 'relative',
        zIndex: 3,
        paddingTop: '5vh',
    },
});

export interface IOnBoardingProps extends WithStyles<typeof style> {
    userSession: any;
    updateOnboardingState: typeof updateOnboardingState;
}

class OnBoarding extends React.Component<IOnBoardingProps> {
    public render() {
        const { classes } = this.props;
        return (
            <div className={classes.container}>
                <GridContainer justify="center">
                    <GridItem xs={12} sm={8}>
                        <Wizard
                            validate
                            color="primary"
                            steps={[
                                {
                                    stepName: 'Verify',
                                    stepComponent: Step0,
                                    stepId: 'verify',
                                    nextButtonClick: this._onNextVerifyStep,
                                },
                                {
                                    stepName: 'About',
                                    stepComponent: Step1,
                                    stepId: 'about',
                                    nextButtonClick: this._onNextAboutStep,
                                },
                                {
                                    stepName: 'Account',
                                    stepComponent: Step2,
                                    stepId: 'account',
                                    nextButtonClick: this._onNextAccountStep,
                                },
                                {
                                    stepName: 'Address',
                                    stepComponent: Step3,
                                    stepId: 'address',
                                    nextButtonClick: this._onNextAddressStep,
                                },
                            ]}
                            title="Build Your Profile"
                            subtitle="This information will let us know more about you."
                            finishButtonClick={e => console.log(e)}
                        />
                    </GridItem>
                </GridContainer>
            </div>
        );
    }

    private _onNextVerifyStep = (): boolean => {
        return false;
    };

    private _onNextAboutStep = (): boolean => {
        return false;
    };

    private _onNextAccountStep = (): boolean => {
        return false;
    };

    private _onNextAddressStep = (): boolean => {
        return false;
    };
}

const mapStateToProps = (state: AppState) => ({
    userSession: state.userSession,
    onboardingState: state.onBoarding,
});

(OnBoarding as React.ComponentClass<IOnBoardingProps>).propTypes = {
    classes: PropTypes.object.isRequired,
    userSession: PropTypes.object.isRequired,
    updateOnboardingState: PropTypes.object.isRequired,
} as any;

export default connect(
    mapStateToProps,
    { updateSession, updateOnboardingState }
)(withStyles(style)(OnBoarding));
