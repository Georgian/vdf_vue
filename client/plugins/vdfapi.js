import axios from 'axios'

const vdfapi = axios.create({
  // baseURL: 'https://api.varfdeforma.ro',
  baseURL: 'http://localhost:5000',
  withCredentials: false,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})

// vdfapi.onRequest(config => {
//   if ($store.state.authToken) {
//     config.headers.common['Authorization'] = store.state.authToken
//   }
// })

// var requestLink = process.env.API_BASE_URL + '/event'
// if (requestParams.length !== 0) {
//   requestLink = requestLink + '?'
//   requestParams.forEach(function (rp) {
//     requestLink = requestLink + '&' + rp
//   })
// }

export default vdfapi
