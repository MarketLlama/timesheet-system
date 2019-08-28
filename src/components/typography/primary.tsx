import PropTypes from "prop-types";
import React from "react";

// @material-ui/core components
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";

import { typographyStyle } from "../../assets/jss";

export interface PrimaryProps extends WithStyles<typeof typographyStyle> {}

class Primary extends React.Component<PrimaryProps> {
    public render() {
        const { classes, children } = this.props;
        return (
          <div className={classes.defaultFontStyle + " " + classes.primaryText}>
            {children}
          </div>
        );
    }
}

(Primary as React.ComponentClass<PrimaryProps>).propTypes = {
    classes: PropTypes.object.isRequired,
} as any;

export default withStyles(typographyStyle)(Primary);
