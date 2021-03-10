import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';
import 'core-js/es/map';
import 'core-js/es/set';
import 'core-js/es/object/assign';
import 'raf/polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './assets/scss/main.scss';

ReactDOM.render(<App />, document.getElementById('root'));
