import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
// javascript plugin used to create scrollbars on windows
import { NavLink } from 'react-router-dom';

// @material-ui/core components
import Collapse from '@material-ui/core/Collapse';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import Icon from '@material-ui/core/Icon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';

// core components
import { SidebarWrapper } from '.';
import { AdminNavbarLinks } from '../appBars';

import { sidebarStyle } from '../../assets/jss';

import avatar from '../../assets/img/faces/avatar.jpg';
import { IRoute } from '../../utils/routes';

export interface SidebarProps extends WithStyles<typeof sidebarStyle> {
    color: ColorType;
    bgColor: bgColorType;
    logo: string;
    logoText: string;
    image: string;
    routes: IRoute[];
    [rest: string]: any;
}

export interface SidebarState {
    openAvatar: boolean;
    miniActive: boolean;
    [rest: string]: any;
}

class Sidebar extends React.Component<SidebarProps, SidebarState> {
    constructor(props: SidebarProps) {
        super(props);
        this.state = {
            openAvatar: false,
            miniActive: true,
            ...this._getCollapseStates(props.routes),
        };
    }
    public render() {
        const { classes, logo, image, routes, bgColor } = this.props;
        const rtlActive = false;
        const bgColorClass = (bgColor +
            'Background') as keyof typeof sidebarStyle;
        const itemText =
            classes.itemText +
            ' ' +
            cx({
                [classes.itemTextMini]:
                    this.props.miniActive && this.state.miniActive,
                [classes.itemTextMiniRTL]:
                    rtlActive && this.props.miniActive && this.state.miniActive,
                [classes.itemTextRTL]: rtlActive,
            });
        const collapseItemText =
            classes.collapseItemText +
            ' ' +
            cx({
                [classes.collapseItemTextMini]:
                    this.props.miniActive && this.state.miniActive,
                [classes.collapseItemTextMiniRTL]:
                    rtlActive && this.props.miniActive && this.state.miniActive,
                [classes.collapseItemTextRTL]: rtlActive,
            });
        const userWrapperClass =
            classes.user +
            ' ' +
            cx({
                [classes.whiteAfter]: bgColor === 'white',
            });
        const caret =
            classes.caret +
            ' ' +
            cx({
                [classes.caretRTL]: rtlActive,
            });
        const collapseItemMini =
            classes.collapseItemMini +
            ' ' +
            cx({
                [classes.collapseItemMiniRTL]: rtlActive,
            });
        const photo =
            classes.photo +
            ' ' +
            cx({
                [classes.photoRTL]: rtlActive,
            });
        const user = (
            <div className={userWrapperClass}>
                <div className={photo}>
                    <img src={avatar} className={classes.avatarImg} alt="..." />
                </div>
                <List className={classes.list}>
                    <ListItem className={classes.item + ' ' + classes.userItem}>
                        <NavLink
                            to={'#'}
                            className={
                                classes.itemLink +
                                ' ' +
                                classes.userCollapseButton
                            }
                            onClick={() => this._openCollapse('openAvatar')}
                        >
                            <ListItemText
                                primary={'Tania Andrew'}
                                secondary={
                                    <b
                                        className={
                                            caret +
                                            ' ' +
                                            classes.userCaret +
                                            ' ' +
                                            (this.state.openAvatar
                                                ? classes.caretActive
                                                : '')
                                        }
                                    />
                                }
                                disableTypography={true}
                                className={
                                    itemText + ' ' + classes.userItemText
                                }
                            />
                        </NavLink>
                        <Collapse in={this.state.openAvatar} unmountOnExit>
                            <List
                                className={
                                    classes.list + ' ' + classes.collapseList
                                }
                            >
                                <ListItem className={classes.collapseItem}>
                                    <NavLink
                                        to="#"
                                        className={
                                            classes.itemLink +
                                            ' ' +
                                            classes.userCollapseLinks
                                        }
                                    >
                                        <span className={collapseItemMini}>
                                            {'MP'}
                                        </span>
                                        <ListItemText
                                            primary={'My Profile'}
                                            disableTypography={true}
                                            className={collapseItemText}
                                        />
                                    </NavLink>
                                </ListItem>
                                <ListItem className={classes.collapseItem}>
                                    <NavLink
                                        to="#"
                                        className={
                                            classes.itemLink +
                                            ' ' +
                                            classes.userCollapseLinks
                                        }
                                    >
                                        <span className={collapseItemMini}>
                                            {'EP'}
                                        </span>
                                        <ListItemText
                                            primary={'Edit Profile'}
                                            disableTypography={true}
                                            className={collapseItemText}
                                        />
                                    </NavLink>
                                </ListItem>
                                <ListItem className={classes.collapseItem}>
                                    <NavLink
                                        to="#"
                                        className={
                                            classes.itemLink +
                                            ' ' +
                                            classes.userCollapseLinks
                                        }
                                    >
                                        <span className={collapseItemMini}>
                                            {'S'}
                                        </span>
                                        <ListItemText
                                            primary={'Settings'}
                                            disableTypography={true}
                                            className={collapseItemText}
                                        />
                                    </NavLink>
                                </ListItem>
                            </List>
                        </Collapse>
                    </ListItem>
                </List>
            </div>
        );
        const links = (
            <List className={classes.list}>{this._createLinks(routes)}</List>
        );

        const logoMini =
            classes.logoMini +
            ' ' +
            cx({
                [classes.logoMiniRTL]: rtlActive,
            });
        const logoClasses =
            classes.logo +
            ' ' +
            cx({
                [classes.whiteAfter]: bgColor === 'white',
            });
        const brand = (
            <div className={logoClasses}>
                <a href="https://www.google.com" className={logoMini}>
                    <img src={logo} alt="logo" className={classes.img} />
                </a>
            </div>
        );
        const drawerPaper =
            classes.drawerPaper +
            ' ' +
            cx({
                [classes.drawerPaperMini]:
                    this.props.miniActive && this.state.miniActive,
                [classes.drawerPaperRTL]: false,
            });
        const sidebarWrapper =
            classes.sidebarWrapper +
            ' ' +
            cx({
                [classes.drawerPaperMini]:
                    this.props.miniActive && this.state.miniActive,
                [classes.sidebarWrapperWithPerfectScrollbar]:
                    navigator.platform.indexOf('Win') > -1,
            });
        return (
            <div ref="mainPanel">
                <Hidden mdUp implementation="css">
                    <Drawer
                        variant="temporary"
                        anchor={'right'}
                        open={this.props.open}
                        classes={{
                            paper: drawerPaper + ' ' + classes[bgColorClass],
                        }}
                        onClose={this.props.handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {brand}
                        <SidebarWrapper
                            className={sidebarWrapper}
                            user={user}
                            headerLinks={<AdminNavbarLinks />}
                            links={links}
                        />
                        {image !== undefined ? (
                            <div
                                className={classes.background}
                                style={{
                                    backgroundImage: 'url(' + image + ')',
                                }}
                            />
                        ) : null}
                    </Drawer>
                </Hidden>
                <Hidden smDown implementation="css">
                    <Drawer
                        onMouseOver={() => this.setState({ miniActive: false })}
                        onMouseOut={() => this.setState({ miniActive: true })}
                        anchor={'left'}
                        variant="permanent"
                        open
                        classes={{
                            paper: drawerPaper + ' ' + classes[bgColorClass],
                        }}
                    >
                        {brand}
                        <SidebarWrapper
                            className={sidebarWrapper}
                            user={user}
                            links={links}
                        />
                        {image !== undefined ? (
                            <div
                                className={classes.background}
                                style={{
                                    backgroundImage: 'url(' + image + ')',
                                }}
                            />
                        ) : null}
                    </Drawer>
                </Hidden>
            </div>
        );
    }
    // this creates the intial state of this component based on the collapse routes
    // that it gets through this.props.routes
    private _getCollapseStates = (routes: IRoute[]) => {
        let initialState = {};
        routes.map((prop: IRoute, key) => {
            if (prop.collapse && prop.views && prop.state) {
                initialState = {
                    [prop.state]: this._getCollapseInitialState(prop.views),
                    ...this._getCollapseStates(prop.views),
                    ...initialState,
                };
            }
            return null;
        });
        return initialState;
    };
    // this verifies if any of the collapses should be default opened on a rerender of this component
    // for example, on the refresh of the page,
    // while on the src/views/forms/RegularForms.jsx - route /admin/regular-forms
    private _getCollapseInitialState(routes: IRoute[]) {
        routes.forEach((route: IRoute) => {
            if (
                route.collapse &&
                route.views &&
                this._getCollapseInitialState(route.views)
            ) {
                return true;
            } else if (
                route.path &&
                window.location.href.indexOf(route.path) !== -1
            ) {
                return true;
            }
        });
        return false;
    }
    // verifies if routeName is the one active (in browser input)
    private _activeRoute = (routeName: string) => {
        return window.location.pathname.indexOf(routeName) > -1 ? 'active' : '';
    };
    private _openCollapse(collapse: string) {
        const st = {
            [collapse]: !this.state[collapse],
        };
        this.setState(st);
    }
    // this function creates the links and collapses that appear in the sidebar (left menu)
    private _createLinks = (routes: IRoute[]) => {
        const { classes, color } = this.props;
        const rtlActive = false;
        const colorClass = color as keyof typeof sidebarStyle;
        return routes.map((prop, key) => {
            prop.path = prop.path ? prop.path : '';
            prop.layout = prop.layout ? prop.layout : '';
            if (prop.redirect || prop.excludeFromNavigation) {
                return null;
            }
            if (prop.collapse && prop.views && prop.state) {
                const st = {
                    [prop.state]: !this.state[prop.state],
                };
                const navLinkClasses =
                    classes.itemLink +
                    ' ' +
                    cx({
                        [' ' +
                        classes.collapseActive]: this._getCollapseInitialState(
                            prop.views
                        ),
                    });
                const itemText =
                    classes.itemText +
                    ' ' +
                    cx({
                        [classes.itemTextMini]:
                            this.props.miniActive && this.state.miniActive,
                        [classes.itemTextMiniRTL]:
                            rtlActive &&
                            this.props.miniActive &&
                            this.state.miniActive,
                        [classes.itemTextRTL]: rtlActive,
                    });
                const collapseItemText =
                    classes.collapseItemText +
                    ' ' +
                    cx({
                        [classes.collapseItemTextMini]:
                            this.props.miniActive && this.state.miniActive,
                        [classes.collapseItemTextMiniRTL]:
                            rtlActive &&
                            this.props.miniActive &&
                            this.state.miniActive,
                        [classes.collapseItemTextRTL]: rtlActive,
                    });
                const itemIcon =
                    classes.itemIcon +
                    ' ' +
                    cx({
                        [classes.itemIconRTL]: rtlActive,
                    });
                const caret =
                    classes.caret +
                    ' ' +
                    cx({
                        [classes.caretRTL]: rtlActive,
                    });
                const collapseItemMini =
                    classes.collapseItemMini +
                    ' ' +
                    cx({
                        [classes.collapseItemMiniRTL]: rtlActive,
                    });
                return (
                    <ListItem
                        key={key}
                        className={cx(
                            { [classes.item]: prop.icon !== undefined },
                            { [classes.collapseItem]: prop.icon === undefined }
                        )}
                    >
                        <NavLink
                            to={'#'}
                            className={navLinkClasses}
                            onClick={e => {
                                e.preventDefault();
                                this.setState(st);
                            }}
                        >
                            {prop.icon !== undefined ? (
                                typeof prop.icon === 'string' ? (
                                    <Icon className={itemIcon}>
                                        {prop.icon}
                                    </Icon>
                                ) : (
                                    <prop.icon className={itemIcon} />
                                )
                            ) : (
                                <span className={collapseItemMini}>
                                    {prop.mini}
                                </span>
                            )}
                            <ListItemText
                                primary={prop.name}
                                secondary={
                                    <b
                                        className={
                                            caret +
                                            ' ' +
                                            (this.state[prop.state]
                                                ? classes.caretActive
                                                : '')
                                        }
                                    />
                                }
                                disableTypography={true}
                                className={cx(
                                    { [itemText]: prop.icon !== undefined },
                                    {
                                        [collapseItemText]:
                                            prop.icon === undefined,
                                    }
                                )}
                            />
                        </NavLink>
                        <Collapse in={this.state[prop.state]} unmountOnExit>
                            <List
                                className={
                                    classes.list + ' ' + classes.collapseList
                                }
                            >
                                {this._createLinks(prop.views)}
                            </List>
                        </Collapse>
                    </ListItem>
                );
            }
            const innerNavLinkClasses =
                classes.collapseItemLink +
                ' ' +
                cx({
                    [' ' + classes[colorClass]]: this._activeRoute(prop.path),
                });
            const collapseItemMini =
                classes.collapseItemMini +
                ' ' +
                cx({
                    [classes.collapseItemMiniRTL]: rtlActive,
                });
            const navLinkClasses =
                classes.itemLink +
                ' ' +
                cx({
                    [' ' + classes[colorClass]]: this._activeRoute(prop.path),
                });
            const itemText =
                classes.itemText +
                ' ' +
                cx({
                    [classes.itemTextMini]:
                        this.props.miniActive && this.state.miniActive,
                    [classes.itemTextMiniRTL]:
                        rtlActive &&
                        this.props.miniActive &&
                        this.state.miniActive,
                    [classes.itemTextRTL]: rtlActive,
                });
            const collapseItemText =
                classes.collapseItemText +
                ' ' +
                cx({
                    [classes.collapseItemTextMini]:
                        this.props.miniActive && this.state.miniActive,
                    [classes.collapseItemTextMiniRTL]:
                        rtlActive &&
                        this.props.miniActive &&
                        this.state.miniActive,
                    [classes.collapseItemTextRTL]: rtlActive,
                });
            const itemIcon =
                classes.itemIcon +
                ' ' +
                cx({
                    [classes.itemIconRTL]: rtlActive,
                });
            return (
                <ListItem
                    key={key}
                    className={cx(
                        { [classes.item]: prop.icon !== undefined },
                        { [classes.collapseItem]: prop.icon === undefined }
                    )}
                >
                    <NavLink
                        to={prop.layout + prop.path}
                        className={cx(
                            { [navLinkClasses]: prop.icon !== undefined },
                            { [innerNavLinkClasses]: prop.icon === undefined }
                        )}
                    >
                        {prop.icon !== undefined ? (
                            typeof prop.icon === 'string' ? (
                                <Icon className={itemIcon}>{prop.icon}</Icon>
                            ) : (
                                <prop.icon className={itemIcon} />
                            )
                        ) : (
                            <span className={collapseItemMini}>
                                {prop.mini}
                            </span>
                        )}
                        <ListItemText
                            primary={prop.name}
                            disableTypography={true}
                            className={cx(
                                { [itemText]: prop.icon !== undefined },
                                { [collapseItemText]: prop.icon === undefined }
                            )}
                        />
                    </NavLink>
                </ListItem>
            );
        });
    };
}

(Sidebar as React.ComponentClass<SidebarProps>).propTypes = {
    classes: PropTypes.object.isRequired,
    bgColor: PropTypes.oneOf(['white', 'black', 'blue']),
    color: PropTypes.oneOf([
        'white',
        'red',
        'orange',
        'green',
        'blue',
        'purple',
        'rose',
    ]),
    logo: PropTypes.string,
    logoText: PropTypes.string,
    image: PropTypes.string,
    routes: PropTypes.arrayOf(PropTypes.object),
} as any;

export default withStyles(sidebarStyle)(Sidebar);
