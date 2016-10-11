import React from 'react';
import { Link } from 'react-router';
import { Row, Col, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import { handleLogin } from '../../modules/login';

export class Login extends React.Component {
  componentDidMount() {
    handleLogin({ component: this });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return <Row>
      <Col xs={ 12 } sm={ 6 } md={ 4 }>
        <h4 className="page-header">Login</h4>
        <form ref="login" className="login" onSubmit={ this.handleSubmit }>
          <FormGroup>
            <ControlLabel>Email Address</ControlLabel>
            <FormControl
              type="email"
              ref="emailAddress"
              name="emailAddress"
              placeholder="Email Address"
              eventKey={ 1 }
            />
          </FormGroup>
          <FormGroup>
            <ControlLabel>
              <span className="pull-left">Password</span>
            </ControlLabel>
            <FormControl
              type="password"
              ref="password"
              name="password"
              placeholder="Password"
              eventKey={ 2 }
            />
            <ControlLabel>
              <Link eventKey={ 4 } className="pull-right" to="/recover-password">Forgot Password?</Link>
            </ControlLabel>
          </FormGroup>
          <Button eventKey={ 3 } type="submit" bsStyle="success">Login</Button>
        </form>
      </Col>
    </Row>;
  }
}
