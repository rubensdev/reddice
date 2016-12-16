import React from 'react';
import { render } from 'react-dom';
// A history knows how to listen to the browser's address bar for changes and parses
// the URL into a location object that the router can use to match routes and render
// the correct set of components.

// browserHistory is the recommended history for browser application with React Router.
// It uses the History API built into the browser to manipulate the URL.
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import routes from './routes';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

// Thunk middleware allows us to dispatch asynchronous actions

const store = createStore(
	(state = {}) => state,
	applyMiddleware(thunk)
);

render(
<Provider store={store}>
	<Router history={browserHistory} routes={routes} />
</Provider>, 
document.getElementById('app'));
