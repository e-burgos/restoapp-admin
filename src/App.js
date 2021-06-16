import React from 'react';
import { Routes, Route } from 'react-router';
import { FirebaseAppProvider } from 'reactfire';
import firebaseConfig from './firebase/config';

// States
import UiState from './context/ui/uiState';
import AuthState from './context/auth/authState';
import CategoryState from './context/categories/categoryState';
import ProductState from './context/products/productState';

// Pages
import Home from './components/pages/Home';
import Menu from './components/pages/Menu';
import Products from './components/pages/products/Products';
import Orders from './components/pages/Orders';
import UserProfile from './components/pages/auth/UserProfile';
import EditProfile from './components/pages/auth/EditProfile';
import ForgotPassword from './components/pages/auth/ForgotPassword';
import NewAccount from './components/pages/auth/NewAccount';
import Login from './components/pages/auth/Login';
import Categories from './components/pages/products/Categories';
//import PrivateRoute from './routes/privateRoute';

function App() {
  return (
    <FirebaseAppProvider
      firebaseConfig={firebaseConfig}
    >
      <AuthState>
        <UiState>
          <CategoryState>
            <ProductState>
              <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/orders" element={<Orders/>} />
                <Route path="/menu" element={<Menu/>} />
                <Route path="/products" element={<Products/>} />
                <Route path="/categories" element={<Categories/>} />
                <Route path="/profile" element={<UserProfile/>} />
                <Route path="/edit-profile" element={<EditProfile/>} />
                <Route path="/forgot-password" element={<ForgotPassword/>} />
                <Route path="/new-account" element={<NewAccount/>} />
                <Route path="/login" element={<Login/>} />
              </Routes>
          </ProductState>
         </CategoryState>
        </UiState>
      </AuthState>
    </FirebaseAppProvider>
  );
}

export default App;
