import React       from 'react';
import styled      from 'styled-components';

import MaskedInput from 'react-text-mask';
import emailMask from 'text-mask-addons/dist/emailMask';

const MaskedInputContainer = styled.div`
  position: relative;
  width: 100%;
`;

const StyledMaskedInput = styled(MaskedInput)`
  box-sizing: border-box;
  font-size: inherit;
  border: none;
  -webkit-appearance: none;
  padding: 11px;
  outline: none;
  background: transparent;
  color: inherit;
  font-weight: 600;
  margin: 0;
  border: 1px solid rgba(0,0,0,0.33);
  border-radius: 4px;
  width: 100%;
`;

class PhoneMaskedInput extends React.Component {

  render () {
    console.log(this.props.value);
    return (
      <MaskedInputContainer>
        <StyledMaskedInput
          mask={['+', /[1-9]/, ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
          placeholder="+1 (___) ___-____"
          guide={true}
          {...this.props}
        />
      </MaskedInputContainer>
    );
  }
}

class EmailMaskedInput extends React.Component {

  render () {
    console.log(this.props.value);
    return (
      <MaskedInputContainer>
        <StyledMaskedInput
          mask={emailMask}
          placeholder="johnsmith@columbia.edu"
          guide={false}
          {...this.props}
        />
      </MaskedInputContainer>
    );
  }
}

export { PhoneMaskedInput, EmailMaskedInput };