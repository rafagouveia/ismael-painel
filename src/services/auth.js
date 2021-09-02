export const TOKEN_KEY = "SESSION";

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;

export const getToken = () => JSON.parse(localStorage.getItem(TOKEN_KEY)).token !== null;

export const login = token => {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(TOKEN_KEY, token)
};

export const logout = () => { localStorage.removeItem(TOKEN_KEY)};