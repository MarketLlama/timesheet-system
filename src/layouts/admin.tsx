import cx from 'classnames';
// creates a beautiful scrollbar
import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';
import PropTypes from 'prop-types';
import React, { RefObject } from 'react';
import { Route, Switch } from 'react-router-dom';

// @material-ui/core components
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';

// Error page for incorrect root path
import DashErrorPage from '../views/dashboard/errorPage';

// core components
import { AdminNavbar } from '../components/appBars';
import { Footer } from '../components/footer';
import { Sidebar } from '../components/sidebar';

import routes, { IRoute } from '../utils/routes';

import { adminStyle } from '../assets/jss';

import logo from '../assets/img/cronus-wide-white.png';
import image from '../assets/img/sidebar-2.jpg';

let ps: { destroy: () => void };

export interface AdminLayoutProps extends WithStyles<typeof adminStyle> {
    location: Location;
}

export interface AdminLayoutState {
    mobileOpen: boolean;
    miniActive: boolean;
    image: string;
    color: string;
    bgColor: string;
    hasImage: boolean;
    fixedClasses: string;
}

class AdminLayout extends React.Component<AdminLayoutProps, AdminLayoutState> {
    private mainPanel: RefObject<HTMLDivElement>;
    constructor(props: AdminLayoutProps) {
        super(props);
        this.state = {
            mobileOpen: false,
            miniActive: false,
            image,
            color: 'red',
            bgColor: 'black',
            hasImage: true,
            fixedClasses: 'dropdown',
        };
        this.mainPanel = React.createRef();
    }
    public componentDidMount() {
        if (
            navigator.platform.indexOf('Win') > -1 &&
            this.mainPanel.current != null
        ) {
            ps = new PerfectScrollbar(this.mainPanel.current, {
                suppressScrollX: true,
                suppressScrollY: false,
            });
            document.body.style.overflow = 'hidden';
        }
        window.addEventListener('resize', this._resizeFunction);
    }
    public componentWillUnmount() {
        if (navigator.platform.indexOf('Win') > -1) {
            ps.destroy();
        }
        window.removeEventListener('resize', this._resizeFunction);
    }
    public componentDidUpdate(e: any) {
        if (e.history.location.pathname !== e.location.pathname) {
            const mainPanelNode = this.mainPanel.current;

            if (mainPanelNode != null) {
                mainPanelNode.scrollTop = 0;
            }

            if (this.state.mobileOpen) {
                this.setState({ mobileOpen: false });
            }
        }
    }
    public render() {
        const { classes, ...rest } = this.props;
        const mainPanel =
            classes.mainPanel +
            ' ' +
            cx({
                [classes.mainPanelSidebarMini]: this.state.miniActive,
                [classes.mainPanelWithPerfectScrollbar]:
                    navigator.platform.indexOf('Win') > -1,
            });
        return (
            <div className={classes.wrapper}>
                <Sidebar
                    routes={routes}
                    logoText={''}
                    logo={logo}
                    image={this.state.image}
                    handleDrawerToggle={this._handleDrawerToggle}
                    open={this.state.mobileOpen}
                    color={this.state.color}
                    bgColor={this.state.bgColor}
                    miniActive={this.state.miniActive}
                    {...rest}
                />
                <div className={mainPanel} ref={this.mainPanel}>
                    <AdminNavbar
                        color="gray"
                        sidebarMinimize={this._sidebarMinimize.bind(this)}
                        miniActive={this.state.miniActive}
                        brandText={this._getActiveRoute(routes)}
                        handleDrawerToggle={this._handleDrawerToggle}
                        {...rest}
                    />
                    {/* On the /maps/full-screen-maps route we want the map to be on full screen - this is not possible if the content and container classes are present because they have some paddings which would make the map smaller */}
                    {this._getRoute() ? (
                        <div className={classes.content}>
                            <div className={classes.container}>
                                <Switch>
                                    {this._getRoutes(routes)}
                                    <Route component={DashErrorPage} />
                                </Switch>
                            </div>
                        </div>
                    ) : (
                        <div className={classes.map}>
                            <Switch>{this._getRoutes(routes)}</Switch>
                        </div>
                    )}
                    {this._getRoute() ? <Footer fluid /> : null}
                </div>
            </div>
        );
    }
    private _handleImageClick = (image: string) => {
        this.setState({ image });
    };
    private _handleColorClick = (color: string) => {
        this.setState({ color });
    };
    private _handleBgColorClick = (bgColor: string) => {
        this.setState({ bgColor });
    };
    private _handleFixedClick = () => {
        if (this.state.fixedClasses === 'dropdown') {
            this.setState({ fixedClasses: 'dropdown show' });
        } else {
            this.setState({ fixedClasses: 'dropdown' });
        }
    };
    private _handleDrawerToggle = () => {
        this.setState({ mobileOpen: !this.state.mobileOpen });
    };
    private _getRoute() {
        return this.props.location.pathname !== '/admin/full-screen-maps';
    }
    private _getActiveRoute = (routes: IRoute[]): string => {
        const activeRoute = 'Error 404';
        routes.forEach(route => {
            if (route.collapse && route.views) {
                const collapseActiveRoute = this._getActiveRoute(route.views);
                if (collapseActiveRoute !== activeRoute) {
                    return collapseActiveRoute;
                }
            } else {
                if (
                    route.layout &&
                    route.path &&
                    window.location.href.indexOf(route.layout + route.path) !==
                        -1
                ) {
                    return route.name;
                }
            }
        });
        return activeRoute;
    };
    private _getRoutes: any = (routes: IRoute[]) => {
        return routes.map((prop, key) => {
            if (prop.collapse && prop.views) {
                return this._getRoutes(prop.views);
            }
            if (prop.layout === '/admin') {
                return (
                    <Route
                        path={prop.layout + prop.path}
                        component={prop.component}
                        key={key}
                    />
                );
            } else {
                return null;
            }
        });
    };
    private _sidebarMinimize() {
        this.setState({ miniActive: !this.state.miniActive });
    }
    private _resizeFunction = () => {
        if (window.innerWidth >= 960) {
            this.setState({ mobileOpen: false });
        }
    };
}

(AdminLayout as React.ComponentClass<AdminLayoutProps>).propTypes = {
    classes: PropTypes.object.isRequired,
} as any;

export default withStyles(adminStyle)(AdminLayout);
