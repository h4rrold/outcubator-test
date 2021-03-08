import React from 'react';
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';

const CustomMaskedInput = (props) => {
  const { inputRef, mask, name, ...other } = props;

  return (
    <MaskedInput
      {...other}
      name={name}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={mask}
      showMask
    />
  );
};

CustomMaskedInput.propTypes = {
  inputRef: PropTypes.func,
  mask: PropTypes.array.isRequired,
  name: PropTypes.string
};

CustomMaskedInput.defaultProps = {
  inputRef: null,
  mask: [],
  name: ''
};

export default CustomMaskedInput;
