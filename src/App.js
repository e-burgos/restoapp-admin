import React from 'react';
import { Routes, Route } from 'react-router';
import firebase, {FirebaseContext} from './firebase/index';

// States
import UiState from '../src/context/ui/uiState';

// Pages
import Menu from './components/pages/Menu';
import NewProduct from './components/pages/NewProduct';
import Orders from './components/pages/Orders';

// Components
import Header from './components/ui/header/Header';
import Sidebar from './components/ui/sidebar/Sidebar';


function App() {
  console.log(firebase)
  return (
    <FirebaseContext.Provider
      value={{
        firebase
      }}
    >
      <UiState>
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
        <Sidebar/>
        <div className="flex flex-col flex-1">
          <Header/>  
          <main className="h-full pb-16 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Orders/>} />
              <Route path="/menu" element={<Menu/>} />
              <Route path="/new-product" element={<NewProduct/>} />
            </Routes>
          </main>  
        </div>
      </div>
    </UiState>
    </FirebaseContext.Provider>
  );
}

export default App;
