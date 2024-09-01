import React, { useState, useEffect } from "react";

const Profile = ({ username }) => {
  const [profile, setProfile] = useState({});
  const [profilePicture, setProfilePicture] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3000/user/${username}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("data:", data);
        if (data) setProfile(data);
      })
      .catch((error) => console.error("Error fetching profile:", error));
  }, [username]);

  const updateProfile = () => {
    fetch("http://localhost:3000/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, profilePicture }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("profile updated:", data);
        setProfile(data);
      })
      .catch((error) => console.error("Error updating profile:", error));
  };

  // Handle cases where profile is null or undefined
  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{username}&apos;s Profile</h2>
      <img
        src={
          profile.profilePicture ||
          "https://static.vecteezy.com/system/resources/previews/000/574/512/original/vector-sign-of-user-icon.jpg"
        }
        alt={`${username}'s profile`}
        style={{ width: "150px", height: "150px", borderRadius: "50%" }}
      />
      <input
        type="text"
        value={profilePicture}
        onChange={(e) => setProfilePicture(e.target.value)}
        placeholder="Enter profile picture URL"
      />
      <button onClick={updateProfile}>Update Profile</button>
    </div>
  );
};

export default Profile;
