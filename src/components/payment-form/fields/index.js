import React from 'react';
import { FormHelperText, Input, InputLabel } from '@material-ui/core';
import { cardNumberMask, expDateMask } from '../../../services/validation';
import CustomMaskedInput from '../../masked-input';
import { ErrorMessage } from 'formik';

export const CardNumberInput = ({ field, form: { touched, errors } }) => {
  return (
    <div>
      <InputLabel error={errors.cardNumber && touched.cardNumber} shrink htmlFor="cardNumberInput">
        Card number
      </InputLabel>
      <Input
        {...field}
        error={errors.cardNumber && touched.cardNumber}
        inputProps={{
          id: 'cardNumberInput',
          mask: cardNumberMask,
          name: field.name,
          placeholderChar: '\u2000'
        }}
        inputComponent={CustomMaskedInput}
      />
      {errors.cardNumber && touched.cardNumber && (
        <ErrorMessage
          name="cardNumber"
          render={(msg) => <FormHelperText error>{msg}</FormHelperText>}
        />
      )}
    </div>
  );
};

export const CardExpDateInput = ({ field, form: { touched, errors } }) => {
  return (
    <div>
      <InputLabel
        error={errors.cardExpDate && touched.cardExpDate}
        shrink
        htmlFor="cardExpDateInput"
      >
        Card exp. date
      </InputLabel>
      <Input
        {...field}
        error={errors.cardExpDate && touched.cardExpDate}
        inputProps={{
          id: 'cardExpDateInput',
          mask: expDateMask,
          name: field.name
        }}
        mask={expDateMask}
        inputComponent={CustomMaskedInput}
      />
      {errors.cardExpDate && touched.cardExpDate && (
        <ErrorMessage
          name="cardExpDate"
          render={(msg) => <FormHelperText error>{msg}</FormHelperText>}
        />
      )}
    </div>
  );
};
