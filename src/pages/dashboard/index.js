import {useContext} from "react";
import {NavLink, Outlet} from "react-router-dom";
import {AppContext} from '../../context/index';

const css = `
    .active {
        color: red;
    }
`
export default function Dashboard() {
    const {dispatchToken} = useContext(AppContext);
    const logout = () => {
        dispatchToken({type: "DELETE", data: null});
    }

    return (
        <div>
            <div>
                <span>dashboard</span>
                <button type={"button"} onClick={() => {
                    logout()
                }}>logout
                </button>
            </div>
            <div>
                <ul>
                    <li><NavLink to={"/dashboard/collections"}>Collections</NavLink></li>
                    <li><NavLink to={"/dashboard/save-collections"}>Save collection</NavLink></li>
                    <li><NavLink to={"/dashboard/restaurants"}>Restaurants</NavLink></li>
                </ul>
            </div>
            <div>
                <Outlet/>
            </div>
            <style>{css}</style>
        </div>
    )
}