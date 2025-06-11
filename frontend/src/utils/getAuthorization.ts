export const getAuthorization = () => {
    const login = JSON.parse(sessionStorage.getItem('login')! || '{}').login
    const password = JSON.parse(sessionStorage.getItem('login')! || '{}').password
    if (login && password) {
        return btoa(`${login}:${password}`)
    }
    else {
        return ''
    }
}