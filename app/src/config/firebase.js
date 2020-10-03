import * as firebase from 'firebase/app';
import 'firebase/auth';
import keys from './secret';

const app = firebase.initializeApp(keys.config);

export default app;
