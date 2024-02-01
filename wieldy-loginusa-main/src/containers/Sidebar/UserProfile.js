import React from "react";
import {useDispatch} from "react-redux";
import {Avatar, Popover} from "antd";
// import {userSignOut} from "../../appRedux/actions";
import AuthActions from "../../appRedux/reducers/AuthRedux";

const UserProfile = () => {
  const user_credent = localStorage.getItem("user_credent")
  ? JSON.parse(localStorage.getItem("user_credent"))
  : null;
  const dispatch = useDispatch();
  const userMenuOptions = (
    <ul className="gx-user-popover">
      <li>My Account</li>
      <li>Connections</li>
      <li onClick={() => dispatch(AuthActions.userSignOut())}>Logout</li>
    </ul>
  );

  return (
    <div className="gx-flex-row gx-align-items-center gx-mb-4 gx-avatar-row">
      <Popover placement="bottomRight" content={userMenuOptions} trigger="click">
        <Avatar src={"https://via.placeholder.com/150"} className="gx-size-40 gx-pointer gx-mr-3" alt=""/>
        <span className="gx-avatar-name">Rob Farnandies<i className="icon icon-chevron-down gx-fs-xxs gx-ml-2"/></span>
      </Popover>
    </div>
  )
};

export default UserProfile;
