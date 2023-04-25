import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  useGetItemsByPacklistQuery,
  useUpdateItemMutation,
} from "./services/Travelthreads";
import { useGetOneListQuery } from "./services/Travelthreads";
import { Link } from "react-router-dom";
import { handleIsPackedChange, reset } from "./features/auth/createItem";
import { useSelector, useDispatch } from "react-redux";

const ListDetail = () => {
  const params = useParams();
  var packingListID = params["id"];
  const [updateItem] = useUpdateItemMutation();

  const [items, setItems] = useState([]);
  const dispatch = useDispatch();
  const { data: allPackingListItems } =
    useGetItemsByPacklistQuery(packingListID);

  const { data: packingList } = useGetOneListQuery(packingListID);

  const getData = async () => {
    await setItems(allPackingListItems);
  };
  // const {data: allInfo} = useGetLatLonQuery(packingListID)
  // console.log(allInfo)
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
    getData();
  }, []);

  return (
    <div className="container">
      <div>{/* {allInfo["daily"]?.map()} */}</div>
      <h1>{packingList?.name}</h1>
      <table>
        <thead>
          <tr>
            <th>Packed</th>
            <th>Item Name</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {allPackingListItems?.map((item) => {
            return (
              <tr key={item.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={item.is_packed}
                    value={item.is_packed}
                    onChange={() => dispatch(handleIsPackedChange())}
                    onClick={(e) => handleChange(e, item)}
                  ></input>
                </td>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button>
        <Link to={`/packinglist/${packingListID}/datelists`}>Edit</Link>
      </button>
    </div>
  );
};

export default ListDetail;
