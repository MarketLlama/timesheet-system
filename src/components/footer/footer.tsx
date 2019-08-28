import cx from "classnames";
import PropTypes from "prop-types";
import React from "react";

// @material-ui/core components
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";

import { footerStyle } from "../../assets/jss";

export interface FooterProps extends WithStyles<typeof footerStyle> {
    fluid?: boolean;
    white?: boolean;
}

export interface FooterState {

}

class Footer extends React.Component<FooterProps, FooterState> {
    constructor(props: FooterProps) {
        super(props);
    }
    public render() {
        const { classes, fluid, white } = this.props;
        const container = cx({
          [classes.container]: !fluid,
          [classes.containerFluid]: fluid,
          [classes.whiteColor]: white,
        });

        const block = cx({
          [classes.block]: true,
          [classes.whiteColor]: white,
        });
        return (
            <footer className={classes.footer}>
            <div className={container}>
              <div className={classes.left}>
                <List className={classes.list}>
                  <ListItem className={classes.inlineBlock}>
                    <a href="#home" className={block}>
                      {"Home"}
                    </a>
                  </ListItem>
                  <ListItem className={classes.inlineBlock}>
                    <a href="#company" className={block}>
                      { "Company"}
                    </a>
                  </ListItem>
                  <ListItem className={classes.inlineBlock}>
                    <a href="#portfolio" className={block}>
                      {"Portfolio"}
                    </a>
                  </ListItem>
                  <ListItem className={classes.inlineBlock}>
                    <a href="#blog" className={block}>
                      {"Blog"}
                    </a>
                  </ListItem>
                </List>
              </div>
            </div>
          </footer>
         );
    }
}

(Footer as React.ComponentClass<FooterProps>).propTypes = {
    classes: PropTypes.object.isRequired,
    fluid: PropTypes.bool,
    white: PropTypes.bool,
} as any;

export default withStyles(footerStyle)(Footer);
