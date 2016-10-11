import React from 'react';
import { Button, Table, Label, FormControl } from 'react-bootstrap';
import { Bert } from 'meteor/themeteorchef:bert';
import { removeInvitation } from '../../api/invitations/methods.js';

function isCurrentUser(c) {
  return c === Meteor.userId();
}

function roleCheck(r) {
  if(r === undefined || r === null || r.length === 0){
    return 'employee';
  }else{
    return r[0];
  }
}

const handleRevokeInvitation = (inviteId, event) => {
  event.preventDefault();
  // this should be replaced with a styled solution so for now we will
  // disable the eslint `no-alert`
  // eslint-disable-next-line no-alert
  if (confirm('Are you sure? This cannot be undone.')) {
    removeInvitation.call({
      _id: inviteId,
    }, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Invitation revoked!', 'success');
      }
    });
  }
};

export const Invitation = ({ invitation }) => (
  <tr>
    <td className="text-left text-middle">{invitation.email}</td>
    <td className="text-center text-middle">{invitation.role}</td>
    <td className="text-center text-middle">{invitation.date.toString()}</td>
    <td className="text-center">
      <Button
        bsStyle="danger"
        className="btn-block"
        onClick={ handleRevokeInvitation.bind(this, invitation._id) }>
        Revoke
      </Button>
    </td>
  </tr>
);
