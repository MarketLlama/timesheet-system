import cx from "classnames";
import PropTypes from "prop-types";
import React from "react";
import { NavLink } from "react-router-dom";

// @material-ui/core components
import AppBar from "@material-ui/core/AppBar";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";
import Toolbar from "@material-ui/core/Toolbar";

// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Fingerprint from "@material-ui/icons/Fingerprint";
import LockOpen from "@material-ui/icons/LockOpen";
import Menu from "@material-ui/icons/Menu";
import MonetizationOn from "@material-ui/icons/MonetizationOn";
import PersonAdd from "@material-ui/icons/PersonAdd";

// core components
import { Button } from "../customButtons";

import { authNavbarStyle } from "../../assets/jss";

import logo from "../../assets/img/cronus-wide-white.png";

export interface AuthNavbarProps extends WithStyles<typeof authNavbarStyle> {
    color: ColorType;
    brandText: string;
}

export interface AuthNavbarState {
    isOpen: boolean;
}

class AuthNavbar extends React.Component<AuthNavbarProps, AuthNavbarState> {
    constructor(props: AuthNavbarProps) {
        super(props);
        this.state = {
            isOpen: false,
        };
    }
    public componentDidUpdate(e: any) {
        if (e.history.location.pathname !== e.location.pathname) {
            this.setState({ isOpen: false });
        }
    }
    public render() {
        const { classes, color } = this.props;
        const colorClass = color as keyof typeof authNavbarStyle;
        const appBarClasses = cx({
            [" " + classes[colorClass]]: color,
        });
        let list = (
            <List className={classes.list}>
                <ListItem className={classes.listItem}>
                    <NavLink to={"/admin/dashboard"} className={classes.navLink}>
                        <Dashboard className={classes.listItemIcon} />
                        <ListItemText
                            primary={"Dashboard"}
                            disableTypography={true}
                            className={classes.listItemText}
                        />
                    </NavLink>
                </ListItem>
                <ListItem className={classes.listItem}>
                    <NavLink
                        to={"/auth/pricing-page"}
                        className={cx(classes.navLink, {
                            [classes.navLinkActive]: this._activeRoute("/auth/pricing-page"),
                        })}
                    >
                        <MonetizationOn className={classes.listItemIcon} />
                        <ListItemText
                            primary={"Cost Summary"}
                            disableTypography={true}
                            className={classes.listItemText}
                        />
                    </NavLink>
                </ListItem>
                <ListItem className={classes.listItem}>
                    <NavLink
                        to={"/auth/register-page"}
                        className={cx(classes.navLink, {
                            [classes.navLinkActive]: this._activeRoute("/auth/register-page"),
                        })}
                    >
                        <PersonAdd className={classes.listItemIcon} />
                        <ListItemText
                            primary={"Register"}
                            disableTypography={true}
                            className={classes.listItemText}
                        />
                    </NavLink>
                </ListItem>
                <ListItem className={classes.listItem}>
                    <NavLink
                        to={"/auth/login-page"}
                        className={cx(classes.navLink, {
                            [classes.navLinkActive]: this._activeRoute("/auth/login-page"),
                        })}
                    >
                        <Fingerprint className={classes.listItemIcon} />
                        <ListItemText
                            primary={"Login"}
                            disableTypography={true}
                            className={classes.listItemText}
                        />
                    </NavLink>
                </ListItem>
                <ListItem className={classes.listItem}>
                    <NavLink
                        to={"/auth/lock-screen-page"}
                        className={cx(classes.navLink, {
                            [classes.navLinkActive]: this._activeRoute(
                                "/auth/lock-screen-page",
                            ),
                        })}
                    >
                        <LockOpen className={classes.listItemIcon} />
                        <ListItemText
                            primary={"Lock"}
                            disableTypography={true}
                            className={classes.listItemText}
                        />
                    </NavLink>
                </ListItem>
            </List>
        );
        return (
            <AppBar position="static" className={classes.appBar + appBarClasses}>
                <Toolbar className={classes.container}>
                    <Hidden smDown>
                        <div className={classes.flex}>
                            <Button href="#" className={classes.title} color="transparent">
                                <img src={logo} />
                            </Button>
                        </div>
                    </Hidden>
                    <Hidden mdUp>
                        <div className={classes.flex}>
                            <Button href="#" className={classes.title} color="transparent">
                                <img src={logo} />
                            </Button>
                        </div>
                    </Hidden>
                    <Hidden smDown>{list}</Hidden>
                    <Hidden mdUp>
                        <Button
                            className={classes.sidebarButton}
                            color="transparent"
                            justIcon
                            aria-label="open drawer"
                            onClick={this._handleDrawerToggle}
                        >
                            <Menu />
                        </Button>
                    </Hidden>
                    <Hidden mdUp>
                        <Hidden mdUp>
                            <Drawer
                                variant="temporary"
                                anchor={"right"}
                                open={this.state.isOpen}
                                classes={{
                                    paper: classes.drawerPaper,
                                }}
                                onClose={this._handleDrawerToggle}
                                ModalProps={{
                                    keepMounted: true, // Better open performance on mobile.
                                }}
                            >
                                {list}
                            </Drawer>
                        </Hidden>
                    </Hidden>
                </Toolbar>
            </AppBar>
        );
    }
    private _handleDrawerToggle = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }
    // verifies if routeName is the one active (in browser input)
    private _activeRoute(routeName: string) {
        return window.location.pathname.indexOf(routeName) > -1 ? true : false;
    }
}

(AuthNavbar as React.ComponentClass<AuthNavbarProps>).propTypes = {
    classes: PropTypes.object.isRequired,
    color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]),
    brandText: PropTypes.string,
  } as any;

export default withStyles(authNavbarStyle)(AuthNavbar);
