import {useContext, useState} from "react";
import {AppContext} from "../../context";
import {signUpUser} from "../../api/user";
import {Link} from "react-router-dom";
import validator from "../../validator";

export default function Signup() {
    const {dispatchToken} = useContext(AppContext);

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    });

    const updateUser = (key, value) => {
        const newUser = {...user};
        newUser[key] = value;
        setUser(newUser);
    }


    const submit = () => {
        if (validator(user, [{
            name: "name",
            minLength: 1
        }, {
            name: "email",
            regularExpression: '^(([^<>()[\\]\\.,;:\\s@\\"]+(\\.[^<>()[\\]\\.,;:\\s@\\"]+)*)|(\\".+\\"))@(([^<>()[\\]\\.,;:\\s@\\"]+\\.)+[^<>()[\\]\\.,;:\\s@\\"]{2,})$',
            errorMessage: "Email is not valid"
        }, {
            name: "password",
            minLength: 8
        }])) {
            signUpUser(user)
                .then((token) => {
                    dispatchToken({type: "SAVE", data: token});
                });
        }
    }

    return (
        <div>
            <form>
                <div>
                    <input name="email" type="text" placeholder="name" value={user.name} onChange={(e) => {
                        updateUser("name", e.target.value)
                    }}/>
                </div>
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
                    <button type={"button"} onClick={submit}>Sign-up</button>
                </div>
            </form>
            <Link to={"/"}>Already have a account login?</Link>
        </div>
    )
}