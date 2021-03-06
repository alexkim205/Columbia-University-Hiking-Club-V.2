import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import theme from '../_css/theme.js';

import { userActions } from '../_actions';

import { Box, CheckBox, Select, TextArea } from 'grommet';
import { UserNew } from 'grommet-icons';
import {
  PhoneMaskedInput,
  EmailMaskedInput,
  FormFieldWrapper,
  PrimaryButton,
} from '../_components';
import {
  FormBox,
  StyledTextInput,
  ButtonsBox,
  LoadingBox,
  StyledMainIcon,
  StyledHeading,
  FormHeading,
  StyledCheckBox,
} from '../_css/form.css';

const RegisterBox = styled(FormBox)`
  border-top: 6px solid ${theme.global.colors.accent};
`;

// school options
const schoolOptions = [
  'Columbia College', 'SEAS Undergraduate',
  'Barnard College', 'General Studies',
  'SEAS Graduate', 'Graduate School of Arts and Sciences',
];

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
        interestInDriving: false,
        interestInHiking: false,
        medicalConditions: '',
      },
      submitted: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleCheckBoxChange = this.handleCheckBoxChange.bind(this);
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
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

  handleCheckBoxChange (event) {
    const {name, checked} = event.target;
    const {user} = this.state;
    this.setState({
      user: {
        ...user,
        [name]: checked,
      },
    });
  }

  handleDropdownChange (event) {
    const {option} = event;
    const {name} = event.target;
    const {user} = this.state;
    this.setState({
      user: {
        ...user,
        [name]: option,
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
        <StyledMainIcon>
          <UserNew color='white' size='large'/>
        </StyledMainIcon>
        <FormHeading
          alignSelf="center"
          level={2}
        >Register</FormHeading>
        <Box>
          <form name="form" onSubmit={this.handleSubmit}>

            <FormFieldWrapper label='First Name' refValue={user.firstName} submitted={submitted}>
              <StyledTextInput name="firstName" value={user.firstName}
                               onChange={this.handleChange}/>
            </FormFieldWrapper>
            <FormFieldWrapper label='Last Name' refValue={user.lastName} submitted={submitted}>
              <StyledTextInput name="lastName" value={user.lastName}
                               onChange={this.handleChange}/>
            </FormFieldWrapper>
            <FormFieldWrapper label='Email Address' refValue={user.email} submitted={submitted}>
              <EmailMaskedInput name="email" value={user.email}
                                onChange={this.handleChange}/>
            </FormFieldWrapper>
            <FormFieldWrapper label='Password' refValue={user.password} submitted={submitted}>
              <StyledTextInput name="password" value={user.password}
                               onChange={this.handleChange} type='password'/>
            </FormFieldWrapper>
            <FormFieldWrapper label='School' refValue={user.school} submitted={submitted}>
              <Select
                dropHeight='small'
                name='school'
                value={user.school}
                options={schoolOptions}
                onChange={this.handleDropdownChange}
              />
            </FormFieldWrapper>
            <FormFieldWrapper label='Phone Number' refValue={user.phoneNumber}
                              submitted={submitted}>
              <PhoneMaskedInput name="phoneNumber" value={user.phoneNumber}
                                onChange={this.handleChange}/>
            </FormFieldWrapper>
            <FormFieldWrapper label='Medical Conditions' refValue={user.phoneNumber}
                              submitted={submitted}
                              helpText='i.e., allergies, asthma, etc.' notrequired>
              <TextArea name='medicalConditions' value={user.medicalConditions}
                        onChange={this.handleChange}/>
            </FormFieldWrapper>
            <StyledCheckBox>
              <CheckBox
                name='interestInHiking'
                label={
                  <StyledHeading level={4} margin='xsmall' size='small'>
                    I am interested in leading a hike for CUHC.
                  </StyledHeading>
                }
                checked={user.interestInHiking}
                onChange={this.handleCheckBoxChange}
              />
            </StyledCheckBox>
            <StyledCheckBox>
              <CheckBox
                name='interestInDriving'
                label={
                  <StyledHeading level={4} margin='xsmall' size='small'>
                    I am interested in driving to hikes for CUHC.
                  </StyledHeading>
                }
                checked={user.interestInDriving}
                onChange={this.handleCheckBoxChange}
              />
            </StyledCheckBox>

            <ButtonsBox direction="row" align="center" gap="small">
              <PrimaryButton label="Submit" type="submit"/>
              {/*<Link to="/login">*/}
                {/*<OutlineButton icon={<Close/>} label="Cancel"/>*/}
              {/*</Link>*/}
            </ButtonsBox>
            <LoadingBox>
              {registering &&
              <img
                alt=""
                src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="/>
              }
            </LoadingBox>

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