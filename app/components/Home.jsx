// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  typography: {
    justify: 'center',
    paddingTop: theme.spacing.unit * 4,
    paddingBottom: theme.spacing.unit * 2
  },
  titleTypo: {
    justify: 'center',
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  },

  secondaryHeading: {
    paddingBottom: theme.spacing.unit
  },
  paper: {
    paddingTop: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2
    //  textAlign: 'center',
  },
  topGrid: {
    paddingTop: theme.spacing.unit
  },
  secondaryPaper: {
    paddingTop: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
    height: 'flex'
  }
});

class Home extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Grid
          container
          justify="center"
          spacing={8}
          className={classes.topGrid}
          alignItems="stretch"
        >
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Typography
                variant="h1"
                align="center"
                color="inherit"
                className={classes.titleTypo}
              >
                {' '}
                Welcome{' '}
              </Typography>
              <br />
              <Typography variant="h4" align="center">
                to this experimental app!
              </Typography>
              <br />
              <Typography variant="h6" align="center">
                Try it now by clicking the donut in the top right corner!
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.secondaryPaper}>
              <Typography
                variant="h6"
                align="center"
                className={classes.secondaryHeading}
              >
                The idea
              </Typography>
              <Typography variant="body1" align="justify">
                Make a versatile, easy to use/develop UI frontend
                (Electron/React/Material-UI) communicate with a Python backend.
                The backend does all the sophisticated maths, importing,
                exporting etc. for you and send the results back to the frontend
                for visual inspection.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.secondaryPaper}>
              <Typography
                variant="h6"
                align="center"
                className={classes.secondaryHeading}
              >
                The implementation
              </Typography>
              <Typography variant="body1" align="justify">
                The frontend consists of a React.js app running in an Electron
                environment to allow running in an desktop environment. The
                basic implementation for the electron/react app is forked from{' '}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://github.com/electron-react-boilerplate/electron-react-boilerplate"
                >
                  electron-react-boilerplate @ Github
                </a>
                . The communication between the Python backend is achieved via
                the ingenious{' '}
                <a
                  href="http://zeromq.org"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {' '}
                  ØMQ (or ZeroMQ){' '}
                </a>{' '}
                messaging layer. The JavaScript app spawns a Python server and
                acts as the corresponding client (in a REQ-REP fashion).
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired
};

export default withStyles(styles)(Home);
