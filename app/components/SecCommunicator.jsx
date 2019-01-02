import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

function composeMessage(msg) {
  let formattedMessage;
  const messageJSON = {
    sendTime: new Date().toTimeString()
  };
  let messageString;

  if (typeof msg === 'string') {
    formattedMessage = { string: msg };
  } else {
    formattedMessage = msg;
  }

  messageJSON.messageContent = formattedMessage;

  messageString = JSON.stringify(messageJSON);

  if (msg === 'damagedMessage') {
    messageString = messageString.substring(2);
  }

  return messageString;
}

export default class RequesterUnit extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(msg) {
    const { requester, onRequest } = this.props;
    const messageString = composeMessage(msg);

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
        <Button
          variant="text"
          color="secondary"
          width="300"
          onClick={() => this.onClick({ randomArray: 34, string: 'Hi' })}
          disabled={!serverCreated}
        >
          Ask for random array with string
        </Button>
      </div>
    );
  }
}

RequesterUnit.propTypes = {
  serverCreated: PropTypes.bool.isRequired,
  requester: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onRequest: PropTypes.func.isRequired
};

RequesterUnit.defaultProps = {
  requester: null
};
