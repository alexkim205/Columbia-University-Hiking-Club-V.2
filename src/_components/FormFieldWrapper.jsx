import React       from 'react';
import { Heading, Box } from 'grommet';
import styled      from 'styled-components';

const StyledWrapper = styled.div`
  margin: 1em auto 1.5em auto;
  button {
    width: 100%;
  }
`;
const StyledFieldWrapper = styled.div`
  margin: 0.5em auto;
`;

const RedHeading = styled(Heading)`
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
          <Heading level={4} margin='xsmall' size='small'>{label}</Heading>
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