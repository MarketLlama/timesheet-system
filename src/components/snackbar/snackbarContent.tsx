import cx from "classnames";
import PropTypes from "prop-types";
import React from "react";

// @material-ui/core components
import IconButton from "@material-ui/core/IconButton";
import Snack from "@material-ui/core/SnackbarContent";
import withStyles, {WithStyles} from "@material-ui/core/styles/withStyles";
import { SvgIconProps } from "@material-ui/core/SvgIcon";

// @material-ui/icons
import Close from "@material-ui/icons/Close";

import { snackbarContentStyle } from "../../assets/jss";

export interface SnackBarContentProps extends WithStyles<typeof snackbarContentStyle> {
    message: JSX.Element;
    color: ColorType;
    close?: boolean;
    icon?: React.ComponentType<SvgIconProps>;
}

class SnackBarContent extends React.Component<SnackBarContentProps> {

    public static defaultProps: Partial<SnackBarContentProps> = {
        color: "info",
    };

    public render() {
        const { classes, message, color, close } = this.props;
        let action: JSX.Element = <span/>;
        const messageClasses = cx({
          [classes.iconMessage]: this.props.icon !== undefined,
        });
        if (close !== undefined) {
          action = (
            <IconButton
              className={classes.iconButton}
              key="close"
              aria-label="Close"
              color="inherit"
            >
              <Close className={classes.close} />
            </IconButton>
          );
        }
        const iconClasses = cx({
          [classes.icon]: classes.icon,
          [classes.infoIcon]: color === "info",
          [classes.successIcon]: color === "success",
          [classes.warningIcon]: color === "warning",
          [classes.dangerIcon]: color === "danger",
          [classes.primaryIcon]: color === "primary",
          [classes.roseIcon]: color === "rose",
        });
        return (
          <Snack
            message={
              <div>
                {this.props.icon !== undefined ? <this.props.icon className={iconClasses} /> : null}
                <span className={messageClasses}>{message}</span>
              </div>
            }
            classes={{
              root: classes.root + " " + classes[color],
              message: classes.message,
            }}
            action={action}
          />
        );
    }
}

(SnackBarContent as React.ComponentClass<SnackBarContentProps>).propTypes = {
    classes: PropTypes.object.isRequired,
    message: PropTypes.node.isRequired,
    color: PropTypes.oneOf([
      "info",
      "success",
      "warning",
      "danger",
      "primary",
      "rose",
    ]),
    close: PropTypes.bool,
    icon: PropTypes.func,
  } as any;

export default withStyles(snackbarContentStyle)(SnackBarContent);
