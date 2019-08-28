import { SvgIconProps } from '@material-ui/core/SvgIcon';

// Dash pages
import Dashboard from '../views/dashboard/dashboard';
import DashErrorPage from '../views/dashboard/errorPage';
import TimeSheetInput from '../views/dashboard/timesheet-input';

// Non dash pages
import ErrorPage from '../views/pages/errorPage';
import LockScreenPage from '../views/pages/lockScreenPage';
import LoginPage from '../views/pages/loginPage';
import RegisterPage from '../views/pages/registerPage';
import onBoardingPage from '../views/pages/onBoardingPage';
import validateEmail from '../views/pages/validateEmail';

// @material-ui/icons
import Apps from '@material-ui/icons/Apps';
import DashboardIcon from '@material-ui/icons/Dashboard';
import DateRange from '@material-ui/icons/DateRange';
import GridOn from '@material-ui/icons/GridOn';
import Image from '@material-ui/icons/Image';
import Place from '@material-ui/icons/Place';
import Timeline from '@material-ui/icons/Timeline';
import WidgetsIcon from '@material-ui/icons/Widgets';

import { RouteComponentProps, StaticContext } from 'react-router';

export interface IRoute {
    path?: string;
    name: string;
    icon?: React.ComponentType<SvgIconProps>;
    component?:
        | React.ComponentClass<any, any>
        | React.FunctionComponent<any>
        | React.ComponentClass<
              RouteComponentProps<any, StaticContext, any>,
              any
          >
        | React.FunctionComponent<RouteComponentProps<any, StaticContext, any>>
        | undefined;
    layout?: string;
    mini?: string;
    state?: string;
    collapse?: boolean;
    views?: IRoute[];
    redirect?: boolean;
    excludeFromNavigation?: boolean;
}

const dashRoutes: IRoute[] = [
    {
        path: '/dashboard',
        name: 'Dashboard',
        icon: DashboardIcon,
        component: Dashboard,
        layout: '/admin',
        collapse: false,
    },
    {
        collapse: true,
        name: 'Pages',
        icon: Image,
        state: 'pageCollapse',
        views: [
            {
                path: '/login-page',
                name: 'Login Page',
                mini: 'L',
                component: LoginPage,
                layout: '/auth',
            },
            {
                path: '/lock-screen-page',
                name: 'Lock Screen Page',
                mini: 'LS',
                component: LockScreenPage,
                layout: '/auth',
            },
            {
                path: '/register-page',
                name: 'Register Page',
                mini: 'R',
                component: RegisterPage,
                layout: '/auth',
            },
            {
                path: '/error-page',
                name: 'Error Page',
                mini: 'E',
                component: ErrorPage,
                layout: '/auth',
                excludeFromNavigation: true,
            },
            {
                path: '/onboard',
                name: 'Sign Up',
                mini: 'SU',
                component: onBoardingPage,
                layout: '/auth',
                excludeFromNavigation: true,
            },
            {
                path: '/verify',
                name: 'ver',
                mini: 'XX',
                component: validateEmail,
                layout: '/auth',
                excludeFromNavigation: true,
            },
        ],
    },
    {
        path: '/new-timesheet',
        name: 'New Timesheet',
        mini: 'NS',
        icon: DashboardIcon,
        collapse: false,
        component: TimeSheetInput,
        layout: '/admin',
    },
];
export default dashRoutes;
