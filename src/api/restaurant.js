import api from "./index";

const preFix = "/restaurants";

export const getRestaurants = (data) => {
    return api("get", preFix + "/" + JSON.stringify(data));
}


