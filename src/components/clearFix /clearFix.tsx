import PropTypes from "prop-types";
import React from "react";

// mterial-ui components
import withStyles from "@material-ui/core/styles/withStyles";

import { createStyles, WithStyles } from "@material-ui/core/styles";

const style = createStyles({
    clearfix: {
      "&:after,&:before": {
        display: "table",
        content: '" "',
      },
      "&:after": {
        clear: "both",
      },
    },
});

export interface ClearfixProps extends WithStyles<typeof style> {}

class Clearfix extends React.Component<ClearfixProps> {
    public render() {
        const { classes } = this.props;
        return <div className={classes.clearfix} />;
    }
}

(Clearfix as React.ComponentClass<ClearfixProps>).propTypes = {
    classes: PropTypes.object.isRequired,
} as any;

export default withStyles(style)(Clearfix);
