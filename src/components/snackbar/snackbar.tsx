import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

// @material-ui/core components
import IconButton from '@material-ui/core/IconButton';
import Snack from '@material-ui/core/Snackbar';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import { SvgIconProps } from '@material-ui/core/SvgIcon';

// @material-ui/icons
import Close from '@material-ui/icons/Close';

import { snackbarContentStyle } from '../../assets/jss';

export interface SnackBarProps extends WithStyles<typeof snackbarContentStyle> {
    message: JSX.Element | string;
    color: ColorType;
    close?: boolean;
    icon?: React.ComponentType<SvgIconProps>;
    place: SnackBarPlacementType;
    open?: boolean;
    closeNotification?: () => void;
}

class SnackBar extends React.Component<SnackBarProps> {
    public static defaultProps: Partial<SnackBarProps> = {
        color: 'info',
        place: 'tl',
    };

    public render() {
        const {
            classes,
            message,
            color,
            close,
            place,
            open,
            closeNotification,
        } = this.props;
        let action: JSX.Element = <span />;
        const messageClasses = cx({
            [classes.iconMessage]: this.props.icon !== undefined,
        });
        if (close !== undefined && closeNotification !== undefined) {
            action = (
                <IconButton
                    className={classes.iconButton}
                    key="close"
                    aria-label="Close"
                    color="inherit"
                    onClick={() => closeNotification()}
                >
                    <Close className={classes.close} />
                </IconButton>
            );
        }
        const iconClasses = cx({
            [classes.icon]: classes.icon,
            [classes.infoIcon]: color === 'info',
            [classes.successIcon]: color === 'success',
            [classes.warningIcon]: color === 'warning',
            [classes.dangerIcon]: color === 'danger',
            [classes.primaryIcon]: color === 'primary',
            [classes.roseIcon]: color === 'rose',
        });
        return (
            <Snack
                classes={{
                    anchorOriginTopCenter: classes.top20,
                    anchorOriginTopRight: classes.top40,
                    anchorOriginTopLeft: classes.top40,
                }}
                anchorOrigin={{
                    vertical: place.indexOf('t') === -1 ? 'bottom' : 'top',
                    horizontal:
                        place.indexOf('l') !== -1
                            ? 'left'
                            : place.indexOf('c') !== -1
                            ? 'center'
                            : 'right',
                }}
                open={open ? open : false}
                message={
                    <div>
                        {this.props.icon !== undefined ? (
                            <this.props.icon className={iconClasses} />
                        ) : null}
                        <span className={messageClasses}>{message}</span>
                    </div>
                }
                action={action}
                ContentProps={{
                    classes: {
                        root: classes.root + ' ' + classes[color],
                        message: classes.message,
                    },
                }}
            />
        );
    }
}

(SnackBar as React.ComponentClass<SnackBarProps>).propTypes = {
    classes: PropTypes.object.isRequired,
    message: PropTypes.node.isRequired,
    color: PropTypes.oneOf([
        'info',
        'success',
        'warning',
        'danger',
        'primary',
        'rose',
    ]),
    close: PropTypes.bool,
    icon: PropTypes.func,
    place: PropTypes.oneOf(['tl', 'tr', 'tc', 'br', 'bl', 'bc']),
    open: PropTypes.bool,
} as any;

export default withStyles(snackbarContentStyle)(SnackBar);
