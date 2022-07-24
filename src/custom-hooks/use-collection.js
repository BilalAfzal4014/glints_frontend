import {useEffect, useState} from "react";
import {getCollections} from "../api/collection";

export default function useCollection() {
    const [collections, setCollections] = useState([]);
    useEffect(() => {
        getCollections()
            .then((data) => {
                setCollections(data);
            });
    }, []);
    return [collections];
}