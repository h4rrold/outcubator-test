import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import countryList from 'react-select-country-list';
import { FormControl, InputLabel } from '@material-ui/core';

const CountrySelector = (props) => {
  const { onUpdate, selected } = props;

  const [value, setValue] = useState(selected);
  const options = useMemo(() => countryList().getData(), []);

  const handleChange = (event) => {
    setValue(event.target.value);
    onUpdate(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel>Choose country</InputLabel>
      <Select value={value} onChange={handleChange}>
        {options.map((option) => {
          return (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

CountrySelector.propTypes = {
  onUpdate: PropTypes.func,
  selected: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};
CountrySelector.defaultProps = {
  onUpdate: () => ({}),
  selected: ''
};

export default CountrySelector;
