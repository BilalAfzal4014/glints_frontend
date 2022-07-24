import {useNavigate} from "react-router-dom";
import useCollection from "../../../custom-hooks/use-collection";

export default function Collection() {
    let navigate = useNavigate();

    const [collections] = useCollection();

    const editCollection = (collection) => {
        navigate(`/dashboard/save-collections/${collection.id}`, {replace: true})
    }

    return (
        <div>
            <table>
                <thead>
                <tr>
                    <td>
                        SR#
                    </td>
                    <td>
                        name
                    </td>
                    <td>
                        edit
                    </td>
                </tr>
                </thead>
                <tbody>
                {
                    collections.map((collection, index) => {
                        return (
                            <tr key={collection.id}>
                                <td>{index + 1}</td>
                                <td>{collection.name}</td>
                                <td>
                                    <button type={"button"} onClick={() => editCollection(collection)}>
                                        edit
                                    </button>
                                </td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
        </div>
    )
}