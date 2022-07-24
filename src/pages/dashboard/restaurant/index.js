import {useState, useRef, useEffect} from "react";
import moment from "moment";
import useCollection from "../../../custom-hooks/use-collection";
import {getRestaurants} from "../../../api/restaurant";
import {toggleCollection} from "../../../api/collection";

export default function Restaurant() {
    const initialOption = useRef("all")
    const [collections] = useCollection();
    const [selectedCollection, setSelectedCollection] = useState(initialOption.current);
    const [restaurantName, setRestaurantName] = useState("");
    const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
    const [selectedDay, setSelectedDay] = useState(initialOption.current);
    const [time, setTime] = useState("");

    const [restaurants, setRestaurants] = useState([]);
    const [totalRows, setTotalRows] = useState(0);

    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(20);

    useEffect(() => {
        getAllRestaurants();
    }, [pageIndex]);

    const getAllRestaurants = () => {
        getRestaurants(getFilters())
            .then((data) => {
                setRestaurants(data.allFilteredRows);
                setTotalRows(data.countOfFilteredRows);
            });
    }

    const applyFilters = () => {
        if (pageIndex === 0) {
            getAllRestaurants();
        } else {
            setPageIndex(0);
        }
    }

    const getFilters = () => {
        return {
            pageIndex,
            pageSize,
            filters: {
                collection: selectedCollection,
                days: [selectedDay],
                name: restaurantName,
                time: moment(time, ["h:mm A"]).format("HH:mm") !== "Invalid date" ? moment(time, ["h:mm A"]).format("HH:mm") : ""
            }
        };
    }

    const findCollectionInRestaurantCollection = (collectionId, restaurantCollections) => {
        for (const restaurantCollection of restaurantCollections) {
            if (restaurantCollection.collection_id === collectionId)
                return restaurantCollection;
        }
        return null;
    }

    const toggleRestaurantCollection = (collection, restaurantCollections, restaurantId) => {
        const restaurantCollection = findCollectionInRestaurantCollection(collection.id, restaurantCollections);
        const payLoad = {
            ...(restaurantCollection && {id: restaurantCollection.collection_restaurant_mapping_id}),
            collection_id: collection.id,
            restaurant_id: restaurantId
        };
        toggleCollection(payLoad)
            .then(() => {
                getAllRestaurants();
            });
    }

    const getPaginationButtons = () => {
        const totalButtons = Math.ceil(totalRows / pageSize);
        const buttonElements = [];
        for (let i = 0; i < totalButtons; i++) {
            buttonElements.push(
                <button key={i} className={i === pageIndex ? "active" : ""}
                        onClick={() => setPageIndex(i)}>{i + 1}</button>
            )
        }
        return buttonElements;
    }

    return (
        <div>
            <div>
                <div>Filters</div>
                <div>
                    <span>Choose from my collection</span>
                    <select onChange={(event) => setSelectedCollection(event.target.value)}>
                        <option value={initialOption.current}>all</option>
                        {collections.map((collection) => {
                            return (<option key={collection.id} value={collection.id}>{collection.name}</option>)
                        })}
                    </select>
                </div>
                <div>
                    <span>Restaurant name (prefix search)</span>
                    <input name={"name"} value={restaurantName}
                           onChange={(event) => setRestaurantName(event.target.value)}/>
                </div>
                <div>
                    <span>Choose day</span>
                    <select onChange={(event) => setSelectedDay(event.target.value)}>
                        <option value={initialOption.current}>all</option>
                        {days.map((day) => {
                            return (<option key={day} value={day}>{day}</option>)
                        })}
                    </select>
                </div>
                <div>
                    <span>Choose time</span>
                    <input type="time" value={time} onChange={(event) => setTime(event.target.value)}/>
                </div>
                <button type={"button"} onClick={() => applyFilters()}>Apply filters</button>
            </div>
            <div>
                <table>
                    <thead>
                    <div>
                        <tr>
                            <td>
                                SR#
                            </td>
                            <td>
                                name
                            </td>
                        </tr>
                    </div>
                    </thead>
                    <tbody>
                    {
                        restaurants.map((restaurant, index) => {
                            return (
                                <div>
                                    <tr key={restaurant.id}>
                                        <td>{index + 1}</td>
                                        <td>{restaurant.name}</td>
                                    </tr>
                                    <ul>
                                        slots (matched slots will be in red)
                                        {
                                            restaurant.slots.map((slot) => {
                                                return (
                                                    <li key={slot.id}
                                                        className={slot.matched ? "active" : ""}>day: {slot.day} -
                                                        opening time: {slot.opening_time} - closing
                                                        time: {slot.closing_time}
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                    <ul>
                                        collections (user collections assigned to a particular restaurant will be red,
                                        click to assign or un-assign)
                                        {
                                            collections.map((collection) => {
                                                return (
                                                    <li key={`${collection.id}_${index}`}
                                                        className={findCollectionInRestaurantCollection(collection.id, restaurant.restaurant_collections) ? "active" : ""}
                                                        onClick={() => toggleRestaurantCollection(collection, restaurant.restaurant_collections, restaurant.id)}
                                                    >
                                                        {collection.name}
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
            <div>
                <div>pagination buttons</div>
                {getPaginationButtons()}
            </div>
        </div>
    )
}