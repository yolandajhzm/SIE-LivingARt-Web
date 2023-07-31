const BASE_URL = 'https://c13a-2601-647-4b80-78a0-394e-9f33-da58-1292.ngrok-free.app/api';

const URL = {
    REGISTER_USER: `${BASE_URL}/user/info/save`,
    LOGIN_USER: `${BASE_URL}/user/info/login`,
    UPLOAD_FURNITURE: `${BASE_URL}/furniture/info/upload`,
    GET_USER_FURNITURE: `${BASE_URL}/furniture/info/user`,
    UPDATE_FURNITURE: `${BASE_URL}/furniture/info/update`,
    DELETE_FURNITURE: `${BASE_URL}/furniture/info/delete`,
};

export default URL;