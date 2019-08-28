import PropTypes from 'prop-types';
import React from 'react';
import { Route, Switch } from 'react-router-dom';

// @material-ui/core components
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';

// core components
import { AuthNavbar } from '../components/appBars';
import { Footer } from '../components/footer';

// Error page for incorrect root path
import ErrorPage from '../views/pages/errorPage';

import routes, { IRoute } from '../utils/routes';

import { authPageStyle } from '../assets/jss';

import pricing from '../assets/img/bg-pricing.jpeg';
import error from '../assets/img/clint-mckoy.jpg';
import lock from '../assets/img/lock.jpeg';
import login from '../assets/img/login.jpeg';
import onBoarding from '../assets/img/onboarding.jpg';
import register from '../assets/img/register.jpeg';

export interface AuthLayoutProps extends WithStyles<typeof authPageStyle> {}

class AuthLayout extends React.Component<AuthLayoutProps> {
    constructor(props: AuthLayoutProps) {
        super(props);
    }
    public componentDidMount() {
        document.body.style.overflow = 'unset';
    }
    public render() {
        const { classes, ...rest } = this.props;
        return (
            <div>
                <AuthNavbar
                    brandText={this._getActiveRoute(routes)}
                    color="gray"
                    {...rest}
                />
                <div className={classes.wrapper}>
                    <div
                        className={classes.fullPage}
                        style={{
                            backgroundImage: 'url(' + this._getBgImage() + ')',
                        }}
                    >
                        <Switch>
                            {this._getRoutes(routes)}
                            <Route component={ErrorPage} />
                        </Switch>
                        <Footer white />
                    </div>
                </div>
            </div>
        );
    }
    private _getRoutes: any = (routes: IRoute[]) => {
        return routes.map((prop: IRoute, key) => {
            if (prop.collapse && prop.views) {
                return this._getRoutes(prop.views);
            }
            if (prop.layout === '/auth') {
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
    private _getBgImage = () => {
        if (window.location.pathname.indexOf('/auth/register-page') !== -1) {
            return register;
        } else if (
            window.location.pathname.indexOf('/auth/login-page') !== -1
        ) {
            return login;
        } else if (
            window.location.pathname.indexOf('/auth/pricing-page') !== -1
        ) {
            return pricing;
        } else if (
            window.location.pathname.indexOf('/auth/lock-screen-page') !== -1
        ) {
            return lock;
        } else if (window.location.pathname.indexOf('/auth/onboard') !== -1) {
            return onBoarding;
        } else {
            return error;
        }
    };
    private _getActiveRoute = (routes: IRoute[]): string => {
        const activeRoute = 'Default Brand Text';
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
}

(AuthLayout as React.ComponentClass<AuthLayoutProps>).propTypes = {
    classes: PropTypes.object.isRequired,
} as any;

export default withStyles(authPageStyle)(AuthLayout);
