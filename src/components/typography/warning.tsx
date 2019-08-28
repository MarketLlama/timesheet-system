import PropTypes from "prop-types";
import React from "react";

// @material-ui/core components
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";

import { typographyStyle } from "../../assets/jss";

export interface WarningProps extends WithStyles<typeof typographyStyle> {}

class Warning extends React.Component<WarningProps> {
    public render() {
        const { classes, children } = this.props;
        return (
          <div className={classes.defaultFontStyle + " " + classes.warningText}>
            {children}
          </div>
        );
    }
}

(Warning as React.ComponentClass<WarningProps>).propTypes = {
    classes: PropTypes.object.isRequired,
} as any;

export default withStyles(typographyStyle)(Warning);
