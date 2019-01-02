import styled from 'styled-components';
import { Box, Heading, TextInput } from 'grommet';
import { media } from '../_helpers/breakpoint-util';
import theme from '../_css/theme.js';

const FormBox = styled(Box)`
  margin: 2em auto;
  padding: 3em;
  width: 380px;
  align-items: center;
  background-color: white;
  
  // border
  border-radius: 0px 0px 5px 5px;
  -moz-border-radius: 0px 0px 5px 5px;
  -webkit-border-radius: 0px 0px 5px 5px;
  -webkit-box-shadow: 0px 4px 6px 0px rgba(0,0,0,0.2);
  -moz-box-shadow: 0px 4px 6px 0px rgba(0,0,0,0.2);
  box-shadow: 0px 4px 6px 0px rgba(0,0,0,0.2);
  
  input {
    -webkit-box-shadow: inset 0px 2px 4px 0px rgba(0,0,0,0.08);
    -moz-box-shadow: inset 0px 2px 4px 0px rgba(0,0,0,0.08);
    box-shadow: inset 0px 2px 4px 0px rgba(0,0,0,0.08);
  }
`;
const StyledMainIcon = styled.div`
  border-radius: 100%;
  background-color: ${theme.global.colors.accent};
  display: flex;
  align-items: center;
  width: 130px;
  height: 130px;
  transition: all .5s ease;
  svg {
    transition: all .5s ease;
    width: 50px;
    height: 50px;
    margin: 0 auto;
    display: block;
  }
  ${media.tablet`
    width: 100px;
    height: 100px;
    svg {
      width: 40px;
      height: 40px;
    }
  `}
`;
const StyledHeading = styled(Heading)`
  color: ${theme.global.colors.text.gray};
`;
const FormHeading = styled(Heading)`
  transition: all 0.5s ease;
`;
const StyledTextInput = styled(TextInput)`
  ${({hasError}) => hasError && `
    border: 2px solid red;
  `}   
`;
const StyledCheckBox = styled.div`
  
  div {
    max-width: 24px;
    margin: 0 1em;
  }
`;
const ButtonsBox = styled(Box)`
  padding: 3em 0 0 0;
  button {
    width: 100%;
    border-radius: 3px;
    -webkit-box-shadow: 0px 2px 1px 0px rgba(0,0,0,0.2);
    -moz-box-shadow: 0px 2px 1px 0px rgba(0,0,0,0.2);
    box-shadow: 0px 2px 1px 0px rgba(0,0,0,0.2);
  }
  a {
    width: 100%;
  }
  // justify-content: center;
  ${media.lMobile`
    flex-direction: column;
    button {
      margin: 0.5em 0;
    }
  `}
`;
const LoadingBox = styled.div`
  text-align: center;
`;

export {
  FormBox,
  StyledTextInput,
  ButtonsBox,
  LoadingBox,
  StyledMainIcon,
  StyledHeading,
  FormHeading,
  StyledCheckBox,
};