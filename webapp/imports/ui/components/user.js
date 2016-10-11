import React from 'react';
import { Table, Label, FormControl } from 'react-bootstrap';
import { Bert } from 'meteor/themeteorchef:bert';
import { updateUID } from '../../api/methods.js';

function isCurrentUser(c) {
  return c === Meteor.userId();
}

function roleCheck(r) {
  if(r === undefined || r === null || r.length === 0){
    return 'student';
  }else{
    return r[0];
  }
}

function hasUID(user) {
  return !(user.uid === undefined || user.uid === null || user.uid === -1);
}

const handleRoleUpdate = (userId, event) => {
  const role = event.target.value.trim();
  if (role !== '') {
    Meteor.call('setRoleOnUser', {
      user: userId,
      role: role,
    }, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Role updated!', 'success');
      }
    });
  }
};

const handleUIDUpdate = (userid, event) => {
  const uid = event.target.value.trim();
  if (uid !== '' && event.keyCode === 13) {
    updateUID.call({
      _id: userid,
      update: { uid },
    }, (error) => {
      if (error) {
        Bert.alert(error, 'danger');
      } else {
        Bert.alert('UID updated!', 'success');
      }
    });
  }
};

export const User = ({ user }) => (
  <tr>
    <td className="text-left text-middle">{isCurrentUser(user._id) ? <Label bsStyle="success">You!</Label> : ''} { user.emails[0].address }</td>
    <td>
      <FormControl
        type="text"
        onKeyUp={ handleUIDUpdate.bind(this, user._id) }
        placeholder="Enter a UID..."
        defaultValue={user.uid}
      />
    </td>
    <td>
      <FormControl disabled={isCurrentUser(user._id)} componentClass="select" value={roleCheck(user.roles)} onChange={ handleRoleUpdate.bind(this, user._id) }>
        <option value="admin">Admin</option>
        <option value="mod">Moderator</option>
        <option value="student">Student</option>
      </FormControl>
    </td>
  </tr>
);
