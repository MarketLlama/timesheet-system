import PropTypes from "prop-types";
import React from "react";

// @material-ui/core components
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";

import { typographyStyle } from "../../assets/jss";

export interface SuccessProps extends WithStyles<typeof typographyStyle> {}

class Success extends React.Component<SuccessProps> {
    public render() {
        const { classes, children } = this.props;
        return (
          <div className={classes.defaultFontStyle + " " + classes.successText}>
            {children}
          </div>
        );
    }
}

(Success as React.ComponentClass<SuccessProps>).propTypes = {
    classes: PropTypes.object.isRequired,
} as any;

export default withStyles(typographyStyle)(Success);
