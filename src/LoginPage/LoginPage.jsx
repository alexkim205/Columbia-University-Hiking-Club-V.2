import React       from 'react';
import { Link }    from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

import {
  Box, Button, CheckBox, Select,
  TextArea, TextInput, Text, Heading,
}                                               from 'grommet';
import { Add, CoatCheck }                            from 'grommet-icons';
import { PhoneMaskedInput, EmailMaskedInput }   from '../_components/MaskedFields';
import { FormFieldWrapper }                     from '../_components/FormFieldWrapper';
import { FormBox, StyledTextInput, ButtonsBox } from '../_css/form.css';

class LoginPage extends React.Component {
  constructor (props) {
    super(props);

    // reset login status
    this.props.dispatch(userActions.logout());

    this.state = {
      user: {
        email: '',
        password: '',
      },
      submitted: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange (e) {
    const {name, value} = e.target;
    const {user} = this.state;
    this.setState({
      user: {
        ...user,
        [name]: value,
      },
    });
  }

  handleSubmit (e) {
    e.preventDefault();

    this.setState({submitted: true});
    const {email, password} = this.state.user;
    const {dispatch} = this.props;
    if (email && password) {
      dispatch(userActions.login(email, password));
    }
  }

  render () {
    const {loggingIn} = this.props;
    const {user, submitted} = this.state;
    return (
      <FormBox>
        <CoatCheck color='brand' size='xlarge'/>
        <Heading
          alignSelf="center"
          level={1}
        >Login</Heading>
        <Box>
          <form name="form" onSubmit={this.handleSubmit}>
            <FormFieldWrapper label='Email Address' refValue={user.email} submitted={submitted}>
              <EmailMaskedInput name="email" value={user.email}
                                onChange={this.handleChange}/>
            </FormFieldWrapper>
            <FormFieldWrapper label='Password' refValue={user.password} submitted={submitted}>
              <StyledTextInput name="password" value={user.password}
                               onChange={this.handleChange} type='password'/>
            </FormFieldWrapper>
            <ButtonsBox direction="row" align="center" gap="small" pad="large">
              {loggingIn &&
              <img
                alt=""
                src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="/>
              }
              <Button label="Login" type="submit" primary/>
              <Link to="/register">
                <Button icon={<Add/>} label="Register"/>
              </Link>
            </ButtonsBox>

          </form>
        </Box>
      </FormBox>
    );
  }
}

function mapStateToProps (state) {
  const {loggingIn} = state.authentication;
  return {
    loggingIn,
  };
}

const connectedLoginPage = connect(mapStateToProps)(LoginPage);
export { connectedLoginPage as LoginPage };