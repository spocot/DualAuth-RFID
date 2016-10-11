import React from 'react';
import { Jumbotron } from 'react-bootstrap';

export const Index = () => (
  <Jumbotron className="text-center">
    <h2>EasyAccess</h2>
    <p>Use your StudentID to log into various services!</p>
    <p style={ { fontSize: '16px', color: '#aaa' } }>Currently at v1.0.0</p>
  </Jumbotron>
);
