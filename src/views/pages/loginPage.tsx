import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { History } from 'history';

import AuthService from '../../services/authService';
import { AppState } from '../../store';
import { updateSession } from '../../store/userSession/actions';

// @material-ui/core components
import InputAdornment from '@material-ui/core/InputAdornment';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';

import Email from '@material-ui/icons/Email';
import LockOutline from '@material-ui/icons/LockOutlined';
import AddAlert from '@material-ui/icons/AddAlert';
import Done from '@material-ui/icons/Done';

// core components
import { Card, CardBody, CardFooter, CardHeader } from '../../components/card';
import { Button } from '../../components/customButtons';
import { GridContainer, GridItem } from '../../components/grid';
import { CustomInput } from '../../components/inputs';

import { loginPageStyle } from '../../assets/jss';
import { SnackBar } from '../../components/snackbar';

export interface LoginPageProps extends WithStyles<typeof loginPageStyle> {
    updateSession: typeof updateSession;
    history: History;
}

export interface LoginPageState {
    cardAnimation: string;
    email: string;
    emailError: boolean;
    emailErrorText: string;
    password: string;
    passwordError: boolean;
    passwordErrorText: string;
    shakeAnimation: string;
    submissionError: boolean;
    submissionErrorText: string;
    showPasswordResetMessage: boolean;
}

class LoginPage extends React.Component<LoginPageProps, LoginPageState> {
    public timeOutFunction!: NodeJS.Timeout;
    private _authService: AuthService;
    constructor(props: LoginPageProps) {
        super(props);
        // we use this to make the card to appear after the page has been rendered
        this.state = {
            cardAnimation: 'cardHidden',
            email: '',
            emailError: false,
            emailErrorText: '',
            password: '',
            passwordError: false,
            passwordErrorText: '',
            shakeAnimation: '',
            submissionError: false,
            submissionErrorText: '',
            showPasswordResetMessage: false,
        };
        this._authService = new AuthService();
    }
    public componentDidMount() {
        // we add a hidden class to the card and after 700 ms we delete it and the transition appears
        this.timeOutFunction = setTimeout(() => {
            this.setState({ cardAnimation: '' });
        }, 700);
    }
    public componentWillUnmount() {
        clearTimeout(this.timeOutFunction);
    }

    public render() {
        const { classes } = this.props;
        const {
            emailError,
            emailErrorText,
            passwordError,
            passwordErrorText,
            submissionError,
            submissionErrorText,
        } = this.state;
        return (
            <div className={classes.container}>
                <GridContainer justify="center">
                    <GridItem xs={12} sm={6} md={4}>
                        <form>
                            <Card
                                login
                                className={
                                    classes[
                                        (this.state.cardAnimation,
                                        this.state.shakeAnimation)
                                    ]
                                }
                            >
                                <CardHeader
                                    className={`${classes.cardHeader} ${classes.textCenter}`}
                                    color="rose"
                                >
                                    <h4 className={classes.cardTitle}>
                                        Timesheet Portal
                                    </h4>
                                    <div className={classes.socialLine}>
                                        {[
                                            'fab fa-facebook-square',
                                            'fab fa-twitter',
                                            'fab fa-google-plus',
                                        ].map((prop, key) => {
                                            return (
                                                <Button
                                                    color="transparent"
                                                    justIcon
                                                    key={key}
                                                    className={
                                                        classes.customButtonClass
                                                    }
                                                >
                                                    <i className={prop} />
                                                </Button>
                                            );
                                        })}
                                    </div>
                                </CardHeader>
                                <CardBody>
                                    <CustomInput
                                        labelText="Email..."
                                        id="email"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        errorText={emailErrorText}
                                        error={emailError}
                                        inputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <Email
                                                        className={
                                                            classes.inputAdornmentIcon
                                                        }
                                                    />
                                                </InputAdornment>
                                            ),
                                            onChange: ev =>
                                                this._validateEmail(
                                                    ev.target.value
                                                ),
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Password"
                                        id="password"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        errorText={passwordErrorText}
                                        error={passwordError}
                                        inputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <LockOutline />
                                                </InputAdornment>
                                            ),
                                            onChange: ev =>
                                                this._validatePassword(
                                                    ev.target.value
                                                ),
                                            type: 'password',
                                        }}
                                    />
                                </CardBody>
                                <CardFooter
                                    className={classes.justifyContentCenter}
                                >
                                    <Button
                                        color="primary"
                                        size="sm"
                                        simple
                                        block
                                        onClick={() => {
                                            this._resetPassword(
                                                this.state.email
                                            );
                                        }}
                                    >
                                        Forgotten Password
                                    </Button>
                                    <Button
                                        color="primary"
                                        size="lg"
                                        block
                                        onClick={() => {
                                            this._login(
                                                this.state.email,
                                                this.state.password
                                            );
                                        }}
                                    >
                                        Log In
                                    </Button>
                                </CardFooter>
                            </Card>
                        </form>
                    </GridItem>
                    <SnackBar
                        place="bc"
                        color="danger"
                        icon={AddAlert}
                        message={submissionErrorText}
                        open={submissionError}
                        closeNotification={() =>
                            this.setState({ submissionError: false })
                        }
                        close
                    />
                    <SnackBar
                        place="bc"
                        color="info"
                        icon={Done}
                        message={`Email with password reset link has been sent to ${this.state.email}`}
                        open={this.state.showPasswordResetMessage}
                        closeNotification={() =>
                            this.setState({ showPasswordResetMessage: false })
                        }
                        close
                    />
                </GridContainer>
            </div>
        );
    }

    private _shake = () => {
        this.setState({
            shakeAnimation: 'headShake',
        });
        setTimeout(() => {
            this.setState({
                shakeAnimation: '',
            });
        }, 1000);
    };

    private _validateEmail = (email: string) => {
        let emailError = false;
        // tslint:disable-next-line:max-line-length
        const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (emailRex.test(email)) {
            //is a correct email format
            this.setState({ email, emailError });
        } else {
            this.setState({
                email: email,
                emailError: true,
                emailErrorText: 'Please enter a valid email address',
            });
        }
    };

    private _validatePassword = (password: string) => {
        let passwordError = false;
        if (password.length > 0 && password.length < 60) {
            //correct password format
            this.setState({ password, passwordError });
        } else {
            this.setState({
                password: password,
                passwordError: true,
                passwordErrorText:
                    'Your password must contain between 4 and 60 characters.',
            });
        }
    };

    private _resetPassword = async (email: string) => {
        try {
            await this._authService.forgotPassword(email);
            this.setState({
                showPasswordResetMessage: true,
            });
        } catch (error) {
            let errorMessage: string;
            switch (error.code) {
                case 'auth/wrong-password':
                    errorMessage = 'Incorrect password.';
                    break;
                case 'auth/user-not-found':
                    errorMessage =
                        'Email address cannot be found on the system.';
                    break;
                default:
                    errorMessage = error.message;
                    break;
            }
            this.setState({
                emailError: email ? false : true,
                submissionErrorText: errorMessage,
                submissionError: true,
            });
            this._shake();
        }
    };

    private _login = async (email: string, password: string) => {
        try {
            const user = await this._authService.logIn(email, password);
            this.props.updateSession({
                userName: `${user.displayName}`,
                uid: user.uid,
                loggedIn: true,
            });
            this.props.history.push('/admin/dashboard');
        } catch (error) {
            let errorMessage: string;
            switch (error.code) {
                case 'auth/wrong-password':
                    errorMessage = 'Incorrect password.';
                    break;
                case 'auth/user-not-found':
                    errorMessage =
                        'Email address cannot be found on the system.';
                    break;
                default:
                    errorMessage = error.message;
                    break;
            }
            this.setState({
                passwordError: password ? false : true,
                emailError: email ? false : true,
                submissionErrorText: errorMessage,
                submissionError: true,
            });
            this._shake();
        }
    };
}

const mapStateToProps = (state: AppState) => ({
    userSession: state.userSession,
});

(LoginPage as React.ComponentClass<LoginPageProps>).propTypes = {
    classes: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
} as any;

export default connect(
    mapStateToProps,
    { updateSession }
)(withStyles(loginPageStyle)(LoginPage));
