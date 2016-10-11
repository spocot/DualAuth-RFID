import React from 'react';
import { ListGroup, Alert, Table } from 'react-bootstrap';
import { User } from './user.js';

export const UsersList = ({ users }) => (
  users.length > 0 ? <Table striped bordered responsive>
    <thead>
      <tr>
        <th>Email Address</th>
        <th className="text-center">UID</th>
        <th className="text-center">Role</th>
      </tr>
    </thead>
    <tbody>
      {users.map((u) => (
        <User key={ u._id } user={ u } />
      ))}
    </tbody>
  </Table> : <Alert bsStyle="warning">No users yet.</Alert>
);

UsersList.propTypes = {
  users: React.PropTypes.array,
};
