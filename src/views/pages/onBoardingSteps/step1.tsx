import React from 'react';

// @material-ui/icons
import Email from '@material-ui/icons/Email';
import Face from '@material-ui/icons/Face';
import RecordVoiceOver from '@material-ui/icons/RecordVoiceOver';
import Work from '@material-ui/icons/Work';
import Money from '@material-ui/icons/Money';
// @material-ui/core components
import InputAdornment from '@material-ui/core/InputAdornment';
import withStyles from '@material-ui/core/styles/withStyles';

// core components
import { createStyles, WithStyles } from '@material-ui/core';
import { PictureUpload } from '../../../components/customUpload';
import { GridContainer, GridItem } from '../../../components/grid';
import { CustomInput } from '../../../components/inputs';

const style = createStyles({
    inputAdornment: {
        position: 'relative',
    },
    inputAdornmentIcon: {
        color: '#555',
    },
    infoText: {
        fontWeight: 300,
        margin: '10px 0 30px',
        textAlign: 'center',
    },
});

export interface IStep1Props extends WithStyles<typeof style> {}

export interface IStep1State {
    firstName: string;
    firstNameState?: boolean;
    lastName: string;
    lastNameState?: boolean;
    email: string;
    emailState?: boolean;
    companyName: string;
    companyNameState?: boolean;
    companyNumber: string;
    companyNumberState?: boolean;
    [x: string]: any;
}

class Step1 extends React.Component<IStep1Props, IStep1State> {
    constructor(props: IStep1Props) {
        super(props);
        this.state = {
            companyName: '',
            companyNumber: '',
            email: '',
            firstName: '',
            lastName: '',
        };
    }
    public render() {
        const { classes } = this.props;
        return (
            <GridContainer justify="center">
                <GridItem xs={12} sm={12}>
                    <h4 className={classes.infoText}>
                        Let's start with the basic information
                    </h4>
                </GridItem>
                <GridItem xs={12} sm={4}>
                    <PictureUpload />
                </GridItem>
                <GridItem xs={12} sm={6}>
                    <CustomInput
                        success={this.state.firstNameState === true}
                        error={this.state.firstNameState === false}
                        labelText={
                            <span>
                                First Name <small>(required)</small>
                            </span>
                        }
                        id="firstname"
                        formControlProps={{
                            fullWidth: true,
                        }}
                        inputProps={{
                            endAdornment: (
                                <InputAdornment
                                    position="end"
                                    className={classes.inputAdornment}
                                >
                                    <Face
                                        className={classes.inputAdornmentIcon}
                                    />
                                </InputAdornment>
                            ),
                            onChange: event =>
                                this._onChange(event, 'firstName', 3),
                        }}
                    />
                    <CustomInput
                        success={this.state.lastNameState === true}
                        error={this.state.lastNameState === false}
                        labelText={
                            <span>
                                Last Name <small>(required)</small>
                            </span>
                        }
                        id="lastname"
                        formControlProps={{
                            fullWidth: true,
                        }}
                        inputProps={{
                            endAdornment: (
                                <InputAdornment
                                    position="end"
                                    className={classes.inputAdornment}
                                >
                                    <RecordVoiceOver
                                        className={classes.inputAdornmentIcon}
                                    />
                                </InputAdornment>
                            ),
                            onChange: event =>
                                this._onChange(event, 'lastName', 3),
                        }}
                    />
                </GridItem>
                <GridItem xs={12} sm={12} md={12} lg={10}>
                    <CustomInput
                        success={this.state.emailState === true}
                        error={this.state.emailState === false}
                        labelText={
                            <span>
                                Email <small>(required)</small>
                            </span>
                        }
                        id="email"
                        formControlProps={{
                            fullWidth: true,
                        }}
                        inputProps={{
                            endAdornment: (
                                <InputAdornment
                                    position="end"
                                    className={classes.inputAdornment}
                                >
                                    <Email
                                        className={classes.inputAdornmentIcon}
                                    />
                                </InputAdornment>
                            ),
                            onChange: event =>
                                this._onChange(event, 'email', 0),
                        }}
                    />
                </GridItem>
                <GridItem xs={12} sm={5}>
                    <CustomInput
                        success={this.state.companyNameState === true}
                        error={this.state.companyNameState === false}
                        labelText={
                            <span>
                                Company Name <small>(required)</small>
                            </span>
                        }
                        id="companyName"
                        formControlProps={{
                            fullWidth: true,
                        }}
                        inputProps={{
                            endAdornment: (
                                <InputAdornment
                                    position="end"
                                    className={classes.inputAdornment}
                                >
                                    <Work
                                        className={classes.inputAdornmentIcon}
                                    />
                                </InputAdornment>
                            ),
                            onChange: event =>
                                this._onChange(event, 'companyName', 0),
                        }}
                    />
                </GridItem>
                <GridItem xs={12} sm={5}>
                    <CustomInput
                        success={this.state.companyNumberState === true}
                        error={this.state.companyNumberState === false}
                        labelText={
                            <span>
                                Company Number <small>(required)</small>
                            </span>
                        }
                        id="companyNo"
                        formControlProps={{
                            fullWidth: true,
                        }}
                        inputProps={{
                            endAdornment: (
                                <InputAdornment
                                    position="end"
                                    className={classes.inputAdornment}
                                >
                                    <Money
                                        className={classes.inputAdornmentIcon}
                                    />
                                </InputAdornment>
                            ),
                            onChange: event =>
                                this._onChange(event, 'companyNumber', 0),
                        }}
                    />
                </GridItem>
            </GridContainer>
        );
    }
    public isValidated() {
        if (
            this.state.firstNameState === true &&
            this.state.lastNameState === true &&
            this.state.emailState === true &&
            this.state.companyNameState === true &&
            this.state.companyNumberState === true
        ) {
            return true;
        } else {
            if (this.state.firstNameState !== true) {
                this.setState({ firstNameState: false });
            }
            if (this.state.lastNameState !== true) {
                this.setState({ lastNameState: false });
            }
            if (this.state.emailState !== true) {
                this.setState({ emailState: false });
            }
            if (this.state.companyNameState !== true) {
                this.setState({ companyNameState: false });
            }
            if (this.state.companyNumberState !== true) {
                this.setState({ companyNumberState: false });
            }
        }
        return false;
    }
    public sendState() {
        return this.state;
    }
    // function that returns true if value is email, false otherwise
    private _verifyEmail(value) {
        // tslint:disable-next-line:max-line-length
        const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (emailRex.test(value)) {
            return true;
        }
        return false;
    }
    // function that verifies if a string has a given length or not
    private _verifyLength(value, length) {
        if (value.length >= length) {
            return true;
        }
        return false;
    }
    private _onChange(event: any, stateName: string, minLength?: number) {
        const stateKey = (stateName + 'State') as keyof IStep1State;
        const stateValueKey = stateName as keyof IStep1State;
        switch (stateName) {
            case 'email':
                this.setState({
                    emailState: this._verifyEmail(event.target.value),
                });
                break;
            case 'firstName':
            case 'lastName':
            case 'companyName':
            case 'companyNumber':
                if (this._verifyLength(event.target.value, minLength)) {
                    this.setState({ [stateKey]: true });
                } else {
                    this.setState({ [stateName]: false });
                }
                break;
            default:
                break;
        }
        const s = {
            [stateValueKey]: event.target.value,
        };
        this.setState(s);
    }
}

export default withStyles(style)(Step1);
