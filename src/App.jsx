import * as React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import Layout from './pages';
import './assets/css/App.css'; 
import Home from './pages/home'; 
import Cart from './pages/cart';  
import Order from './pages/order';  

const App = () => {
  return (
    <BrowserRouter>
      <Routes> 


        {/* this is global routes  */}
        <Route path="/" element={<Layout />} >
 
          <Route path='/' element={<Home />} />
 
          <Route path='/cart' element={<Cart />} />
 
          <Route path='/order' element={<Order />} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}


export default App;
