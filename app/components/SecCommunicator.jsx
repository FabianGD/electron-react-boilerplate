import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

export default class RequesterUnit extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(msg) {
    const { requester, onRequest } = this.props;
    const messageJSON = {
      sendTime: new Date().toTimeString(),
      messageContent: { msg }
    };
    let messageString = JSON.stringify(messageJSON);

    if (msg === 'damagedMessage') {
      messageString = messageString.substring(2);
    }

    console.log('Sending: ', messageString);
    // Send the request via the requester object
    requester.send(messageString);
    // Save the request to the parents lastMessage state
    onRequest(messageString);
  }

  render() {
    const { serverCreated } = this.props;

    return (
      <div>
        <Button
          variant="text"
          color="secondary"
          width="300"
          onClick={() => this.onClick('damagedMessage')}
          disabled={!serverCreated}
        >
          Send damaged message
        </Button>
        <Button
          variant="text"
          color="secondary"
          width="300"
          onClick={() => this.onClick('validMessage')}
          disabled={!serverCreated}
        >
          Send valid message
        </Button>
        <Button
          variant="text"
          color="secondary"
          width="300"
          onClick={() => this.onClick({ randomArray: 34 })}
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
  requester: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
    .isRequired,
  onRequest: PropTypes.func.isRequired
};
