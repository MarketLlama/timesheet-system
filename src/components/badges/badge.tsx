import PropTypes from "prop-types";
import React from "react";

// @material-ui/core components
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";

import { badgeStyle } from "../../assets/jss";

export interface BadgeProps extends WithStyles<typeof badgeStyle> {
    color: ColorType;
}

class Badge extends React.Component<BadgeProps> {
    public render() {
        const { classes, color, children } = this.props;
        return (
          <span className={classes.badge + " " + classes[color]}>{children}</span>
        );
    }
}

(Badge as React.ComponentClass<BadgeProps>).propTypes = {
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

export default withStyles(badgeStyle)(Badge);
