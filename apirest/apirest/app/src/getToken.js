function getToken() {
  var req = {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('auth')
    }
  }
  return req;
}
  
module.exports = getToken;
