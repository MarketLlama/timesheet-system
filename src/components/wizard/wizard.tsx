import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { createRef, CSSProperties } from 'react';

// @material-ui/core components
import withStyles, {
    StyledComponentProps,
    WithStyles,
} from '@material-ui/core/styles/withStyles';
import { Card } from '../card';
// core components
import { Button } from '../customButtons';

import { wizardStyle } from '../../assets/jss';

interface IWizardStep {
    stepName: string;
    stepComponent: React.ComponentType<
        Pick<any, string | number | symbol> & StyledComponentProps<string>
    >;
    stepId: string;
    nextButtonClick?: () => boolean;
}

export interface WizardProps extends WithStyles<typeof wizardStyle> {
    steps: IWizardStep[];
    color: ColorType;
    title: string;
    subtitle: string;
    previousButtonClasses?: string;
    previousButtonText?: string;
    nextButtonClasses?: string;
    nextButtonText?: string;
    finishButtonClasses?: string;
    finishButtonText?: string;
    finishButtonClick: (states: any) => void;
    validate?: boolean;
}

export interface WizardState {
    currentStep: number;
    color: ColorType;
    nextButton: boolean;
    previousButton: boolean;
    finishButton: boolean;
    width: string;
    movingTabStyle: CSSProperties;
    allStates: any;
}

class Wizard extends React.Component<WizardProps, WizardState> {
    public static defaultProps: Partial<WizardProps> = {
        color: 'rose',
        title: 'Here should go your title',
        subtitle: 'And this would be your subtitle',
        previousButtonText: 'Previous',
        previousButtonClasses: '',
        nextButtonClasses: '',
        nextButtonText: 'Next',
        finishButtonClasses: '',
        finishButtonText: 'Finish',
    };
    private _wizardRef = createRef<HTMLDivElement>();
    constructor(props) {
        super(props);
        let width: string;
        if (this.props.steps.length === 1) {
            width = '100%';
        } else {
            if (window.innerWidth < 600) {
                if (this.props.steps.length !== 3) {
                    width = '50%';
                } else {
                    width = 100 / 3 + '%';
                }
            } else {
                if (this.props.steps.length === 2) {
                    width = '50%';
                } else {
                    width = 100 / 3 + '%';
                }
            }
        }
        this.state = {
            currentStep: 0,
            color: this.props.color,
            nextButton: this.props.steps.length > 1 ? true : false,
            previousButton: false,
            finishButton: this.props.steps.length === 1 ? true : false,
            width,
            movingTabStyle: {
                transition: 'transform 0s',
            },
            allStates: {},
        };
    }
    public componentDidMount() {
        this._refreshAnimation(0);
        window.addEventListener('resize', this._updateWidth);
    }
    public componentWillUnmount() {
        window.removeEventListener('resize', this._updateWidth);
    }
    public render() {
        const { classes, title, subtitle, color, steps } = this.props;
        return (
            <div className={classes.wizardContainer} ref={this._wizardRef}>
                <Card className={classes.card}>
                    <div className={classes.wizardHeader}>
                        <h3 className={classes.title}>{title}</h3>
                        <h5 className={classes.subtitle}>{subtitle}</h5>
                    </div>
                    <div className={classes.wizardNavigation}>
                        <ul className={classes.nav}>
                            {steps.map((prop, key) => {
                                return (
                                    <li
                                        className={classes.steps}
                                        key={key}
                                        style={{ width: this.state.width }}
                                    >
                                        <a
                                            href="#pablo"
                                            className={classes.stepsAnchor}
                                            onClick={e => {
                                                e.preventDefault();
                                                this._navigationStepChange(key);
                                            }}
                                        >
                                            {prop.stepName}
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                        <div
                            className={classes.movingTab + ' ' + classes[color]}
                            style={this.state.movingTabStyle}
                        >
                            {steps[this.state.currentStep].stepName}
                        </div>
                    </div>
                    <div className={classes.content}>
                        {steps.map((prop, key) => {
                            const stepContentClasses = cx({
                                [classes.stepContentActive]:
                                    this.state.currentStep === key,
                                [classes.stepContent]:
                                    this.state.currentStep !== key,
                            });
                            const StepComponent = prop.stepComponent;
                            return (
                                <div className={stepContentClasses} key={key}>
                                    <StepComponent
                                        innerRef={node =>
                                            (this[prop.stepId] = node)
                                        }
                                        allStates={this.state.allStates}
                                    />
                                </div>
                            );
                        })}
                    </div>
                    <div className={classes.footer}>
                        <div className={classes.left}>
                            {this.state.previousButton ? (
                                <Button
                                    className={this.props.previousButtonClasses}
                                    onClick={() => this._previousButtonClick()}
                                >
                                    {this.props.previousButtonText}
                                </Button>
                            ) : null}
                        </div>
                        <div className={classes.right}>
                            {this.state.nextButton ? (
                                <Button
                                    color="rose"
                                    className={this.props.nextButtonClasses}
                                    onClick={() => this._nextButtonClick()}
                                >
                                    {this.props.nextButtonText}
                                </Button>
                            ) : null}
                            {this.state.finishButton ? (
                                <Button
                                    color="rose"
                                    className={this.props.finishButtonClasses}
                                    onClick={() => this._finishButtonClick()}
                                >
                                    {this.props.finishButtonText}
                                </Button>
                            ) : null}
                        </div>
                        <div className={classes.clearfix} />
                    </div>
                </Card>
            </div>
        );
    }
    private _updateWidth = () => {
        this._refreshAnimation(this.state.currentStep);
    };
    private _navigationStepChange = key => {
        if (this.props.steps) {
            let validationState = true;
            if (key > this.state.currentStep) {
                for (let i = this.state.currentStep; i < key; i++) {
                    if (
                        this[this.props.steps[i].stepId].sendState !== undefined
                    ) {
                        this.setState({
                            allStates: {
                                ...this.state.allStates,
                                [this.props.steps[i].stepId]: this[
                                    this.props.steps[i].stepId
                                ].sendState(),
                            },
                        });
                    }
                    if (
                        this[this.props.steps[i].stepId].isValidated !==
                            undefined &&
                        this[this.props.steps[i].stepId].isValidated() === false
                    ) {
                        validationState = false;
                        break;
                    }
                }
            }
            if (validationState) {
                this.setState({
                    currentStep: key,
                    nextButton:
                        this.props.steps.length > key + 1 ? true : false,
                    previousButton: key > 0 ? true : false,
                    finishButton:
                        this.props.steps.length === key + 1 ? true : false,
                });
                this._refreshAnimation(key);
            }
        }
    };
    private _nextButtonClick = () => {
        if (
            (this.props.validate &&
                ((this[this.props.steps[this.state.currentStep].stepId]
                    .isValidated !== undefined &&
                    this[
                        this.props.steps[this.state.currentStep].stepId
                    ].isValidated()) ||
                    this[this.props.steps[this.state.currentStep].stepId]
                        .isValidated === undefined)) ||
            this.props.validate === undefined
        ) {
            const thisStep = this.props.steps[this.state.currentStep];
            // User nextbuttonClick override
            if (
                thisStep.nextButtonClick !== undefined &&
                thisStep.nextButtonClick !== null &&
                thisStep.nextButtonClick()
            ) {
                if (
                    this[this.props.steps[this.state.currentStep].stepId]
                        .sendState !== undefined
                ) {
                    this.setState({
                        allStates: {
                            ...this.state.allStates,
                            [this.props.steps[this.state.currentStep]
                                .stepId]: this[
                                this.props.steps[this.state.currentStep].stepId
                            ].sendState(),
                        },
                    });
                }

                const key = this.state.currentStep + 1;
                this.setState({
                    currentStep: key,
                    nextButton:
                        this.props.steps.length > key + 1 ? true : false,
                    previousButton: key > 0 ? true : false,
                    finishButton:
                        this.props.steps.length === key + 1 ? true : false,
                });

                this._refreshAnimation(key);
            }
        }
    };
    private _previousButtonClick = () => {
        if (
            this[this.props.steps[this.state.currentStep].stepId].sendState !==
            undefined
        ) {
            this.setState({
                allStates: {
                    ...this.state.allStates,
                    [this.props.steps[this.state.currentStep].stepId]: this[
                        this.props.steps[this.state.currentStep].stepId
                    ].sendState(),
                },
            });
        }
        const key = this.state.currentStep - 1;
        if (key >= 0) {
            this.setState({
                currentStep: key,
                nextButton: this.props.steps.length > key + 1 ? true : false,
                previousButton: key > 0 ? true : false,
                finishButton:
                    this.props.steps.length === key + 1 ? true : false,
            });
            this._refreshAnimation(key);
        }
    };
    private _finishButtonClick = () => {
        if (
            (this.props.validate === false &&
                this.props.finishButtonClick !== undefined) ||
            (this.props.validate &&
                ((this[this.props.steps[this.state.currentStep].stepId]
                    .isValidated !== undefined &&
                    this[
                        this.props.steps[this.state.currentStep].stepId
                    ].isValidated()) ||
                    this[this.props.steps[this.state.currentStep].stepId]
                        .isValidated === undefined) &&
                this.props.finishButtonClick !== undefined)
        ) {
            this.setState(
                {
                    allStates: {
                        ...this.state.allStates,
                        [this.props.steps[this.state.currentStep].stepId]: this[
                            this.props.steps[this.state.currentStep].stepId
                        ].sendState(),
                    },
                },
                () => {
                    this.props.finishButtonClick(this.state.allStates);
                }
            );
        }
    };
    private _refreshAnimation = index => {
        if (this._wizardRef.current !== null) {
            const total: number = this.props.steps.length;
            let li_width: number = 100 / total;
            const total_steps: number = this.props.steps.length;
            let move_distance: number =
                this._wizardRef.current.offsetWidth / total_steps;
            let index_temp: number = index;
            let vertical_level = 0;

            const mobile_device = window.innerWidth < 600 && total > 3;

            if (mobile_device) {
                move_distance = this._wizardRef.current.offsetWidth / 2;
                index_temp = index % 2;
                li_width = 50;
            }

            this.setState({ width: li_width + '%' });

            const step_width = move_distance;
            move_distance = move_distance * index_temp;

            const current = index + 1;

            if (current === 1 || (mobile_device === true && index % 2 === 0)) {
                move_distance -= 8;
            } else if (
                current === total_steps ||
                (mobile_device === true && index % 2 === 1)
            ) {
                move_distance += 8;
            }

            if (mobile_device) {
                vertical_level = index / 2;
                vertical_level = vertical_level * 38;
            }
            const movingTabStyle = {
                width: step_width,
                transform:
                    'translate3d(' +
                    move_distance +
                    'px, ' +
                    vertical_level +
                    'px, 0)',
                transition: 'all 0.5s cubic-bezier(0.29, 1.42, 0.79, 1)',
            };
            this.setState({ movingTabStyle });
        }
    };
}

(Wizard as React.ComponentClass<WizardProps>).propTypes = {
    classes: PropTypes.object.isRequired,
    steps: PropTypes.arrayOf(
        PropTypes.shape({
            stepName: PropTypes.string.isRequired,
            stepComponent: PropTypes.func.isRequired,
            stepId: PropTypes.string.isRequired,
        })
    ).isRequired,
    color: PropTypes.oneOf([
        'primary',
        'warning',
        'danger',
        'success',
        'info',
        'rose',
    ]),
    title: PropTypes.string,
    subtitle: PropTypes.string,
    previousButtonClasses: PropTypes.string,
    previousButtonText: PropTypes.string,
    nextButtonClasses: PropTypes.string,
    nextButtonText: PropTypes.string,
    finishButtonClasses: PropTypes.string,
    finishButtonText: PropTypes.string,
    finishButtonClick: PropTypes.func,
    validate: PropTypes.bool,
} as any;

export default withStyles(wizardStyle)(Wizard);
