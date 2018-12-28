import React from 'react';
import { Heading, Box } from 'grommet';
import styled from 'styled-components';
import theme from '../_css/theme.js';
import { StyledHeading } from '../_css/form.css';

const StyledWrapper = styled.div`
  margin: 1em auto 1.5em auto;
  button {
    width: 100%;
  }
`;
const StyledFieldWrapper = styled.div`
  margin: 0.5em auto;
`;

const RedHeading = styled(StyledHeading)`
  color: palevioletred;
`;

const HelpBlock = styled.div`
  margin: 0.2em 0;
  font-size: 0.8em;
  color: gray;
  text-align: right;
  min-height: 20px;
`;

class FormFieldWrapper extends React.Component {

  render () {
    const {label, refValue, submitted, helpText, notrequired} = this.props;

    return (
      <StyledWrapper>
        {submitted && !notrequired && !refValue ? (
          <RedHeading level={4} margin='xsmall' size='small'>{label} *</RedHeading>
        ) : (
          <StyledHeading level={4} margin='xsmall' size='small'>{label}</StyledHeading>
        )}
        <StyledFieldWrapper>
          {this.props.children}
        </StyledFieldWrapper>
        {helpText &&
        <HelpBlock>{helpText}</HelpBlock>
        }
      </StyledWrapper>
    );
  }

}

export { FormFieldWrapper };