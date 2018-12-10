// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import zmq from 'zeromq';
import path from 'path';
import childProcess from 'child_process';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import PlotlyLinePlot from './PlotlyPlot';
import RequesterUnit from './SecCommunicator';

const styles = theme => ({
  root: {
    height: '600px',
    // display: "grid",
    marginTop: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3
  },
  grid: {
    padding: theme.spacing.unit * 8
  },
  paper: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  typography: {}
});

const pyVars = {
  pyPort: '4242',
  scriptPath: path.join(__dirname, './python/main.py')
};

function spawnServer(vars) {
  const pPort = vars.pyPort;
  const pPath = vars.scriptPath;
  const process = childProcess.spawn('python3', [pPath, pPort], {
    stdio: 'inherit'
  });
  // possible option for .spawn: , { stdio: 'inherit' }
  return process;
}

function getServerAdress(port) {
  console.log('Server Adress requested');
  return 'tcp://localhost:'.concat(port);
}

class MainUnit extends Component<props> {
  constructor(props) {
    super(props);
    this.state = {
      serverCreated: false,
      pyProc: null,
      requester: null,
      lastMessage: '',
      lastPlotlyData: { xdata: [0, 1, 2], ydata: [0, 1, 2] }
    };

    this.handleSpawn = this.handleSpawn.bind(this);
    this.handleKill = this.handleKill.bind(this);
    this.handleMessage = this.handleMessage.bind(this);
    this.onRequest = this.onRequest.bind(this);

    this.requesterCallbackEstablished = false;
  }

  componentDidMount() {}

  componentDidUpdate() {
    const { requester, lastMessage } = this.state;
    if (requester !== null && !this.requesterCallbackEstablished) {
      this.requesterCallbackEstablished = !this.requesterCallbackEstablished;

      requester.on('message', reply => {
        this.handleMessage(lastMessage, reply);
      });
    }
  }

  componentWillUnmount() {
    const { pyProc } = this.state;
    this.handleKill();

    if (pyProc != null) {
      pyProc.kill();
      this.setState({ pyProc: null });
    }
  }

  handleSpawn() {
    const { pyProc } = this.state;
    let proc;
    let newRequester;

    if (pyProc === null) {
      proc = spawnServer(pyVars);
      newRequester = zmq.socket('req');
      newRequester.connect(getServerAdress(pyVars.pyPort));
      console.log(newRequester);
      this.setState({
        pyProc: proc,
        serverCreated: true,
        requester: newRequester,
        lastMessage: '',
        lastPlotlyData: { xdata: [0, 1, 2], ydata: [0, 1, 2] }
      });
    } else {
      console.log('Server already created!');
    }
  }

  handleKill() {
    const { serverCreated, requester, pyProc } = this.state;
    if (serverCreated) {
      requester.send('kill');
      requester.close();

      if (pyProc != null) {
        pyProc.kill();
      }

      this.requesterCallbackEstablished = !this.requesterCallbackEstablished;

      this.setState({
        pyProc: null,
        requester: null,
        serverCreated: false
      });
      console.log('Server was successfully killed!');
    } else {
      console.log('Server already killed!');
    }
  }

  handleMessage(lastmsg, reply) {
    const replyString = reply.toString();
    console.log('Requester: Received', ': [', replyString, ']');
    try {
      const json = JSON.parse(replyString);
      if (json.data == null) {
        console.log(json.data);
        // alert('Message was not readable!')
      } else {
        this.setState({ lastPlotlyData: json.data });
      }
    } catch (err) {
      console.log(err);
    }
  }

  onRequest(message) {
    // console.log('Saving the last sent message!')
    this.setState({ lastMessage: message });
  }

  render() {
    const { classes } = this.props;
    const { serverCreated, requester, lastPlotlyData } = this.state;
    return (
      <div className={classes.root}>
        <Grid container spacing={8}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Grid container spacing={24}>
                <Grid item xs>
                  <Button
                    color="secondary"
                    align="left"
                    disabled={serverCreated}
                    variant="outlined"
                    onClick={() => this.handleSpawn()}
                  >
                    Spawn server!
                  </Button>
                </Grid>
                <Grid item xs>
                  <Typography
                    align="center"
                    variant="h5"
                    color={serverCreated ? 'secondary' : 'primary'}
                  >
                    Server is {serverCreated ? 'on' : 'off'}!
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Button
                    color="primary"
                    align="right"
                    disabled={!serverCreated}
                    variant="outlined"
                    onClick={() => this.handleKill()}
                  >
                    Kill server!
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <RequesterUnit
                requester={requester}
                onRequest={this.onRequest}
                serverCreated={serverCreated}
              />
            </Paper>
          </Grid>
          <Grid
            container
            item
            spacing={8}
            direction="row"
            justify="center"
            alignItems="stretch"
          >
            <Grid item xs={9}>
              <Paper className={classes.paper}>
                <PlotlyLinePlot data={lastPlotlyData} />
              </Paper>
            </Grid>
            <Grid item xs={3}>
              <Paper className={classes.paper}>
                <Typography align="center" variant="h5">
                  Console
                </Typography>
                <Typography align="center" variant="body1">
                  -- W.I.P --
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

// <PlotlyChild xdata={this.state.lastData} ydata={this.state.lastData}/>

MainUnit.propTypes = {
  serverCreated: PropTypes.bool,
  pyProc: PropTypes.oneOfType([PropTypes.instanceOf(childProcess)]),
  requester: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  lastMessage: PropTypes.string,
  lastData: PropTypes.shape({
    xdata: PropTypes.arrayOf(PropTypes.number).isRequired,
    ydata: PropTypes.arrayOf(PropTypes.number).isRequired
  }),
  classes: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired
};

MainUnit.defaultProps = {
  serverCreated: false,
  pyProc: null,
  requester: null,
  lastMessage: '',
  lastData: null
};
// -------------------------------------------------------------
// -------------------------------------------------------------
export default withStyles(styles)(MainUnit);
