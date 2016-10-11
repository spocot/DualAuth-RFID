import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { App } from '../../ui/layouts/app';
import { Documents } from '../../ui/pages/documents';
import { Index } from '../../ui/pages/index';
import { Login } from '../../ui/pages/login';
import { UID } from '../../ui/pages/uid';
import { NotFound } from '../../ui/pages/not-found';
import { RecoverPassword } from '../../ui/pages/recover-password';
import { ResetPassword } from '../../ui/pages/reset-password';
import { Signup } from '../../ui/pages/signup';
import { ManageUsers } from '../../ui/pages/manage-users';

function isAdmin() {
  return Meteor.userId() && Roles.userIsInRole(Meteor.userId(), ['admin']) && Roles.userIsInRole(Meteor.userId(), ['uid-verified']);
}

const requireAuth = (nextState, replace) => {
  if (!Meteor.loggingIn() && !Meteor.userId()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname },
    });
  }else if(!Roles.userIsInRole(Meteor.userId(), ['uid-verified'])){
    replace({
      pathname: '/uid',
      state: { nextPathname: nextState.location.pathname },
    });
  }
};

const requireLoggedIn = (nextState, replace) => {
  if (!Meteor.loggingIn() && !Meteor.userId()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname },
    });
  }
};

const requireRoleAdmin = (nextState, replace) => {
  if (!isAdmin()) {
    replace({
      pathname: '/',
      state: { nextPathname: nextState.location.pathname },
    });
  }
};

Meteor.startup(() => {
  render(
    <Router history={ browserHistory }>
      <Route path="/" component={ App }>
        <IndexRoute name="index" component={ Index } onEnter={ requireAuth } />
        <Route name="documents" path="/documents" component={ Documents } onEnter={ requireAuth } />
        <Route name="manage-users" path="/manage" component={ ManageUsers } onEnter={ requireRoleAdmin } />
        <Route name="login" path="/login" component={ Login } />
        <Route name="uid" path="/uid" component={ UID } onEnter={requireLoggedIn} />
        <Route name="recover-password" path="/recover-password" component={ RecoverPassword } />
        <Route name="reset-password" path="/reset-password/:token" component={ ResetPassword } />
        <Route name="invite" path="invite/:token" component={ NotFound } />
        <Route name="signup" path="/signup" component={ Signup } />
        <Route path="*" component={ NotFound } />
      </Route>
    </Router>,
    document.getElementById('react-root')
  );
});
