
export function getAuthToken(){
    const token = localStorage.getItem('ACCESS_TOKEN');
    console.log('auth'+token);
    if (!token || token === null) {
        return '';
      }

    return token;
}

export function tokenLoader(){
    return getAuthToken();
}