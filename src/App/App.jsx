import React                     from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { connect }               from 'react-redux';

import { history }      from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute, NavBar } from '../_components';
import { HomePage }     from '../HomePage';
import { LoginPage }    from '../LoginPage';
import { RegisterPage } from '../RegisterPage';
import { ProfilePage }  from '../ProfilePage';

// Styling
import { Grommet, Box, Grid } from 'grommet';
import styled                 from 'styled-components';
import { media }              from '../_helpers/breakpoint-util';
import '../_css/base.css';
import '../_css/font.css';

const theme = {
  global: {
    colors: {
      brand: '#228BE6',
      background: '#fffffe'
    },
    font: {
      family: 'Roboto',
      size: '14px',
      height: '20px',
    },
  },
};

const StyledGrommet = styled(Grommet)`
  height: 100vh;
`;

const Main = styled(Box)`
  padding: 1em 10em;
  background: ${theme.global.colors.background};
  
  ${media.laptop`padding: 1em 10em;`}
  ${media.tablet`padding: 1em 4em;`}
  ${media.mMobile`padding: 1em 2em;`}
`;
const Footer = styled(Box)`

`;

class App extends React.Component {
  constructor (props) {
    super(props);

    history.listen((location, action) => {
      // clear alert on location change
      this.props.dispatch(alertActions.clear());
    });
  }

  render () {
    const {alert} = this.props;

    return (
      <StyledGrommet theme={theme}>
        <Router history={history}>
          <div id="router-container">
            <Grid
              areas={[
                {name: 'nav', start: [0, 0], end: [0, 0]},
                {name: 'main', start: [0, 1], end: [0, 1]},
                {name: 'foot', start: [0, 2], end: [0, 2]},
              ]}
              columns={['flex']}
              alignContent='center'
              rows={['70px', 'flex', 'small']}
              fill={false}
              gap='none'
            >
              <NavBar gridArea='nav' background='brand'/>
              <Main gridArea='main'>
                {alert.message &&
                <div className={`alert ${alert.type}`}>{alert.message}</div>
                }
                <Switch>
                  <PrivateRoute exact path="/" component={HomePage}/>
                  <PrivateRoute exact path="/profile" component={ProfilePage}/>
                  <Route path="/login" component={LoginPage}/>
                  <Route path="/register" component={RegisterPage}/>
                </Switch>
              </Main>
              <Footer gridArea='foot' background='brand'/>
            </Grid>
          </div>
        </Router>
      </StyledGrommet>

    );
  }
}

function mapStateToProps (state) {
  const {alert} = state;
  return {
    alert,
  };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };