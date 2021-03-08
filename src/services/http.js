import { fetch as fetchPolyfill } from 'whatwg-fetch';
import { setGetParams } from '../utils/api';
import { mergeDeep } from '../utils/common';

class Http {
  static #instance = null;

  defaultOptions = {
    headers: {
      Accept: 'application/json'
    }
  };

  static getInstance() {
    if (!Http.#instance) {
      Http.#instance = new Http();
      Http.#instance.constructor = null;
    }

    return Http.#instance;
  }

  request({ url, options }) {
    return new Promise((resolve, reject) => {
      if (!url) {
        return this.handleError(reject, 'Error! No url was provided.');
      }

      const defaultOpt = { ...this.defaultOptions };
      const mergedOptions = mergeDeep(defaultOpt, options);
      let fetchFunc;

      if (this.isFetchApiAvailable()) {
        fetchFunc = fetch;
      } else {
        fetchFunc = fetchPolyfill;
      }

      fetchFunc(url, mergedOptions)
        .then((response) => this.handleRequestSuccess(response, response.status))
        .then((response) => response.json())
        .then((response) => this.handleSuccess(resolve, response, response.status))
        .catch((error) => this.handleError(reject, error));
    });
  }

  handleRequestSuccess(response, status) {
    if (this.isStatusSuccess(status)) {
      return response;
    }

    throw response;
  }

  handleSuccess(resolve, data, status = 200) {
    return resolve({ data, status });
  }

  handleError(reject, error = {}, _status = 500) {
    const { type = 'error', message = 'Internal Server Error', status = _status, data = null } =
      error.response || error;

    let { reason = 'Request failed', name = 'Request failed' } = error.response || error;

    let errorToSend = { ...data, status };

    if (name === 'SyntaxError') {
      reason = 'The response returned from the endpoint was probably not valid JSON';
      errorToSend = { name, reason };
    }

    if (name === 'FetchError' || error.type === 'system') {
      if (type === 'request-timeout') {
        reason = 'Timed out in the call.';
        name = 'Timeout';
      } else {
        reason =
          'Failed to connect to the endpoint. This is likely connectivity issues with the endpoint';
      }

      errorToSend = {
        name,
        reason,
        type,
        message
      };
    }
    reject({ status, error: errorToSend });
  }

  isStatusSuccess = (status) => status >= 200 && status < 300;

  isFetchApiAvailable() {
    return 'fetch' in window;
  }

  get(url, params, headers = {}) {
    const urlWithParams = setGetParams(url, params);
    return this.request({
      url: urlWithParams,
      options: {
        method: 'GET',
        headers: headers
      }
    });
  }
}

export const httpClient = Http.getInstance();
