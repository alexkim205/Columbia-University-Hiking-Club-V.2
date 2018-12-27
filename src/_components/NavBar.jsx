import React       from 'react';
import { NavLink } from 'react-router-dom';
import styled      from 'styled-components';
import { media }   from '../_helpers/breakpoint-util';

import { Box }         from 'grommet';
import { Login, Menu } from 'grommet-icons';

const NavBarWrapper = styled(Box)`
  font-family: Montserrat;
  font-weight: bold;
  font-size: 1.1em;
  width: 100%;
  background-color: #262626;
  display: flex;
  flex-direction: row;
  padding: 0;
  
  ${media.tablet`
    flex-wrap: wrap;
  `}
`;

const NavBarGrow = styled(Box)`
  flex: 1;
`;

const NavBarItem = styled(Box)`
  // width: 100px;
  text-align: center;
  align-items: center;
  justify-content: center;
  background-color: red;
  padding: 0 1em;
  
  a {
    display: block;
    text-decoration: none;
    color: white;
  }
  
  &.title {
    // width: 330px;
    text-align: left;
    align-items: flex-start;
    // padding: 0 2em;
  }
  &.item {
  
  }
  
  ${media.tablet`
    display: none;
  `}
  ${media.mMobile`
    flex-basis: 100%;
  `}
`;

const IconItem = styled(Box)`
  text-align: center;
  align-items: center;
  justify-content: center;
  // background-color: red;
  margin: auto 1em;
  display: none;
  
  ${media.tablet`
    display: block;
  `}
`;

class NavBar extends React.Component {

  constructor (props) {
    super(props);

    this.state = {
      navBarCollapsed: false,
    };

    this.handleNavBar = this.handleNavBar.bind(this);
  }

  handleNavBar () {
    this.setState({navBarCollapsed: !this.state.navBarCollapsed})
  }

  render () {
    const {navBarCollapsed} = this.state;

    return (
      <NavBarWrapper>
        <NavBarItem className='title'>
          <NavLink to="/" activeClassName="selected">
            Columbia University Hiking Club
          </NavLink>
        </NavBarItem>
        <NavBarGrow>
        </NavBarGrow>
        <IconItem onClick={this.handleNavBar}>
          <Menu color='white' size='medium'/>
        </IconItem>
        <NavBarItem>
          <NavLink to="/login" activeClassName="selected">
            Login
          </NavLink>
        </NavBarItem>

      </NavBarWrapper>
    );
  }

}

export { NavBar };