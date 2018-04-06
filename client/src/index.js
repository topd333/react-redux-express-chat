import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { Router, browserHistory } from 'react-router';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import cookie from 'react-cookie';
import ReactGA from 'react-ga';

import routes from './routes';
import reducers from './reducers';
import sagas from './sagas';
import { AUTH_USER } from './actions/types';

// Import stylesheets
import './public/stylesheets/base.scss';

// Initialize Google Analytics
ReactGA.initialize('UA-000000-01');

function logPageView() {
  ReactGA.pageview(window.location.pathname);
}

const sagaMiddleware = createSagaMiddleware();
const enhancer = compose(
  applyMiddleware(thunk),
  applyMiddleware(sagaMiddleware),
);

const store = createStore(reducers, enhancer);
sagas.forEach((saga) => sagaMiddleware.run(saga));

const token = cookie.load('token');

if (token) {
  // Update application state. User has token and is probably authenticated
  store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} onUpdate={logPageView} />
  </Provider>,
  document.querySelector('.wrapper'));
