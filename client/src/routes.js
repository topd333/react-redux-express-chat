import React from 'react';
import { Route, IndexRoute } from 'react-router';

// Import miscellaneous routes and other requirements
import App from './components/app';

// Import static pages
import HomePage from './components/pages/home-page';

// Import authentication related pages
import Register from './components/auth/register';
import Login from './components/auth/login';
import Logout from './components/auth/logout';


// Import dashboard pages
import Dashboard from './components/dashboard/dashboard';
import Chat from './components/chat';
import ViewProfile from './components/dashboard/profile/view-profile';

// Import higher order components
import RequireAuth from './components/auth/require_auth';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="register" component={Register} />
    <Route path="login" component={Login} />
    <Route path="logout" component={Logout} />

    <Route path="profile" component={RequireAuth(ViewProfile)} />
    <Route path="chat" component={RequireAuth(Chat)} />

    <Route path="dashboard">
      <IndexRoute component={RequireAuth(Dashboard)} />
    </Route>
  </Route>
);
