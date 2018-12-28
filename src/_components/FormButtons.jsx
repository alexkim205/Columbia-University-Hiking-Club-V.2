import React from 'react';
import styled from 'styled-components';

import { Button } from 'grommet';
import theme from '../_css/theme.js';

const StyledPrimaryButton = styled(Button)`
  background-color: ${theme.global.colors.accent};
  color: ${theme.global.colors.text.dark};
`;
const StyledOutlineButton = styled(Button)`
  border-color: ${theme.global.colors.accent};
  color: ${theme.global.colors.text.light};
`;

export const PrimaryButton = (props) => (
  <StyledPrimaryButton {...props} color={theme.global.colors.accent}/>
);

export const OutlineButton = (props) => (
  <StyledOutlineButton {...props} color={theme.global.colors.accent}/>
);