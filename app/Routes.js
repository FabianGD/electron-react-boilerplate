/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router';
import { Link } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DonutLarge from '@material-ui/icons/DonutLarge';
import {
  MuiThemeProvider,
  createMuiTheme,
  withStyles
} from '@material-ui/core/styles';
import Home from '@material-ui/icons/Home';

import routes from './constants/routes.json';
import App from './containers/App';
import HomePage from './containers/HomePage';
import zmqPage from './containers/zmqPage';

const myTheme = createMuiTheme({
  palette: {
    primary: {
      // light: '#757ce8',
      main: '#ff4400'
      // main: '#3f50b5',
      // dark: '#002884',
      // contrastText: '#fff',
    },
    secondary: {
      // light: '#ff7961',
      main: '#009900'
      // dark: '#ba000d',
      // contrastText: '#000',
    }
  },
  typography: {
    useNextVariants: true
  }
});

const styles = theme => ({
  root: {
    width: 'auto'
  },
  appBar: {
    position: 'static',
    ...theme.mixins.gutters()

    // paddingTop: theme.spacing.unit * 2,
    // paddingBottom: theme.spacing.unit * 2,
  },
  toolbarTitle: {
    flex: 1
    // paddingRight: theme.spacing.unit * 2,
    // paddingLeft: theme.spacing.unit * 2,
  },
  icon: {
    marginRight: theme.spacing.unit * 2
  },
  lastIconButton: {
    // marginRight: theme.spacing.unit * 1,
  },
  button: {
    marginTop: theme.spacing.unit
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  footer: {
    marginTop: theme.spacing.unit * 8,
    borderTop: `1px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit * 6}px 0`
  }
});

function Routes(props) {
  const { classes } = props;

  return (
    <MuiThemeProvider theme={myTheme}>
      <App className={classes.root}>
        <AppBar position="static" color="primary" className={classes.appBar}>
          <Toolbar>
            <Typography
              variant="h5"
              color="inherit"
              className={classes.toolbarTitle}
            >
              ZeroMQ communicator
            </Typography>
            <IconButton
              className={classes.lastIconButton}
              component={Link}
              to={routes.ZMQ}
              color="inherit"
            >
              <DonutLarge />
            </IconButton>
            <IconButton
              className={classes.iconButton}
              component={Link}
              to={routes.HOME}
              color="inherit"
            >
              <Home />
            </IconButton>
          </Toolbar>
        </AppBar>
        <main>
          <Switch>
            <Route path={routes.ZMQ} component={zmqPage} />
            <Route path={routes.HOME} component={HomePage} />
          </Switch>
        </main>
      </App>
    </MuiThemeProvider>
  );
}

Routes.propTypes = {
  classes: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired
};

export default withStyles(styles)(Routes);
