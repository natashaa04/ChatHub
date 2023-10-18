import React from 'react';
import { logoutUser } from '../../Actions/User';
import { useSelector } from "react-redux";
import LogoutIcon from '@mui/icons-material/Logout';
import { useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router';
import './Header.css'

function Header() {
  const isSmallScreen = useMediaQuery('(max-width:768px)');
  const isExtraSmallScreen = useMediaQuery('(max-width:576px)');

  const navigate= useNavigate();

  return (
    <div className={`headerDiv ${isSmallScreen ? 'small-screen' : ''} ${isExtraSmallScreen ? 'extra-small-screen' : ''}`}>
      <h1 onClick={() => navigate('/')}>C H A T H U B</h1>
      <div className="logoutDiv" onClick={logoutUser}>
        <LogoutIcon />
        Logout
      </div>
    </div>
  );
}

export default Header;
