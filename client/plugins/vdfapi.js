import axios from 'axios'

const vdfapi = axios.create({
  baseURL: 'https://api.varfdeforma.ro',
  // baseURL: 'http://localhost:8080',
  withCredentials: false,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})

// var requestLink = process.env.API_BASE_URL + '/event'
// if (requestParams.length !== 0) {
//   requestLink = requestLink + '?'
//   requestParams.forEach(function (rp) {
//     requestLink = requestLink + '&' + rp
//   })
// }

export default vdfapi
