import {config} from '../app/config';

export const environment = {
  production: true,
  firebase: {
    apiKey: config.firebaseKey,
    authDomain: 'appfahrt-1537907755048.firebaseapp.com',
    databaseURL: 'https://appfahrt-1537907755048.firebaseio.com',
    projectId: 'appfahrt-1537907755048',
    storageBucket: '',
    messagingSenderId: '713166658062'
  }
};
