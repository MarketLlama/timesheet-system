import PropTypes from "prop-types";
import React from "react";

// @material-ui/core components
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";

import { typographyStyle } from "../../assets/jss";

export interface MutedProps extends WithStyles<typeof typographyStyle> {}

class Muted extends React.Component<MutedProps> {

    public render() {
        const { classes, children } = this.props;
        return (
          <div className={classes.defaultFontStyle + " " + classes.mutedText}>
            {children}
          </div>
        );
    }
}

(Muted as React.ComponentClass<MutedProps>).propTypes = {
    classes: PropTypes.object.isRequired,
} as any;

export default withStyles(typographyStyle)(Muted);
