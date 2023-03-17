import React, { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setUsersDb, removeFromUsersDb, editAdmin } from "../state/usersDb";
import { message } from "antd";
import { Avatar } from "@mui/material";
import { FaTrash } from "react-icons/fa";
import UserDetails from "../commons/UserDetails";

const EditUsers = () => {
  //Hooks
  const dispatch = useDispatch();

  //States
  const usersDb = useSelector((state) => state.usersDb);
  const user = useSelector((state) => state.user);

  const otherUsers = usersDb.filter((eachUser) => user.id !== eachUser.id);

  //Handlers and functions
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/user/admin", {
        withCredentials: true,
      })
      .then((res) => {
        dispatch(setUsersDb(res.data));
      });
  }, []);

  const deleteUserHandler = async (id) => {
    try {
      const deletedUser = await axios.delete(
        `http://localhost:3001/api/user/admin/delete/${id}`,
        {
          withCredentials: true,
        }
      );
      dispatch(removeFromUsersDb(id));
    } catch (error) {
      alert("Couldn't delete user");
    }
  };

  const editAdminHandler = async (id) => {
    try {
      const editedUser = await axios.put(
        `http://localhost:3001/api/user/admin/access/${id}`,
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(editAdmin(id));
      message.success(`Admin permissions successfully modified`);
    } catch (error) {
      alert("Couldn't delete user");
    }
  };

  return (
    <div className="usersWrapper">
      <h2 className="usersTitle">Users</h2>

      {otherUsers.length ? (
        otherUsers.map((userDb) => {
          return (
            <div key={userDb.id} className="userData">
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
                  Remove from admins
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
        })
      ) : (
        <p className="noUsers">There are no users registered</p>
      )}
    </div>
  );
};

export default EditUsers;
