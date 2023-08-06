import "./UserInfo.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import useFetch from "../../hooks/useFetch";

const UserInfo = () => {
  const info = window.location.pathname.split("/");

  const { data, loading, error } = useFetch(`/users/${info[3]}`);

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
                <img src={data.img} alt="" className="itemImg" />
                <div className="details">
                  <h1 className="itemTitle">{data.username}</h1>
                  <div className="detailItem">
                    <span className="itemKey">Email:</span>
                    <span className="itemValue">{data.email}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Phone:</span>
                    <span className="itemValue">{data.phone}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Address:</span>
                    <span className="itemValue">{data.city}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Country:</span>
                    <span className="itemValue">{data.country}</span>
                  </div>
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

export default UserInfo;
