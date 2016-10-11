import { Invitations } from './invitations';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { rateLimit } from '../../modules/rate-limit.js';
import { Email } from 'meteor/email';

export const insertInvitation = new ValidatedMethod({
  name: 'invitations.insert',
  validate: new SimpleSchema({
    email: { type: String},
    role: { type: String},
  }).validator({clean: true}),
  run(invitation) {
    invitation.token = Random.hexString(16);
    invitation.date = (new Date()).toISOString();
    Meteor.call('sendEmail',invitation.email,"easyaccesshackumass@gmail.com","Invitation!",invitation.token);
    Invitations.insert(invitation);
  },
});

export const removeInvitation = new ValidatedMethod({
  name: 'invitations.remove',
  validate: new SimpleSchema({
    _id: { type: String },
  }).validator(),
  run({ _id }) {
    Invitations.remove(_id);
  },
});

rateLimit({
  methods: [
    insertInvitation,
    removeInvitation,
  ],
  limit: 5,
  timeRange: 1000,
});
