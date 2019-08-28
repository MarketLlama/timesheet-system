import firebase, { User } from 'firebase';

import React from 'react';
import ReactDOM from 'react-dom';

import { create } from 'jss';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import { AdminLayout, AuthLayout } from './layouts';
import * as serviceWorker from './serviceWorker';
import configureStore, { history } from './store';

import firebaseConfig from './config/firebaseConfig';

import './assets/scss/timesheet.scss';

const store = configureStore();

// Initialize Firebase
export const fire = firebase.initializeApp(firebaseConfig);

let isAuthenticated = fire.auth().currentUser ? true : false;

fire.auth().onAuthStateChanged((user: User | null) => {
    if (user) {
        // User is signed in.
        isAuthenticated = true;
    } else {
        // No user is signed in.
        isAuthenticated = false;
    }
});

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            isAuthenticated === true ? (
                <Component {...props} />
            ) : (
                <Redirect from="/" to="/auth/login-page" />
            )
        }
    />
);

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Switch>
                <Route path="/auth" component={AuthLayout} />
                <PrivateRoute path="/admin" component={AdminLayout} />
                <Redirect from="/" to="/auth/login-page" />
            </Switch>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
