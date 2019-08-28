import PropTypes from "prop-types";
import React from "react";

// @material-ui/core components
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";

import { typographyStyle } from "../../assets/jss";

export interface QuoteProps extends WithStyles<typeof typographyStyle> {}

class Quote extends React.Component<QuoteProps> {
    public render() {
        const { classes, children } = this.props;
        return (
          <div className={classes.defaultFontStyle + " " + classes.quoteText}>
            {children}
          </div>
        );
    }
}

(Quote as React.ComponentClass<QuoteProps>).propTypes = {
    classes: PropTypes.object.isRequired,
} as any;

export default withStyles(typographyStyle)(Quote);
