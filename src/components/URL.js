const BASE_URL = 'http://localhost:88/api';

const URL = {
    REGISTER_USER: `${BASE_URL}/user/info/save`,
    LOGIN_USER: `${BASE_URL}/user/info/login`,
    UPLOAD_FURNITURE: `${BASE_URL}/furniture/info/upload`,
    GET_USER_FURNITURE: `${BASE_URL}/furniture/info/user`,
};

export default URL;