import axios from 'axios';
import getToken from '../getToken';

function adminAuth(to, from, next) {
  var req = getToken()

  if(localStorage.getItem('auth') != undefined) {
    axios.post('http://127.0.0.1:3333/validate',{}, req).then(() => {
      next();
    }).catch(error => {
      console.log(error);
      next('/login');
    })
  } else {
    console.log('Não autorizado');
    next('/login');
  }
}

export default adminAuth;