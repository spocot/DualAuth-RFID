import React from 'react';
import { FormGroup, FormControl } from 'react-bootstrap';
import { Bert } from 'meteor/themeteorchef:bert';
import { insertInvitation } from '../../api/invitations/methods.js';

const handleInsertInvitation = (event) => {
  const target = event.target;
  const email = target.value.trim();
  const role = "student";

  if (email !== '' && event.keyCode === 13) {
    insertInvitation.call({
      email,
      role
    }, (error) => {
      if (error) {
        Bert.alert(error, 'danger');
      } else {
        target.value = '';
        Bert.alert('Invitation created!', 'success');
      }
    });
  }
};

export const AddInvitation = () => (
  <FormGroup>
    <FormControl
      type="text"
      onKeyUp={ handleInsertInvitation }
      placeholder="Email to send invitation to..."
    />
  </FormGroup>
);
