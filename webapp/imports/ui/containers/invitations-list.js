import { composeWithTracker } from 'react-komposer';
import { Invitations } from '../../api/invitations/invitations.js';
import { InvitationsList } from '../components/invitations-list.js';
import { Loading } from '../components/loading.js';
import { Meteor } from 'meteor/meteor';

const composer = (params, onData) => {
  const subscription = Meteor.subscribe('userdata');
  if (subscription.ready()) {
    const invitations = Invitations.find().fetch();
    onData(null, { invitations });
  }
};

export default composeWithTracker(composer, Loading)(InvitationsList);
