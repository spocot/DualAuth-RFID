import React from 'react';
import { Link } from 'react-router';
import { Row, Col, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import { handleUID } from '../../modules/login';

export class UID extends React.Component {
  componentDidMount() {
    handleUID({ component: this });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return <Row>
      <Col xs={ 12 } sm={ 6 } md={ 4 }>
        <h4 className="page-header">Verify</h4>
        <form ref="verify" className="verify" onSubmit={ this.handleSubmit }>
          <FormGroup>
            <ControlLabel>RFID/UID</ControlLabel>
            <FormControl
              type="password"
              ref="uid"
              name="uid"
              placeholder="Scan RFID/UID here..."
              autoComplete="off"
              autoFocus="autoFocus"
            />
          </FormGroup>
          <Button type="submit" bsStyle="success">Verify</Button>
        </form>
      </Col>
    </Row>;
  }
}
