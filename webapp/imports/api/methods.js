export const updateUID = new ValidatedMethod({
  name: 'uid.update',
  validate: new SimpleSchema({
    _id: { type: String },
    'update.uid': { type: String },
  }).validator(),
  run({ _id, update }) {
    Meteor.users.update(_id, { $set: update });
  },
});
