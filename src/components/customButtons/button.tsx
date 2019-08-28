import Button from "@material-ui/core/Button";
// material-ui components
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";
import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { buttonStyle } from "../../assets/jss";

export interface CustomButtonProps extends WithStyles<typeof buttonStyle> {
    color?: ButtonColorType;
    round?: boolean;
    fullWidth?: boolean;
    disabled?: boolean;
    simple?: boolean;
    size?: Size;
    block?: boolean;
    link?: boolean;
    justIcon?: boolean;
    className?: string;
    muiClasses?: any;
    [rest: string]: any;
}

class CustomButton extends React.Component<CustomButtonProps> {
    constructor(props: CustomButtonProps) {
        super(props);
    }
    public render() {
        const {
            classes,
            color,
            round,
            children,
            fullWidth,
            disabled,
            simple,
            size,
            block,
            link,
            justIcon,
            className,
            muiClasses,
            ...rest
        } = this.props;

        const buttonSize = size as keyof typeof buttonStyle;
        const buttonColor = color as keyof typeof buttonStyle;

        const btnClasses = classNames({
            [classes.button]: true,
            [classes[buttonSize]]: size,
            [classes[buttonColor]]: color,
            [classes.round]: round,
            [classes.fullWidth]: fullWidth,
            [classes.disabled]: disabled,
            [classes.simple]: simple,
            [classes.block]: block,
            [classes.link]: link,
            [classes.justIcon]: justIcon,
            [className ? className : ""]: className,
        });

        return (
            <Button {...rest} classes={muiClasses} className={btnClasses}>
                {children}
            </Button>
        );
    }
}

(CustomButton as React.ComponentClass<CustomButtonProps>).propTypes = {
    classes: PropTypes.object.isRequired,
    color: PropTypes.oneOf([
        "primary",
        "info",
        "success",
        "warning",
        "danger",
        "rose",
        "white",
        "twitter",
        "facebook",
        "google",
        "linkedin",
        "pinterest",
        "youtube",
        "tumblr",
        "github",
        "behance",
        "dribbble",
        "reddit",
        "transparent",
    ]),
    size: PropTypes.oneOf(["sm", "lg"]),
    simple: PropTypes.bool,
    round: PropTypes.bool,
    fullWidth: PropTypes.bool,
    disabled: PropTypes.bool,
    block: PropTypes.bool,
    link: PropTypes.bool,
    justIcon: PropTypes.bool,
    className: PropTypes.string,
    muiClasses: PropTypes.object,
} as any;

export default withStyles(buttonStyle)(CustomButton);
