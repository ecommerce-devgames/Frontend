import React, { useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import UserDetails from "../commons/UserDetails";
import { useSelector, useDispatch } from "react-redux";
import { setUsersDb, removeFromUsersDb, editAdmin } from "../state/usersDb";
import { message } from "antd";

const EditUsers = () => {
  const usersDb = useSelector((state) => state.usersDb);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/user/admin/all", {
        withCredentials: true,
      })
      .then((res) => {
        dispatch(setUsersDb(res.data));
      });
  }, []);

  const deleteUserHandler = (id) => {
    if (user.id !== id)
      axios
        .delete(`http://localhost:3001/api/user/admin/delete/${id}`, {
          withCredentials: true,
        })
        .then(() => dispatch(removeFromUsersDb(id)));
  };

  const editAdminHandler = (id) => {
    if (user.id !== id)
      axios
        .put(
          "http://localhost:3001/api/user/admin/access",
          { id },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          dispatch(editAdmin(id));
          message.success(`Admin permissions successfully modified`);
        });
  };

  return (
    <div className="usersWrapper">
      <h2 className="usersTitle">Users</h2>
      {usersDb.map((userDb) => {
        if (userDb.id !== user.id)
          return (
            <div className="userData">
              <Avatar
                className="userAvatar"
                sx={{
                  width: 32,
                  height: 32,
                  backgroundColor: "rgb(53, 136, 230)",
                }}
              ></Avatar>
              <UserDetails
                title="Fullname"
                info={`${userDb.name} ${userDb.lastName}`}
              />
              <UserDetails title="Email" info={userDb.email} />
              <FaTrash
                className="userFaTrash"
                onClick={() => deleteUserHandler(userDb.id)}
              />
              {userDb.isAdmin ? (
                <button
                  className="userButton"
                  onClick={() => editAdminHandler(userDb.id)}
                >
                  Remove from Admins
                </button>
              ) : (
                <button
                  className="userButton"
                  onClick={() => editAdminHandler(userDb.id)}
                >
                  Upgrade to admin
                </button>
              )}
            </div>
          );
      })}
    </div>
  );
};

export default EditUsers;
