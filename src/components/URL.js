// const BASE_URL = 'http://172.19.137.178:8888/api';
const BASE_URL = 'https://e043-98-42-83-92.ngrok-free.app/api';

const URL = {
    REGISTER_USER: `${BASE_URL}/user/info/save`,
    LOGIN_USER: `${BASE_URL}/user/info/login`,
    UPLOAD_FURNITURE: `${BASE_URL}/furniture/info/upload`,
    GET_USER_FURNITURE: `${BASE_URL}/furniture/info/user`,
    UPDATE_FURNITURE: `${BASE_URL}/furniture/info/update`,
    DELETE_FURNITURE: `${BASE_URL}/furniture/info/delete`,
};

export default URL;