import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import zmq from 'zeromq';

export default class RequesterUnit extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(msg) {
    const { requester, onRequest } = this.props;
    console.log('Sending: ', msg);
    // Send the request via the requester object
    requester.send(msg);
    // Save the request to the parents lastMessage state
    onRequest(msg);
  }

  render() {
    const { serverCreated } = this.props;

    return (
      <div>
        <Button
          variant="text"
          color="secondary"
          width="300"
          onClick={() => this.onClick('Hello')}
          disabled={!serverCreated}
        >
          Send information
        </Button>
        <Button
          variant="text"
          color="secondary"
          width="300"
          onClick={() => this.onClick('array')}
          disabled={!serverCreated}
        >
          Ask for random array
        </Button>
      </div>
    );
  }
}

RequesterUnit.propTypes = {
  serverCreated: PropTypes.bool.isRequired,
  requester: PropTypes.instanceOf(zmq.socket('req')).isRequired,
  onRequest: PropTypes.func.isRequired
};
