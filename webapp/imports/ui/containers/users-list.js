import { composeWithTracker } from 'react-komposer';
import { UsersList } from '../components/users-list.js';
import { Loading } from '../components/loading.js';
import { Meteor } from 'meteor/meteor';

const composer = (params, onData) => {
  console.log(params);
  const subscription = Meteor.subscribe('userdata');
  if (subscription.ready()) {
    const users = Meteor.users.find().fetch();
    onData(null, { users });
  }
};

export default composeWithTracker(composer, Loading)(UsersList);
