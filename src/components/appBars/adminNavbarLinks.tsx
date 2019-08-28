import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";
// import { Manager, Target, Popper } from "react-popper";

// @material-ui/core components
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Hidden from "@material-ui/core/Hidden";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";
import { ReferenceObject } from "popper.js";

// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Notifications from "@material-ui/icons/Notifications";
import Person from "@material-ui/icons/Person";
import Search from "@material-ui/icons/Search";

// core components
import { Button } from "../../components/customButtons";
import { CustomInput } from "../../components/inputs";

import { adminNavbarLinksStyle } from "../../assets/jss";

export interface HeaderLinksProps extends WithStyles<typeof adminNavbarLinksStyle> {
}

export interface HeaderLinksState {
    isOpen: boolean;
}

class HeaderLinks extends React.Component<HeaderLinksProps, HeaderLinksState> {
    private anchorEl!: ReferenceObject;
    constructor(props: HeaderLinksProps) {
        super(props);
        this.state = { isOpen: false };
    }
    public render() {
        const { classes } = this.props;
        const { isOpen } = this.state;
        const searchButton =
            classes.top +
            " " +
            classes.searchButton +
            " " +
            classNames({
                [classes.searchRTL]: false,
            });
        const dropdownItem = classNames(
            classes.dropdownItem,
            classes.primaryHover,
        );
        const wrapper = classNames({
            [classes.wrapperRTL]: false,
        });
        const managerClasses = classNames({
            [classes.managerClasses]: true,
        });
        return (
            <div className={wrapper}>
                <CustomInput
                    formControlProps={{
                        className: classes.top + " " + classes.search,
                    }}
                    inputProps={{
                        placeholder: "Search",
                        inputProps: {
                            "aria-label": "Search",
                            "className": classes.searchInput,
                        },
                    }}
                />
                <Button
                    color="white"
                    aria-label="edit"
                    justIcon
                    round
                    className={searchButton}
                >
                    <Search
                        className={classes.headerLinksSvg + " " + classes.searchIcon}
                    />
                </Button>
                <Button
                    color="transparent"
                    simple
                    aria-label="Dashboard"
                    justIcon
                    className={classes.buttonLink}
                >
                    <Dashboard
                        className={
                            classes.headerLinksSvg +
                            " " + classes.links
                        }
                    />
                    <Hidden mdUp implementation="css">
                        <span className={classes.linkText}>
                            {"Dashboard"}
                        </span>
                    </Hidden>
                </Button>
                <div className={managerClasses}>
                    <Button
                        color="transparent"
                        justIcon
                        aria-label="Notifications"
                        aria-owns={isOpen ? "menu-list" : null}
                        aria-haspopup="true"
                        onClick={this._handleClick}
                        className={classes.buttonLink}
                        buttonRef={(node: any) => {
                            this.anchorEl = node;
                        }}
                    >
                        <Notifications
                            className={
                                classes.headerLinksSvg +
                                " " +
                                (classes.links)
                            }
                        />
                        <span className={classes.notifications}>5</span>
                        <Hidden mdUp implementation="css">
                            <span onClick={this._handleClick} className={classes.linkText}>
                                {"Notification"}
                            </span>
                        </Hidden>
                    </Button>
                    <Popper
                        open={isOpen}
                        anchorEl={this.anchorEl}
                        transition
                        disablePortal
                        placement="bottom"
                        className={classNames({
                            [classes.popperClose]: !isOpen,
                            [classes.pooperResponsive]: true,
                            [classes.pooperNav]: true,
                        })}
                    >
                        {({ TransitionProps, placement }) => (
                            <Grow
                                {...TransitionProps}
                                style={{ transformOrigin: "0 0 0" }}
                            >
                                <Paper className={classes.dropdown}>
                                    <ClickAwayListener onClickAway={this._handleClose}>
                                        <MenuList role="menu">
                                            <MenuItem
                                                onClick={this._handleClose}
                                                className={dropdownItem}
                                            >
                                                {"Mike John responded to your email"}
                                            </MenuItem>
                                            <MenuItem
                                                onClick={this._handleClose}
                                                className={dropdownItem}
                                            >
                                                { "You have 5 new tasks"}
                                            </MenuItem>
                                            <MenuItem
                                                onClick={this._handleClose}
                                                className={dropdownItem}
                                            >
                                                {"You're now friend with Andrew"}
                                            </MenuItem>
                                            <MenuItem
                                                onClick={this._handleClose}
                                                className={dropdownItem}
                                            >
                                                { "Another Notification"}
                                            </MenuItem>
                                            <MenuItem
                                                onClick={this._handleClose}
                                                className={dropdownItem}
                                            >
                                                { "Another One"}
                                            </MenuItem>
                                        </MenuList>
                                    </ClickAwayListener>
                                </Paper>
                            </Grow>
                        )}
                    </Popper>
                </div>
                <Button
                    color="transparent"
                    aria-label="Person"
                    justIcon
                    className={classes.buttonLink}
                >
                    <Person
                        className={
                            classes.headerLinksSvg +
                            " " + classes.links
                        }
                    />
                    <Hidden mdUp implementation="css">
                        <span className={classes.linkText}>
                            { "Profile"}
                        </span>
                    </Hidden>
                </Button>
            </div>
        );
    }
    private _handleClick = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }
    private _handleClose = () => {
        this.setState({ isOpen: false });
    }
}

(HeaderLinks as React.ComponentClass<HeaderLinksProps>).propTypes = {
    classes: PropTypes.object.isRequired,
  } as any;

export default withStyles(adminNavbarLinksStyle)(HeaderLinks);
