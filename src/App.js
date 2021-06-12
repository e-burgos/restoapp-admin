import React from 'react';
import { Routes, Route } from 'react-router';
import { FirebaseAppProvider } from 'reactfire';
import firebaseConfig from './firebase/config';

// States
import UiState from './context/ui/uiState';
import AuthState from './context/auth/authState';

// Pages
import Menu from './components/pages/Menu';
import NewProduct from './components/pages/NewProduct';
import Orders from './components/pages/Orders';
import UserProfile from './components/pages/UserProfile';
import ForgotPassword from './components/pages/auth/ForgotPassword';
import NewAccount from './components/pages/auth/NewAccount';
import Login from './components/pages/auth/Login';
//import PrivateRoute from './routes/privateRoute';

function App() {
  return (
    <FirebaseAppProvider
      firebaseConfig={firebaseConfig}
    >
      <AuthState>
        <UiState>
          <Routes>
            <Route path="/" element={<Orders/>} />
            <Route path="/menu" element={<Menu/>} />
            <Route path="/new-product" element={<NewProduct/>} />
            <Route path="/profile" element={<UserProfile/>} />
            <Route path="/forgot-password" element={<ForgotPassword/>} />
            <Route path="/new-account" element={<NewAccount/>} />
            <Route path="/login" element={<Login/>} />
          </Routes>
      </UiState>
    </AuthState>
    </FirebaseAppProvider>
  );
}

export default App;
