export default ({store, isClient, app: { $axios }}) => {
  $axios.onRequest(config => {
    let token = store.getters['modules/auth/getToken']
    config.headers.common['Authorization'] = `Bearer ${token}`
  })
}
