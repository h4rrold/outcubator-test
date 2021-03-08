import React from 'react';
import { Field, Formik, Form } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import { TextField } from 'formik-material-ui';
import {
  checkIfCardNumIsValid,
  checkIfDateIsPast,
  checkIfMonthIsCorrect
} from '../../services/validation';
import Alert from '@material-ui/lab/Alert';
import { Grid, Typography, MenuItem } from '@material-ui/core';
import CountrySelector from '../country-selector';
import { CardNumberInput, CardExpDateInput } from './fields';

const validationSchema = yup.object({
  cardholderName: yup
    .string()
    .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed for this field ')
    .required('Cardholder name is required'),
  cardNumber: yup
    .string()
    .transform((val, originalVal) => val.replace(/\s/g, ''))
    .required('Card number is required')
    .test('luhn-test', 'Invalid card number', function (value) {
      return checkIfCardNumIsValid(value);
    }),
  cardExpDate: yup
    .string()
    .test('month-test', 'Invalid month', function (value) {
      return checkIfMonthIsCorrect(value);
    })
    .test('past-date-test', "Exp.date can't be earlier than today", function (value) {
      return checkIfDateIsPast(value);
    })
    .required('Card exp. date is required'),
  cardCVV: yup.string().required('CVV code is required').min(3).max(3),
  amount: yup.string().required('Amount is required'),
  currency: yup.string().required('Currency is required')
});

const PaymentCardForm = (props) => {
  const { userCountry, setUserCountry, paymentSystems, currencies } = props;

  return (
    <Formik
      initialValues={{
        cardholderName: '',
        cardNumber: '',
        amount: '5',
        cardExpDate: '',
        cardCVV: '',
        currency: 'USD',
        paymentSystem: paymentSystems[0]?.id
      }}
      validateOnBlur
      validateOnChange
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
      }}
    >
      {({ values, handleChange, handleBlur, submitForm, isSubmitting, touched, errors }) => (
        <Form>
          <div className="form-content">
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <div className="widget-country-block">
                  {userCountry && (
                    <CountrySelector
                      selected={userCountry}
                      onUpdate={(country) => {
                        setUserCountry(country);
                      }}
                    />
                  )}
                </div>
              </Grid>
              <Grid item xs={12} sm={6}>
                <div className="widget-payment-systems-block">
                  <Field
                    fullWidth
                    label="Choose payment system"
                    component={TextField}
                    type="text"
                    name="paymentSystem"
                    select
                    InputLabelProps={{
                      shrink: true
                    }}
                  >
                    {paymentSystems.length > 0 ? (
                      paymentSystems.map((option) => {
                        return (
                          <MenuItem
                            key={option.id}
                            value={option.id}
                            className="select-system-menu-item"
                          >
                            <img src={option.img_url} alt={`${option.name}`} />
                            <Typography>{option.name}</Typography>
                          </MenuItem>
                        );
                      })
                    ) : (
                      <Typography>No options provided</Typography>
                    )}
                  </Field>
                </div>
              </Grid>
              <Grid item xs={12}>
                <div className="widget-amount-block">
                  <Typography>Enter amount:</Typography>
                  <div className="widget-amount-fields">
                    <Field
                      inputProps={{ className: 'text-center' }}
                      component={TextField}
                      type="number"
                      id="amount"
                      name="amount"
                      color="primary"
                    />
                    <Field
                      component={TextField}
                      type="text"
                      name="currency"
                      select
                      InputLabelProps={{
                        shrink: true
                      }}
                    >
                      {currencies.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Field>
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  fullWidth
                  component={TextField}
                  type="text"
                  id="cardholderName"
                  label="Cardholder name"
                  name="cardholderName"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  fullWidth
                  type="number"
                  id="cardNumber"
                  label="Card number"
                  name="cardNumber"
                  component={CardNumberInput}
                />
              </Grid>
              <Grid item xs={6}>
                <Field
                  fullWidth
                  type="number"
                  id="cardExpDate"
                  name="cardExpDate"
                  component={CardExpDateInput}
                />
              </Grid>
              <Grid item xs={6}>
                <Field
                  component={TextField}
                  type="password"
                  id="cardCVV"
                  label="CVV"
                  name="cardCVV"
                  onChange={(e) => {
                    let val = e.target.value;

                    if (val.length > 3) {
                      val = val.slice(0, 3);
                    }
                    e.target.value = val;
                    handleChange(e);
                  }}
                />
              </Grid>
            </Grid>

            {Object.keys(errors).length === 0 && Object.keys(touched).length > 0 && (
              <Alert variant="outlined" severity="success" className="alert-message">
                All fields were filled correctly!
              </Alert>
            )}
          </div>
          <Button
            disabled={Object.keys(errors).length > 0 || values.amount === '0'}
            color="primary"
            variant="contained"
            fullWidth
            type="submit"
          >
            {`Pay ${values.amount || 0} ${values.currency}`}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default PaymentCardForm;
