import React from "react";

const UserDetails = ({ title, info }) => {
  return (
    <div className="userDetails">
      <p>{title}:</p>
      <span className="userSpan">{info}</span>
    </div>
  );
};

export default UserDetails;
