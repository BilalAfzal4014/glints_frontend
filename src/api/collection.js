import api from "./index";

const preFix = "/collections";

export const saveCollection = (data) => {
    return api("post", preFix, data);
}

export const getCollections = () => {
    return api("get", preFix);
}

export const getCollection = (id) => {
    return api("get", preFix + "/" + id);
}

export const toggleCollection = (data) => {
    return api("post", preFix + "/toggle", data);
}

