import {useState, useContext} from "react";
import {Link} from "react-router-dom";
import {loginUser} from "../../api/user";
import {AppContext} from '../../context/index';

export default function Login() {
    const {dispatchToken} = useContext(AppContext);

    const [user, setUser] = useState({
        email: "bilal.afzal@climbcredit.com",
        password: "123431"
    });

    const updateUser = (key, value) => {
        const newUser = {...user};
        newUser[key] = value;
        setUser(newUser);
    }


    const submit = () => {
        loginUser(user)
            .then((token) => {
                dispatchToken({type: "SAVE", data: token});
            });
    }

    return (
        <div>
            <form>
                <div>
                    <input name="email" type="email" placeholder="email" value={user.email} onChange={(e) => {
                        updateUser("email", e.target.value)
                    }}/>
                </div>
                <div>
                    <input name="password" type="password" placeholder="password" value={user.password}
                           onChange={(e) => {
                               updateUser("password", e.target.value)
                           }}/>
                </div>
                <div>
                    <button type={"button"} onClick={submit}>login</button>
                </div>
            </form>
            <Link to={"/sign-up"}>sign up?</Link>
        </div>
    )
}