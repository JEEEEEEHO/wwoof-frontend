
export function getAuthToken(){
    const token = localStorage.getItem('ACCESS_TOKEN');
    if (!token || token === null) {
        return '';
      }

    return token;
}

export function tokenLoader(){
    return getAuthToken();
}