import React from 'react';

import AuthService from '../../../services/authService';
// @material-ui/icons
import Email from '@material-ui/icons/Email';
import Lock from '@material-ui/icons/Lock';
import Face from '@material-ui/icons/Face';
// @material-ui/core components
import InputAdornment from '@material-ui/core/InputAdornment';
import withStyles from '@material-ui/core/styles/withStyles';

// core components
import { createStyles, WithStyles } from '@material-ui/core';
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

export interface IStep0Props extends WithStyles<typeof style> {}

export interface IStep0State {
    email: string;
    password1: string;
    password2: string;
    firstNames: string;
    lastName: string;
    passwordMismatch: boolean;
    emailStringIncorrect: boolean;
    firstNameLengthCheck: boolean;
    lastNameLengthCheck: boolean;
    emailVerified: boolean;
}

class Step0 extends React.Component<IStep0Props, IStep0State> {
    constructor(props: IStep0Props) {
        super(props);
        this.state = {
            email: '',
            password1: '',
            password2: '',
            firstNames: '',
            lastName: '',
            passwordMismatch: false,
            emailStringIncorrect: false,
            firstNameLengthCheck: false,
            lastNameLengthCheck: false,
            emailVerified: false,
        };
    }
    public render() {
        console.log(this.state);
        const { classes } = this.props;
        return (
            <GridContainer justify="center">
                <GridItem xs={12} sm={12} lg={10}>
                    <h4 className={classes.infoText}>
                        Let's sign up and verify your email.
                    </h4>
                </GridItem>
                <GridItem xs={12} sm={12} lg={10}>
                    <CustomInput
                        labelText={
                            <span>
                                Email <small>(required)</small>
                            </span>
                        }
                        id="email"
                        error={this.state.emailStringIncorrect}
                        formControlProps={{
                            fullWidth: true,
                        }}
                        inputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Email
                                        className={classes.inputAdornmentIcon}
                                    />
                                </InputAdornment>
                            ),
                            onChange: ev =>
                                this.setState({
                                    email: ev.target.value,
                                    emailStringIncorrect: false,
                                }),
                        }}
                    />
                    <CustomInput
                        labelText={
                            <span>
                                Password <small>(required)</small>
                            </span>
                        }
                        id="password1"
                        error={this.state.passwordMismatch}
                        formControlProps={{
                            fullWidth: true,
                        }}
                        onChange={ev =>
                            this.setState({
                                password1: ev.target.value,
                            })
                        }
                        inputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Lock
                                        className={classes.inputAdornmentIcon}
                                    />
                                </InputAdornment>
                            ),
                            type: 'password',
                            onChange: ev =>
                                this.setState({
                                    password1: ev.target.value,
                                }),
                        }}
                    />
                    <CustomInput
                        labelText={
                            <span>
                                Password Confirmation <small>(required)</small>
                            </span>
                        }
                        id="password2"
                        error={this.state.passwordMismatch}
                        formControlProps={{
                            fullWidth: true,
                        }}
                        inputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Lock
                                        className={classes.inputAdornmentIcon}
                                    />
                                </InputAdornment>
                            ),
                            type: 'password',
                            onChange: ev =>
                                this.setState({
                                    password2: ev.target.value,
                                }),
                        }}
                    />
                </GridItem>
                <GridItem xs={12} sm={6} lg={5}>
                    <CustomInput
                        labelText={
                            <span>
                                First Name(s) <small>(required)</small>
                            </span>
                        }
                        id="firstNames"
                        error={this.state.firstNameLengthCheck}
                        formControlProps={{
                            fullWidth: true,
                        }}
                        onChange={ev =>
                            this.setState({
                                firstNames: ev.target.value,
                            })
                        }
                        inputProps={{
                            onChange: ev =>
                                this.setState({
                                    firstNames: ev.target.value,
                                }),
                        }}
                    />
                </GridItem>
                <GridItem xs={12} sm={6} lg={5}>
                    <CustomInput
                        labelText={
                            <span>
                                Surname <small>(required)</small>
                            </span>
                        }
                        id="lastsName"
                        error={this.state.lastNameLengthCheck}
                        formControlProps={{
                            fullWidth: true,
                        }}
                        inputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Face
                                        className={classes.inputAdornmentIcon}
                                    />
                                </InputAdornment>
                            ),
                            onChange: ev =>
                                this.setState({
                                    lastName: ev.target.value,
                                }),
                        }}
                    />
                </GridItem>
            </GridContainer>
        );
    }
    public sendState = () => {
        return this.state;
    };
    public stepAction = () => {
        this._createUser();
    };
    public isValidated = () => {
        let isVerified = true;
        const {
            email,
            password1,
            password2,
            firstNames,
            lastName,
        } = this.state;

        if (this._verifyEmail(email) === false) {
            this.setState({
                emailStringIncorrect: true,
            });
            isVerified = false;
        } else {
        }
        if (this._verifyLength(firstNames, 2) === false) {
            this.setState({
                firstNameLengthCheck: true,
            });
            isVerified = false;
        }
        if (this._verifyLength(lastName, 2) === false) {
            this.setState({
                lastNameLengthCheck: true,
            });
            isVerified = false;
        }
        if (password1 !== password2 || password1 == '') {
            this.setState({
                passwordMismatch: true,
            });
            isVerified = false;
        }
        return isVerified;
    };
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

    private _createUser = async () => {
        const { email, password1, firstNames, lastName } = this.state;
        try {
            const authService = new AuthService();
            await authService.signUp(email, password1, firstNames, lastName);
        } catch (error) {
            console.error(error);
        }
    };
}

export default withStyles(style)(Step0);
