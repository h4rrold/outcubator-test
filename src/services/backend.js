import { httpClient } from './http';
import { generateSignature } from '../utils/common';

export const getUserCountryCode = () => {
  return httpClient.get('https://ipinfo.io', {}, { Authorization: 'Bearer 9236c16abaedb2' });
};

export const getPaymentSystems = (countryCode) => {
  const params = {
    sign_version: 2,
    key: 'c5fb24b34ae994141a0ecd83b09e7e68',
    country_code: countryCode
  };

  const signature = generateSignature(params, '25246a1d4b1e01eff875ef68ec7cdd68');
  if (!signature) {
    return;
  }

  return httpClient.get('https://api.paymentwall.com/api/payment-systems/', {
    ...params,
    sign: signature
  });
};
