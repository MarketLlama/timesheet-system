import PropTypes from "prop-types";
import React from "react";

// @material-ui/core components
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";

// core components
import { GridContainer, GridItem } from "../../components/grid";

import { errorPageStyles } from "../../assets/jss";

export interface ErrorPageProps extends WithStyles<typeof errorPageStyles> {}

class ErrorPage extends React.Component<ErrorPageProps> {
    constructor(props: ErrorPageProps) {
        super(props);
    }
    public render() {
        const { classes } = this.props;
        return (
            <div className={classes.contentCenter}>
                <GridContainer>
                    <GridItem md={12}>
                        <h1 className={classes.title}>404</h1>
                        <h2 className={classes.subTitle}>Page not found :(</h2>
                        <h4 className={classes.description}>
                            Ooooups! Looks like you got lost.
                    </h4>
                    </GridItem>
                </GridContainer>
            </div>
        );
    }
}

(ErrorPage as React.ComponentClass<ErrorPageProps>).propTypes = {
    classes: PropTypes.object.isRequired,
} as any;

export default withStyles(errorPageStyles)(ErrorPage);
