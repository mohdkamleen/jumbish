import axios from 'axios';

export default axios.create({
  // baseURL: 'https://jumbish.herokuapp.com/api', //for production mode
  baseURL: 'http://localhost:8000/api', //for production mode
  headers: {
    "Content-type": "application/json"
  }
});
