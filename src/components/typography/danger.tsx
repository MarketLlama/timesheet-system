import PropTypes from "prop-types";
import React from "react";

// @material-ui/core components
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";

import { typographyStyle } from "../../assets/jss";

export interface DangerProps extends WithStyles<typeof typographyStyle> {}

class Danger extends React.Component<DangerProps> {
    constructor(props: DangerProps) {
        super(props);
    }
    public render() {
        const { classes, children } = this.props;
        return (
          <div className={classes.defaultFontStyle + " " + classes.dangerText}>
            {children}
          </div>
        );
    }
}

(Danger as React.ComponentClass<DangerProps>).propTypes = {
    classes: PropTypes.object.isRequired,
} as any;

export default withStyles(typographyStyle)(Danger);
