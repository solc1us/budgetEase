import React, { useEffect } from "react";
import { Button } from "antd";
import { Link, useHistory } from "react-router-dom";

import budgetEaseLogoWhite from "../budgetEase-Logo-White.png";



const Header = () => {
  
  const history = useHistory();

  const loginClickHandler = () => {
    history.push("/signin");
  };
  
  return (
      <div className="gx-app-home-header">
        <div>
          <img src={budgetEaseLogoWhite} height={48} />
        </div>
        <div className="gx-app-home-header-rs">
          <p className="gx-app-home-header-register"><Link to="/signup">Register</Link></p>
          <Button className="gx-home-button-login" onClick={loginClickHandler}>Login</Button>
        </div>
      </div>
  );
};

export default Header;
