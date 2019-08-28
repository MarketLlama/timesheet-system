import React from "react";

// @material-ui/core components
import { createStyles, WithStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = createStyles({
    grid: {
      margin: "0 -15px",
      width: "calc(100% + 30px)",
      // '&:before,&:after':{
      //   display: 'table',
      //   content: '" "',
      // },
      // '&:after':{
      //   clear: 'both',
      // }
    },
  });

export interface GridContainerProps extends WithStyles<typeof styles> {
    [rest: string]: any;
}

class GridContainer extends React.Component<GridContainerProps> {
    constructor(props: GridContainerProps) {
        super(props);
    }
    public render() {
        const { classes, children, className, ...rest } = this.props;
        return (
          <Grid container {...rest} className={classes.grid + " " + className}>
            {children}
          </Grid>
        );
    }
}

export default withStyles(styles)(GridContainer);
