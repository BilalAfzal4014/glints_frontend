//import 'dotenv/config';
import axios from "axios";
import * as toastr from "toastr";

const baseUrl = process.env.REACT_APP_APP_BASE_URL;

const getToken = () => {
    return localStorage.getItem("token");
}

const getAuthHeader = () => {
    const token = getToken();
    return token ? {
        authorization: token
    } : {};
}

const getConfigurations = (configurations) => {
    return {
        headers: {
            ...getAuthHeader(),
        },
        ...configurations
    };
}

const getParams = (...params) => {
    return params.filter((param) => {
        return !!param;
    });
}

const api = (type, url, data = null, configurations = {}) => {
    const params = getParams(baseUrl + url, data, getConfigurations(configurations));
    return axios[type](...params).then(response => response.data)
        .catch((error) => {
            handleApiErrors(error.response.data);
            return Promise.reject();
        });
}

const handleApiErrors = (error) => {
    handleGeneralError(error);
    handlePayloadValidationErrors(error);
}

const handleGeneralError = (error) => {
    if (error.message) {
        toastr.error(error.message);
    }
}

const handlePayloadValidationErrors = (error) => {
    if (error.errors) {
        const payLoadValidationErrors = error.errors;
        for (const payLoadValidationError of payLoadValidationErrors) {
            const errorMessage = payLoadValidationError.error;
            toastr.error(errorMessage);
        }
    }
}

export default api;