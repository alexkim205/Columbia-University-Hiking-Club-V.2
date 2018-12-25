import React           from 'react';
import { MaskedInput } from 'grommet';

class PhoneMaskedInput extends React.Component {

  render () {
    const {name, value, onChange} = this.props;
    return (
      <MaskedInput
        mask={[
          {fixed: '('},
          {
            length: 3,
            regexp: /^[0-9]{1,3}$/,
            placeholder: 'xxx',
          },
          {fixed: ')'},
          {fixed: ' '},
          {
            length: 3,
            regexp: /^[0-9]{1,3}$/,
            placeholder: 'xxx',
          },
          {fixed: '-'},
          {
            length: 4,
            regexp: /^[0-9]{1,4}$/,
            placeholder: 'xxxx',
          },
        ]}
        name={name}
        value={value}
        onChange={this.props.onChange}
      />
    );
  }
}

export { PhoneMaskedInput };