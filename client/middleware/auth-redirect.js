export default function ({store, redirect, route}) {
  if (store.getters['modules/auth/isAuthenticated'])
    return redirect('/')
}
