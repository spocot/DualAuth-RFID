import $ from 'jquery';
import 'jquery-validation';
import { browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import { getInputValue } from './get-input-value';

let component;

const login = () => {
  const email = getInputValue(component.refs.emailAddress);
  const password = getInputValue(component.refs.password);

  Meteor.loginWithPassword(email, password, (error) => {
    if (error) {
      Bert.alert(error.reason, 'warning');
    } else {
      Bert.alert('Logged in!', 'success');

      const { location } = component.props;
      if (location.state && location.state.nextPathname) {
        browserHistory.push(location.state.nextPathname);
      } else {
        browserHistory.push('/');
      }
    }
  });
};

const verify = () => {
  const uid = getInputValue(component.refs.uid);
  component.refs.uid.value = "";
  const exists = Meteor.users.find({_id:Meteor.userId(),uid}).fetch();
  let error = undefined;
  if(exists.length > 0){
    error = Meteor.call('setRoleOnUser', {user: Meteor.userId(), role: 'uid-verified'});
  }else{
    error = {reason: "Invalid RFID/UID"};
  }
  if (error) {
    Bert.alert(error.reason, 'warning');
  } else {

    Bert.alert('Verified!', 'success');
    component.props.history.push('/');
    browserHistory.push('/');
  }
};

const validate = () => {
  $(component.refs.login).validate({
    rules: {
      emailAddress: {
        required: true,
        email: true,
      },
      password: {
        required: true,
      }
    },
    messages: {
      emailAddress: {
        required: 'Need an email address here.',
        email: 'Is this email address legit?',
      },
      password: {
        required: 'Need a password here.',
      }
    },
    submitHandler() { login(); },
  });
};

const validateUID = () => {
  $(component.refs.verify).validate({
    rules: {
      uid: {
        required: true
      }
    },
    messages: {
      uid: {
        required: 'Needs an rfid/uid value.'
      }
    },
    submitHandler() { verify(); },
  });
};

export const handleLogin = (options) => {
  component = options.component;
  validate();
};

export const handleUID = (options) => {
  component = options.component;
  validateUID();
};
