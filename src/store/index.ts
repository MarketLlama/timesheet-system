import { createStore, combineReducers, applyMiddleware } from 'redux';
import { routerMiddleware, connectRouter } from 'connected-react-router';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createBrowserHistory } from 'history';

//Reducers
import { userSessionReducer } from './userSession/reducers';
import { onboardingReducer } from './onBoarding/reducers';

export const history = createBrowserHistory();

const rootReducer = combineReducers({
    router: connectRouter(history),
    userSession: userSessionReducer,
    onBoarding: onboardingReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore() {
    const middlewares = [thunkMiddleware, routerMiddleware(history)];
    const middleWareEnhancer = applyMiddleware(...middlewares);

    const store = createStore(
        rootReducer,
        composeWithDevTools(middleWareEnhancer)
    );

    return store;
}
