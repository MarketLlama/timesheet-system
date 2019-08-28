import PropTypes from "prop-types";
import React from "react";

// @material-ui/core components
import LinearProgress from "@material-ui/core/LinearProgress";
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";

import { customLinearProgressStyle } from "../../assets/jss";

export interface CustomLinearProgressProps extends WithStyles<typeof customLinearProgressStyle> {
    color: ColorType;
}

class CustomLinearProgress extends React.Component<CustomLinearProgressProps> {

    public static defaultProps: Partial<CustomLinearProgressProps> = {
        color: "gray",
    };

    public render() {
        const { classes, color, ...rest } = this.props;

        return (
            <LinearProgress
                {...rest}
                classes={{
                    root: classes.root + " " + classes[color + "Background"],
                    bar: classes.bar + " " + classes[color],
                }}
            />
        );
    }
}

(CustomLinearProgress as React.ComponentClass<CustomLinearProgressProps>).propTypes = {
    classes: PropTypes.object.isRequired,
    color: PropTypes.oneOf([
        "primary",
        "warning",
        "danger",
        "success",
        "info",
        "rose",
        "gray",
    ]),
} as any;

export default withStyles(customLinearProgressStyle)(CustomLinearProgress);
