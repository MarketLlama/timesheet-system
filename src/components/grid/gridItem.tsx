import React from "react";

// @material-ui/core components
import { createStyles, WithStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = createStyles({
    grid: {
      padding: "0 15px !important",
    },
  });

export interface GridItemProps extends WithStyles<typeof styles> {
    [rest: string]: any;
}

class GridItem extends React.Component<GridItemProps> {
    constructor(props: GridItemProps) {
        super(props);
    }
    public render() {
        const { classes, children, className, ...rest } = this.props;
        return (
          <Grid item {...rest} className={classes.grid + " " + className}>
            {children}
          </Grid>
        );
    }
}

export default withStyles(styles)(GridItem);
