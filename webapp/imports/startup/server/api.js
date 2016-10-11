import '../../api/documents/methods.js';
import '../../api/documents/server/publications.js';
import '../../api/invitations/methods.js';
import '../../api/methods.js';
import { Invitations } from '../../api/invitations/invitations.js';
import { check } from 'meteor/check';

import { Meteor } from 'meteor/meteor';

Meteor.publish( 'userdata', function() {
  let isAdmin = Roles.userIsInRole( this.userId, 'admin');
  if(isAdmin){
    return [
      Meteor.users.find({},{fields:{"emails.address": 1, "roles": 1, 'uid': 1}}),
      Invitations.find({},{fields:{"email":1,"role":1,"date":1,"token":1}})
    ];
  }else{
    return [
      Meteor.users.find({_id:this.userId},{fields:{'emails.address':1,'roles':1,'uid':1}})
    ];
  }
});

Meteor.methods({
  'setRoleOnUser' (options) {
    check(options, {
      user: String,
      role: String
    });
    try {
      Roles.setUserRoles( options.user, [ options.role, 'admin' ] );
    } catch( exception ) {
      return exception;
    }
  },
  'unverify' (userid) {
    check(userid, String);
    try{
      Roles.removeUsersFromRoles(userid,'uid-verified');
    }catch(exception){
      return exception;
    }
  },
  'sendEmail' (to, from, subject, text) {
    check([to, from, subject, text], [String]);
    this.unblock();
    Email.send({
      to: to,
      from: from,
      subject: subject,
      text: text
    });
  }
});
