import {useReducer} from "react";

function saveToken(state, action) {
    switch (action.type) {
        case "SAVE":
            state = action.data;
            localStorage.setItem("token", action.data);
            break;
        case "DELETE":
            state = null;
            localStorage.removeItem("token");
            break;
        default:
            state = localStorage.getItem("token");
    }
    return state;
}

export default function useToken() {
    return useReducer(saveToken, localStorage.getItem("token"));
}
