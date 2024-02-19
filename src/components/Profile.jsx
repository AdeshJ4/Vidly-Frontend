// export default Profile;
import React, { useState, useEffect } from "react";
import { getUser } from "../services/userService";
import { toast } from "react-toastify";

const Profile = ({ user }) => {
  const [userData, setUserData] = useState(null);

  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        let { data } = await getUser(user._id);
        setUserData(data);
      } catch (err) {
        console.log(err.message);
        toast.error("Failed to fetch User.");
      }
    };
    fetchUser();
  }, []);

  console.log(userData);
  return (
    <div className="container mt-5">
      <h2 className="mb-4">Profile</h2>
      {userData ? (
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">User Information</h5>
            <p className="card-text"><strong>Name:</strong> {userData.name}</p>
            <p className="card-text"><strong>Email:</strong> {userData.email}</p>
          </div>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default Profile;
