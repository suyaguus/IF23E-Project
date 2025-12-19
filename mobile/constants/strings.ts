const IP_ADDRESS = '172.29.80.1';
const PORT = '3001';
const BASE_URL = `http://${IP_ADDRESS}:${PORT}/api`;

export const Strings = {
    api_kamar: `${BASE_URL}/kamar`,
    api_user: `${BASE_URL}/user`,
    api_fasilitas: `${BASE_URL}/fasilitas`,
    api_perabotan: `${BASE_URL}/perabotan`,
    api_order: `${BASE_URL}/order`,
    api_riwayat: `${BASE_URL}/riwayat`,
    api_kamarFasilitas: `${BASE_URL}/kamarFasilitas`,
    api_kamarPerabotan: `${BASE_URL}/kamarPerabotan`,
    
    // Auth
    api_auth_login: `${BASE_URL}/auth/login`,                   
    api_auth_register: `${BASE_URL}/auth/register`, 
    api_auth_verify_otp: `${BASE_URL}/auth/verify-otp`, 
    api_auth_forgot_password: `${BASE_URL}/auth/forgot-password`, 
    api_auth_reset_password: `${BASE_URL}/auth/reset-password`,
    api_auth_logout: `${BASE_URL}/auth/logout`,
    api_auth_change_password: `${BASE_URL}/auth/change-password`,
}