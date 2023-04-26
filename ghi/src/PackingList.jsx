import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  useGetItemsByPacklistQuery,
  useGetOneListQuery,
  useUpdateItemMutation,
  useGetWeatherInfoQuery,
  useGetDatesQuery
} from "./services/Travelthreads";
import { Link } from "react-router-dom";

const ListDetail = () => {
    const params = useParams();

    var packingListID = params["id"];

    const [updateItem] = useUpdateItemMutation(packingListID);

    const { data: allPackingListItems } = useGetItemsByPacklistQuery(packingListID);

    const { data: packingList } = useGetOneListQuery(packingListID);

    const { data: allDateLists} = useGetDatesQuery(packingListID)
    console.log(allDateLists)

    const {data: weatherInfo} = useGetWeatherInfoQuery(packingListID)


    const [location, setLocation] = useState({
        city: "",
        state: "",
        country: ""
    })

    const getData = async () => {
        const locationResponse = await fetch(`http://localhost:8000/api/location/city/details/${packingList.city}`)

        if (locationResponse.ok) {
            const data = await locationResponse.json()
            console.log(data)
            setLocation({
                city: data.name,
                state: data.state,
                country: data.country
            })
        }
    }

    const handleChange = async (e, object) => {
        console.log(e);
        console.log(object);
        let is_packed = object.is_packed ? false : true;
        console.log(is_packed);
        const body = {
        name: object.name,
        quantity: object.quantity,
        is_packed: is_packed,
        packing_list_id: object.packing_list_id,
        date_list_id: object.date_list_id,
        id: object.id,
        };
        const updatedItem = await updateItem(body);
        console.log(updatedItem);
    };

    useEffect(() => {
        if (packingList) {
            getData();
        }
    }, [packingList]);


    return (
        <div  style={{ backgroundColor: "#AED9E0", backgroundSizing: "cover", padding:"3em"}}>
            <div className="card" style={{backgroundColor: "#5E6472"}}>
                <div className="row" style={{ padding: "6em", marginTop: "0px", height: "7em"}}>
                    <div className="col" style={{color: "white"}}>
                        <h1>{packingList?.name}</h1>
                        <p>Your trip to beautiful {location.city}, {location.state}, {location.country}.</p>
                    </div>
                    <table className="col-7 card row" style={{outlineStyle: "solid", outlineWidth: ".2em", outlineColor: "#FFA69E", overflowX: "scroll", whiteSpace: "nowrap", backgroundColor: "#FFA69E"}}>
                        <tbody style={{marginLeft: "auto", marginRight: "auto"}}>
                            <tr >
                                {allDateLists?.map((dateList) => {
                                    let weatherCard = <td className="col" key={dateList.date} style={{padding: "1em"}}>
                                        <b>{dateList.date.slice(5, 10)}</b> <br/>
                                        Not Available
                                        </td>
                                    if (weatherInfo !== undefined && weatherInfo.daily.time.indexOf(dateList.date) !== -1) {
                                        const index = weatherInfo.daily.time.indexOf(dateList.date)
                                        weatherCard = <td className="col" key={dateList.date} style={{padding: "1em", outlineStyle: "solid", outlineWidth: ".1em", outlineColor: "#5E6472", outlineOffset: "-5px", borderRadius: "10px", backgroundColor: "white"}}>
                                            <b>{dateList.date.slice(5, 10)}</b> <br/>
                                            H: {weatherInfo.daily.temperature_2m_max[index]}<span>&#176;</span> <br/>
                                            L: {weatherInfo.daily.temperature_2m_min[index]}<span>&#176;</span> <br/>
                                            &#127783; {weatherInfo.daily.precipitation_probability_max[index]}%
                                        </td>
                                    }
                                    return weatherCard
                                })}
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div style={{fontSize: "1.25em", padding: "4em"}}>
                    <table className="card table" style={{display: "block"}}>
                        <thead style={{width: "100%"}}>
                            <tr style={{width: "100%"}}>
                                <th style={{ textAlign: "center"}}>Packed</th>
                                <th style={{width: "100%", paddingLeft: "4em"}}>Item Name</th>
                                <th style={{ textAlign: "center"}}>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allPackingListItems?.map((item) => {

                                return (
                                    <tr key={item.id}>
                                        <td className="position-relative" style={{}}>
                                            <input
                                                className="position-absolute top-50 start-50 translate-middle form-check-input"
                                                type="checkbox"
                                                defaultChecked={item.is_packed}
                                                onClick={(e) => handleChange(e, item)}>
                                            </input>
                                        </td>
                                        <td style={{ paddingLeft: "4em"}}>{item.name}</td>
                                        <td style={{ textAlign: "center"}}>{item.quantity}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="d-flex justify-content-end" style={{padding: "1em", justifyContent: "right"}}>
                    <button className="btn btn-secondary" >
                        <Link to={`/packinglist/${packingListID}/datelists`} style={{color: "white", textDecoration: "none"}}>Edit List</Link>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ListDetail
