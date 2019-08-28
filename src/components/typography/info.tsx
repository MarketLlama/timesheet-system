import PropTypes from "prop-types";
import React from "react";

// @material-ui/core components
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";

import { typographyStyle } from "../../assets/jss";

export interface InfoProps extends WithStyles<typeof typographyStyle> {}

class Info extends React.Component<InfoProps> {

    public render() {
        const { classes, children } = this.props;
        return (
          <div className={classes.defaultFontStyle + " " + classes.infoText}>
            {children}
          </div>
        );
    }
}

(Info as React.ComponentClass<InfoProps>).propTypes = {
    classes: PropTypes.object.isRequired,
} as any;

export default withStyles(typographyStyle)(Info);
