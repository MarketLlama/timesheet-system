import AppBar from "@material-ui/core/AppBar";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
// @material-ui/core components
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";
import Toolbar from "@material-ui/core/Toolbar";
// @material-ui/icons
import Menu from "@material-ui/icons/Menu";
import PropTypes from "prop-types";
import React from "react";
// my components
import { IRoute } from "../../utils/routes";
import CustomButton from "../customButtons/button";

import { basicAppBarStyle } from "../../assets/jss/basicAppBarStyle";

export interface BasicAppBarProps extends WithStyles<typeof basicAppBarStyle> {
  color?: ColorType;
  location?: Location;
  handleDrawerToggle?: () => void;
  routes: IRoute[];
}

class BasicAppBar extends React.Component<BasicAppBarProps> {
  constructor(props: BasicAppBarProps) {
    super(props);
  }
  public render() {
    const { classes, handleDrawerToggle } = this.props;
    return (
      <AppBar className={classes.appBar}>
        <Toolbar className={classes.container}>
          <div className={classes.flex}>
            {/* Here we create navbar brand, based on route name */}
            <CustomButton color="transparent" href="#" className={classes.title}>
              {this._makeBrand()}
            </CustomButton>
          </div>
          <Hidden smDown implementation="css">
            Hello World
          </Hidden>
          <Hidden mdUp implementation="css">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerToggle}
            >
              <Menu />
            </IconButton>
          </Hidden>
        </Toolbar>
      </AppBar>
    );
  }

  private _makeBrand = () => {
    const { routes, location } = this.props;

    let name: string = "";

    routes.map((prop, key) => {
      if (location && prop.path === location.pathname) {
        name = prop.name;
      }
    });

    return name;
  }
}

(BasicAppBar as React.ComponentClass<BasicAppBarProps>).propTypes = {
  classes: PropTypes.object.isRequired,
} as any;

export default withStyles(basicAppBarStyle)(BasicAppBar);
