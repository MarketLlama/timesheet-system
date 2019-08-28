import cx from "classnames";
import PropTypes from "prop-types";
import React from "react";

// @material-ui/core components
import AppBar from "@material-ui/core/AppBar";
import Hidden from "@material-ui/core/Hidden";
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";
import Toolbar from "@material-ui/core/Toolbar";

// material-ui icons
import Menu from "@material-ui/icons/Menu";
import MoreVert from "@material-ui/icons/MoreVert";
import ViewList from "@material-ui/icons/ViewList";

// core components
import { Button } from "../../components/customButtons";
import AdminNavbarLinks from "./adminNavbarLinks";

import { adminNavbarStyle } from "../../assets/jss";

export interface AdminNavbarProps extends WithStyles<typeof adminNavbarStyle> {
    color: ColorType;
    brandText: string;
    miniActive?: boolean;
    handleDrawerToggle?: Function;
    sidebarMinimize: Function;
}

export interface AdminNavbarState {

}

class AdminNavbar extends React.Component<AdminNavbarProps, AdminNavbarState> {
    constructor(props: AdminNavbarProps) {
        super(props);
    }
    public render() {
        const { classes, color, brandText, miniActive, handleDrawerToggle, sidebarMinimize } = this.props;
        const colorClass = color as keyof typeof adminNavbarStyle;
        const appBarClasses = cx({
          [" " + classes[colorClass]]: color,
        });
        const sidebarMinimizeClass =
          classes.sidebarMinimize +
          " " +
          cx({
            [classes.sidebarMinimizeRTL]: false,
          });
        return (
          <AppBar className={classes.appBar + appBarClasses}>
            <Toolbar className={classes.container}>
              <Hidden smDown implementation="css">
                <div className={sidebarMinimizeClass}>
                  {miniActive ? (
                    <Button
                      justIcon
                      round
                      color="white"
                      onClick={sidebarMinimize}
                    >
                      <ViewList className={classes.sidebarMiniIcon} />
                    </Button>
                  ) : (
                    <Button
                      justIcon
                      round
                      color="white"
                      onClick={sidebarMinimize}
                    >
                      <MoreVert className={classes.sidebarMiniIcon} />
                    </Button>
                  )}
                </div>
              </Hidden>
              <div className={classes.flex}>
                {/* Here we create navbar brand, based on route name */}
                <Button href="#" className={classes.title} color="transparent">
                  {brandText}
                </Button>
              </div>
              <Hidden smDown implementation="css">
                <AdminNavbarLinks />
              </Hidden>
              <Hidden mdUp implementation="css">
                <Button
                  className={classes.appResponsive}
                  color="transparent"
                  justIcon
                  aria-label="open drawer"
                  onClick={handleDrawerToggle}
                >
                  <Menu />
                </Button>
              </Hidden>
            </Toolbar>
          </AppBar>
        );
    }
}

(AdminNavbar as React.ComponentClass<AdminNavbarProps>).propTypes = {
    classes: PropTypes.object.isRequired,
    color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]),
    brandText: PropTypes.string,
    miniActive : PropTypes.bool,
    handleDrawerToggle : PropTypes.func,
    sidebarMinimize : PropTypes.func,
  } as any;

export default withStyles(adminNavbarStyle)(AdminNavbar);
