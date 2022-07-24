import api from "./index";

const preFix = "/users";

export const loginUser = (data) => {
    const url = "/login";
    return api("post", preFix + url, data);
}

export const signUpUser = (data) => {
    return api("post", preFix, data);
}
