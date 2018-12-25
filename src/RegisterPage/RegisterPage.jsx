import React       from 'react';
import { Link }    from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

import {
  Box,
  Button,
  CheckBox,
  FormField,
  RadioButton,
  Select,
  TextArea,
  TextInput,
  Heading,
}                           from 'grommet';
import { PhoneMaskedInput } from '../_components/PhoneMaskedInput';
import styled               from 'styled-components';

const RegisterBox = styled(Box)`
  margin: 0 auto;
  width: 400px;
`;
const StyledFormField = styled(FormField)`

`;
const StyledTextInput = styled(TextInput)`
  ${({hasError}) => hasError && `
    border: 2px solid red;
  `}   
`;
const HelpBlock = styled.div`

`;

class RegisterPage extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      user: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        school: '',
        phoneNumber: '',
        interestInDriving: '',
        interestInHiking: '',
        medicalConditions: '',
      },
      submitted: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange (event) {
    const {name, value} = event.target;
    const {user} = this.state;
    this.setState({
      user: {
        ...user,
        [name]: value,
      },
    });
  }

  handleSubmit (event) {
    event.preventDefault();

    this.setState({submitted: true});
    const {user} = this.state;
    const {dispatch} = this.props;
    if (user.firstName && user.lastName && user.email && user.password) {
      dispatch(userActions.register(user));
    }
  }

  render () {
    const {registering} = this.props;
    const {user, submitted} = this.state;
    return (
      <RegisterBox>
        <Heading
          alignSelf="center"
          level={2}
        >Register</Heading>
        <Box>
          <form name="form" onSubmit={this.handleSubmit}>

            {/*<StyledFormField label='First Name' hasError={submitted && !user.firstName}>*/}
              <StyledTextInput name="firstName"
                               value={user.firstName}
                               onChange={this.handleChange}/>
              {submitted && !user.firstName &&
              <HelpBlock>First name is required</HelpBlock>
              }
            {/*</StyledFormField>*/}
            {/*<StyledFormField label='Last Name' hasError={submitted && !user.lastName}>*/}
              <StyledTextInput name="lastName"
                               value={user.lastName}
                               onChange={this.handleChange}/>
              {submitted && !user.lastName &&
              <HelpBlock>Last name is required</HelpBlock>
              }
            {/*</StyledFormField>*/}

            {/*<StyledFormField label='Phone Number' hasError={submitted && !user.phoneNumber}>*/}
              <PhoneMaskedInput name="phoneNumber"
                                value={user.phoneNumber}
                                onChange={this.handleChange}/>
              {submitted && !user.phoneNumber &&
              <HelpBlock>Phone number is required</HelpBlock>
              }
            {/*</StyledFormField>*/}
            {/*
             email
             password
             school
             phoneNumber
             interestInDriving
             interestInHiking
             medicalConditions
             */}
            <div className={'form-group' + (submitted && !user.email ? ' has-error' : '')}>
              <label htmlFor="email">email</label>
              <input type="text" className="form-control" name="email" value={user.email}
                     onChange={this.handleChange}/>
              {submitted && !user.email &&
              <div className="help-block">email is required</div>
              }
            </div>
            <div className={'form-group' + (submitted && !user.password ? ' has-error' : '')}>
              <label htmlFor="password">Password</label>
              <input type="password" className="form-control" name="password" value={user.password}
                     onChange={this.handleChange}/>
              {submitted && !user.password &&
              <div className="help-block">Password is required</div>
              }
            </div>

            <div className="form-group">
              <button className="btn btn-primary">Register</button>
              {registering &&
              <img
                alt=""
                src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="/>
              }
              <Link to="/login" className="btn btn-link">Cancel</Link>
            </div>
          </form>
        </Box>
      </RegisterBox>
    );
  }
}

function mapStateToProps (state) {
  const {registering} = state.registration;
  return {
    registering,
  };
}

const connectedRegisterPage = connect(mapStateToProps)(RegisterPage);
export { connectedRegisterPage as RegisterPage };