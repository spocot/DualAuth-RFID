import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Invitations = new Mongo.Collection('Invitations');

Invitations.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Invitations.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Invitations.schema = new SimpleSchema({
  email: {
    type: String,
    label: 'Email to send invitation to.',
  },
  token: {
    type: String,
    label: 'Invitation token.',
  },
  role: {
    type: String,
    label: 'Role to appy to the user.',
  },
  date: {
    type: Date,
    label: 'Invitation Date.',
  },
});

Invitations.attachSchema(Invitations.schema);
