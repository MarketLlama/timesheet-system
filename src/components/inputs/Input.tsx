import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
// @material-ui/core components
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
// nodejs library that concatenates classes
import classNames from 'classnames';
// nodejs library to set properties for components
import PropTypes from 'prop-types';
import React from 'react';

import { customInputStyle } from '../../assets/jss';
import { Danger } from '../typography';

export interface CustomInputProps extends WithStyles<typeof customInputStyle> {
    labelText?: any;
    labelProps?: any;
    id?: string;
    inputProps: any;
    formControlProps?: any;
    inputRootCustomClasses?: string;
    error?: boolean;
    success?: boolean;
    white?: boolean;
    helpText?: any;
    errorText?: string;
    [keys: string]: any;
}

export interface CustomInputState {}

class CustomInput extends React.Component<CustomInputProps, CustomInputState> {
    constructor(props: CustomInputProps) {
        super(props);
    }
    public render() {
        const {
            classes,
            formControlProps,
            labelText,
            id,
            labelProps,
            inputProps,
            error,
            white,
            inputRootCustomClasses,
            success,
            helpText,
            errorText,
        } = this.props;
        const labelClasses = classNames({
            [' ' + classes.labelRootError]: error,
            [' ' + classes.labelRootSuccess]: success && !error,
        });
        const underlineClasses = classNames({
            [classes.underlineError]: error,
            [classes.underlineSuccess]: success && !error,
            [classes.underline]: true,
            [classes.whiteUnderline]: white,
        });
        const marginTop = classNames({
            [inputRootCustomClasses ? inputRootCustomClasses : '']:
                inputRootCustomClasses !== undefined,
        });
        const inputClasses = classNames({
            [classes.input]: true,
            [classes.whiteInput]: white,
        });
        let formControlClasses;
        if (formControlProps !== undefined) {
            formControlClasses = classNames(
                formControlProps.className,
                classes.formControl
            );
        } else {
            formControlClasses = classes.formControl;
        }
        const helpTextClasses = classNames({
            [classes.labelRootError]: error,
            [classes.labelRootSuccess]: success && !error,
        });
        return (
            <FormControl {...formControlProps} className={formControlClasses}>
                {labelText !== undefined ? (
                    <InputLabel
                        className={classes.labelRoot + ' ' + labelClasses}
                        htmlFor={id}
                        {...labelProps}
                    >
                        {labelText}
                    </InputLabel>
                ) : null}
                <Input
                    error={error}
                    classes={{
                        input: inputClasses,
                        root: marginTop,
                        disabled: classes.disabled,
                        underline: underlineClasses,
                    }}
                    id={id}
                    {...inputProps}
                />
                {helpText !== undefined ? (
                    <FormHelperText
                        id={id + '-text'}
                        className={helpTextClasses}
                    >
                        {helpText}
                    </FormHelperText>
                ) : null}
                {errorText !== undefined && errorText !== '' && error ? (
                    <FormHelperText id={id + '-text'}>
                        <Danger>{errorText}</Danger>
                    </FormHelperText>
                ) : null}
            </FormControl>
        );
    }
}

(CustomInput as React.ComponentClass<CustomInputProps>).propTypes = {
    classes: PropTypes.object.isRequired,
    labelText: PropTypes.node,
    labelProps: PropTypes.object,
    id: PropTypes.string,
    inputProps: PropTypes.object,
    formControlProps: PropTypes.object,
    inputRootCustomClasses: PropTypes.string,
    error: PropTypes.bool,
    success: PropTypes.bool,
    white: PropTypes.bool,
    helpText: PropTypes.node,
} as any;

export default withStyles(customInputStyle)(CustomInput);
