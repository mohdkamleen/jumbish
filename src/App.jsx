import * as React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import Layout from './pages';
import './assets/css/App.css'; 
import Home from './pages/home'; 
import Cart from './pages/cart';  

const App = () => {
  return (
    <BrowserRouter>
      <Routes> 


        {/* this is global routes  */}
        <Route path="/" element={<Layout />} >

          {/* this is for cake section layout  */}
          <Route path='/' element={<Home />} />

          {/* this is for password section layout  */}
          <Route path='/cart' element={<Cart />} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}


export default App;
