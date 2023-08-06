import "./InfoPage.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import useFetch from "../../hooks/useFetch";
import StarIcon from "@mui/icons-material/Star";
import axios from "axios";
import { useEffect, useState } from "react";

const InfoPage = () => {
  const info = window.location.pathname.split("/");
  const [datass, setdatass] = useState([]);
  // const array = [];

  const path = info[1] === "hotels" ? "hotels/find" : info[1];

  const { data, loading, error } = useFetch(`/${path}/${info[3]}`);

  const roomIds = Object.keys(data).map((element) => data[element])[9];

  const getRoomsData = async (room) => {
    try {
      await axios.get(`/rooms/${room}`).then((res) => {
        const { id, desc, maxPeople, price, roomNumbers, title, ...others } =
          res.data;
        const newItem = {
          id: id,
          desc: desc,
          maxPeople: maxPeople,
          price: price,
          roomNumbers: roomNumbers,
          title: title,
          others: { ...others },
        };
        setdatass((datass) => [...datass, newItem]);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getRoomIds = () => {
    roomIds?.map((room) => getRoomsData(room));
  };

  useEffect(getRoomIds, [data]);

  // datass?.map((item) => {
  //   console.log(item);
  // });

  return (
    <div className="info">
      <Sidebar />
      <div className="infoContainer">
        <Navbar />
        <div className="top">
          {!data ? (
            <label> "No Data Found"</label>
          ) : (
            <div className="left">
              <div className="editButton">Edit</div>
              <h1 className="title">Information</h1>
              <div className="item">
                <div className="details">
                  <div className="detailItem">
                    {data.photos?.map((photo) => {
                      <img src={photo} alt="" className="itemImg" />;
                    })}
                  </div>
                  <div className="nameItem">
                    <h1 className="itemName">{data.name} </h1>
                    {data.featured ? (
                      <StarIcon
                        fontSize="small"
                        className="icon"
                        tooltip="Featured"
                        style={{ color: "gold" }}
                      />
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Description:</span>
                    <span className="itemValue">{data.desc}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Title:</span>
                    <span className="itemValue">{data.title}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Distance:</span>
                    <span className="itemValue">{data.distance}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Type:</span>
                    <span className="itemValue">{data.type}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">City:</span>
                    <span className="itemValue">{data.city}</span>
                  </div>
                  {/* {datass &&
                    datass.map((data) => {
                      <div className="detailItem">
                        <span className="itemKey">Rooms:{data.desc}</span>
                      </div>;
                    })} */}
                  <h3 class="mdc-list-group__subheader">Rooms: </h3>
                  {datass?.map((data,index) => (
                    <div className="roomList">
                      <h3 className="mdc-list-group__subheader">{data.title} </h3>
                      <div className="detailItem">
                        <ul>
                          <li className="itemKey" key={`0${index}`}>
                            Description: {data.desc}
                          </li>
                          <li className="itemKey" key={`1${index}`}>
                            Price: {data.price}
                          </li>
                          <li className="itemKey" key={`2${index}`}>
                            Occupancy: {data.maxPeople}
                          </li>
                        </ul>
                      </div>
                      <div className="detailItem">
                        {data?.roomNumbers.map((key, index) => {
                          <ul>
                            <li className="itemKey" key={`0${index}`}>
                              {key.number}
                            </li>
                            <li className="itemKey" key={`1${index}`}>
                              {key.unavailableDates}
                            </li>
                          </ul>;
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          {/* <div className="right">
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
          </div> */}
        </div>
        {/* <div className="bottom">
          <h1 className="title">Last Transactions</h1>
          <List />
        </div> */}
      </div>
    </div>
  );
};

export default InfoPage;
