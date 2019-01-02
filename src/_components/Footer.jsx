import React     from 'react';
import styled    from 'styled-components';

import { Box }         from 'grommet';
import theme           from '../_css/theme.js';

const FooterWrapper = styled(Box)`
  background-color: ${theme.global.colors.brand}
`;

class Footer extends React.Component {

  render () {
    return (
      <FooterWrapper>
      </FooterWrapper>
    );
  }
}

export {Footer};