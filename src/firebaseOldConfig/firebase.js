import app from 'firebase/app';
import firebaseConfig from './config';
import 'firebase/auth';

class Firebase {
    constructor(){
        app.initializeApp(firebaseConfig);
        this.auth = app.auth();
    };
};

const firebase = new Firebase();

export default firebase;