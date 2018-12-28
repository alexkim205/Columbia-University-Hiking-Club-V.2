import React from 'react';
import { NavLink } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { media } from '../_helpers/breakpoint-util';

import { Box } from 'grommet';
import { Menu, Close } from 'grommet-icons';
import theme from '../_css/theme.js';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

const NavBarWrapper = styled(Box)`
  font-family: Montserrat;
  font-weight: bold;
  font-size: 1.1em;
  width: 100%;
  background-color: ${theme.global.colors.brand};
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
  // background-color: red;
  padding: 0 1.5em;
  
  a {
    display: block;
    text-decoration: none;
    color: white;
  }
  
  &.title {
    text-align: left;
    align-items: flex-start;
    // position: absolute;
    >.large-title {
      display: block;
      ${media.tablet`
        display: none;
      `}
    }
    
    >.small-title {
      display: none;
      ${media.tablet`
        display: block;
      `}
    }
  }

  &.item {
    ${media.tablet`
      display: none;
    `}
  }
`;

const IconItem = styled.div`
  text-align: left;
  justify-content: center;
  cursor: pointer;
`;

const NavBarIconItem = styled(IconItem)`
  display: none;
  margin: auto 1em;
  ${media.tablet`
    display: block;
  `}
`;

const SideBarIconItem = styled(IconItem)`
  margin: 0.15em 0 0.8em 0;
`;

const SideBar = styled(Box)`
  padding: 1.5em 1.5em;
  text-align: center;
  // align-items: center;
  display: flex;
  flex-direction: column;
  background-color: ${theme.global.colors.darkAccent};
  z-index: 1;
  position: fixed;
  left: 0;
  top: 0;
  width: 50vw;
  height: 100vh;
  transition: transform .3s cubic-bezier(0, .52, 0, 1);

  ${media.mablet`
    width: 65vw;
  `}
  
  ${media.lMobile`
    width: 100vw;
  `}
  
  // default
  &.hide {
    transform: translate3d(110vw, 0, 0);
  }
  &.show {
    transform: translate3d(50vw, 0, 0);
    ${media.mablet`
      transform: translate3d(35vw, 0, 0);
    `}
    ${media.lMobile`
      transform: translate3d(0vw, 0, 0);
    `}
  }
`;

const SideBarItem = styled.div`
  background-color: ${theme.global.colors.accent};
  padding: 0.7em 2em;
  margin: 0.35em 0;
  
  a {
    color: ${theme.global.colors.text.dark};
    text-decoration: none;
  }
`;

class NavBar extends React.Component {

  constructor (props) {
    super(props);

    this.state = {
      sideBarOpen: false,
    };

    this.handleNavBar = this.handleNavBar.bind(this);
  }

  handleNavBar (e) {
    this.setState({sideBarOpen: !this.state.sideBarOpen});
    console.log(this.state.sideBarOpen);

    e.stopPropagation();
  }

  render () {
    const {sideBarOpen} = this.state;

    return (
      <NavBarWrapper>
        {/* Horizontal Navbar Menu */}
        <NavBarItem className='title'>
          <NavLink to="/" className='large-title'>Columbia University Hiking Club</NavLink>
          <NavLink to="/" className='small-title'>CUHC</NavLink>
        </NavBarItem>
        <NavBarGrow/>
        <NavBarItem className='item'>
          <NavLink to="/login">Login</NavLink>
        </NavBarItem>
        <NavBarIconItem onClick={this.handleNavBar}>
          <Menu color='white' size='medium'/>
        </NavBarIconItem>
        <SideBar className={sideBarOpen ? 'show' : 'hide'}>
          <SideBarIconItem>
            <Close color='white' size='medium' onClick={this.handleNavBar}/>
          </SideBarIconItem>
          <SideBarItem><NavLink to="/login">Login</NavLink></SideBarItem>
          <SideBarItem><NavLink to="/login">Login</NavLink></SideBarItem>
          <SideBarItem><NavLink to="/login">Login</NavLink></SideBarItem>
        </SideBar>
      </NavBarWrapper>
    );
  }

}

export { NavBar };