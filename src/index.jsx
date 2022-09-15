import React from 'react'; 
import App from './App';
import 'antd/dist/antd.css'; 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import store from './redux/store';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root');

const root = createRoot(container);
root.render(
    <Provider store={store}>
        <App />
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            closeOnClick
        />
    </Provider>
    );