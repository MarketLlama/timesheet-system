import PropTypes from "prop-types";
import React from "react";

// @material-ui/core components
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";

import { SvgIconProps } from "@material-ui/core/SvgIcon";
import { infoStyle } from "../../assets/jss";

export interface InfoAreaProps extends WithStyles<typeof infoStyle> {
    icon: React.ComponentType<SvgIconProps>;
    title: string;
    description: string;
    iconColor: ColorType;
}

class InfoArea extends React.Component<InfoAreaProps> {
    public static defaultProps: Partial<InfoAreaProps> = {
        iconColor: "gray",
    };
    public render() {
        const { classes, title, description, iconColor } = this.props;
        return (
            <div className={classes.infoArea}>
                <div className={classes.iconWrapper + " " + classes[iconColor]}>
                    <this.props.icon className={classes.icon} />
                </div>
                <div className={classes.descriptionWrapper}>
                    <h4 className={classes.title}>{title}</h4>
                    <p className={classes.description}>{description}</p>
                </div>
            </div>
        );
    }
}
(InfoArea as React.ComponentClass<InfoAreaProps>).propTypes = {
    classes: PropTypes.object.isRequired,
    icon: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    iconColor: PropTypes.oneOf([
        "primary",
        "warning",
        "danger",
        "success",
        "info",
        "rose",
        "gray",
    ]),
} as any;

export default withStyles(infoStyle)(InfoArea);
