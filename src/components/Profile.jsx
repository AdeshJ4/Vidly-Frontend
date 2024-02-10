// export default Profile;
import React, { useState, useEffect } from "react";
import { getUser } from "../services/userService";
import { toast } from "react-toastify";

const Profile = ({ user }) => {
  const [userData, setUserData] = useState(null);

  const fetchUser = async () => {
    try {
      let { data } = await getUser(user._id);
      setUserData(data);
    } catch (err) {
      console.log(err.message);
      toast.error("Failed to fetch User.");
    }
  };

  useEffect(() => {
    console.log("I am Inside UseEffect");
    fetchUser();
  }, []);

  console.log(userData);
  return (
    <div>
      <h2>Profile</h2>
      {userData ? (
        <div>
          <p>Name: {userData.name}</p>
          <p>Email: {userData.email}</p>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default Profile;
