import React from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router';
//import { AddInvitation } from '../components/add-invitation.js';
import UsersList from '../containers/users-list.js';
import InvitationsList from '../containers/invitations-list.js';
import { AddInvitation } from '../components/add-invitation.js';

export const ManageUsers = () => (
  <Row>
    <Col xs={ 12 }>
      <h4 className="page-header">Users</h4>
      <UsersList />
      <div className="page-header clearfix">
        <h4 className="pull-left">Invitations</h4>
      </div>
      <AddInvitation />
      <InvitationsList />
    </Col>
  </Row>
);
