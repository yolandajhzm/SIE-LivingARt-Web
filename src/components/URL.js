const BASE_URL = 'https://5f9a-2601-647-4b80-78a0-8945-a485-1459-2b10.ngrok-free.app/api';

const URL = {
    REGISTER_USER: `${BASE_URL}/user/info/save`,
    LOGIN_USER: `${BASE_URL}/user/info/login`,
    UPLOAD_FURNITURE: `${BASE_URL}/furniture/info/upload`,
    GET_USER_FURNITURE: `${BASE_URL}/furniture/info/user`,
    UPDATE_FURNITURE: `${BASE_URL}/furniture/info/update`,
    DELETE_FURNITURE: `${BASE_URL}/furniture/info/delete`,
};

export default URL;