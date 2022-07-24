import {useEffect, useState} from "react";
import {useParams, useNavigate} from 'react-router-dom';
import {getCollection, saveCollection} from "../../../api/collection";
import validator from "../../../validator";

export default function SaveCollection() {
    const {id} = useParams();
    let navigate = useNavigate();
    const [collection, setCollection] = useState({
        id: id,
        name: ""
    });

    const updateCollection = (key, value) => {
        const newCollection = {...collection};
        newCollection[key] = value;
        setCollection(newCollection);
    }

    const save = () => {
        if (validator(collection, [{
            name: "name",
            minLength: 1
        }])) {
            saveCollection({
                id: collection.id,
                name: collection.name
            }).then(() => {
                navigate(`/dashboard/collections`, {replace: true})
            });
        }
    }

    useEffect(() => {
        if (id) {
            getCollection(id)
                .then((data) => {
                    setCollection(data);
                });
        }
    }, []);

    return (
        <div>
            <form>
                <div>
                    <input name="name" type="text" placeholder="name" value={collection.name} onChange={(e) => {
                        updateCollection("name", e.target.value)
                    }}/>
                </div>
                <div>
                    <button type={"button"} onClick={save}>save</button>
                </div>
            </form>
        </div>
    )
}