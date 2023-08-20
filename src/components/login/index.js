export const API_BASE_URL = 'http://localhost:8080';
export const frontendUrl = window.location.protocol+"//"+window.location.host;

export const GOOGLE_AUTH_URL = API_BASE_URL + '/auth/authorize/google?redirect_uri='+frontendUrl;
export const KAKAO_AUTH_URL = API_BASE_URL + '/auth/authorize/kakao?redirect_uri='+frontendUrl;