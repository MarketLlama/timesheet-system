import React from 'react';

// @material-ui/core components
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';

// core components
import { Card, CardAvatar, CardBody, CardFooter } from '../../components/card';
import { Button } from '../../components/customButtons';
import { CustomInput } from '../../components/inputs';

import avatar from '../../assets/img/faces/avatar.jpg';

import { emailValidationPageStyle } from '../../assets/jss';

export interface ValidateEmailProps
    extends WithStyles<typeof emailValidationPageStyle> {}

class ValidateEmail extends React.Component<ValidateEmailProps> {
    private _userName: string;
    constructor(props: ValidateEmailProps) {
        super(props);
        this._userName = 'Mark';
    }

    public componentDidMount() {}

    public render() {
        const { classes } = this.props;
        return (
            <div className={classes.container}>
                <h1>Email Verified</h1>
                <h3>Thank you, {'Mark'}</h3>
            </div>
        );
    }
    private _goToLogin = () => {};
}

export default withStyles(emailValidationPageStyle)(ValidateEmail);
