export const getToken = () => localStorage.getItem('codeowners.accessToken');

export const setToken = token => localStorage.setItem('codeowners.accessToken', token);
