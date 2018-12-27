import styled             from 'styled-components';
import { Box, TextInput } from 'grommet';
import { media }          from '../_helpers/breakpoint-util';

const FormBox = styled(Box)`
  margin: 2em auto;
  padding: 2em;
  width: 380px;
  align-items: center;
  border: 2px solid gray;
  border-radius: 5px;
`;
const StyledTextInput = styled(TextInput)`
  ${({hasError}) => hasError && `
    border: 2px solid red;
  `}   
`;
const ButtonsBox = styled(Box)`
  justify-content: center;
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
  LoadingBox
};