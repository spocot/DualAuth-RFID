import React from 'react';
import { ListGroup, Alert, Table } from 'react-bootstrap';
import { Invitation } from './invitation.js';

export const InvitationsList = ({ invitations }) => (
  invitations.length > 0 ? <Table striped bordered responsive>
    <thead>
      <tr>
        <th>Email Address</th>
        <th className="text-center">Role</th>
        <th className="text-center">Date Sent</th>
        <th className="text-center">Revoke Invite</th>
      </tr>
    </thead>
    <tbody>
      {invitations.map((i) => (
        <Invitation key={ i._id } invitation={ i } />
      ))}
    </tbody>
  </Table> : <Alert bsStyle="warning">No invitations yet.</Alert>
);

InvitationsList.propTypes = {
  invitations: React.PropTypes.array,
};
