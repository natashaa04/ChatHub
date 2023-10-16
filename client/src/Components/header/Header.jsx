import React from 'react';
import { logoutUser } from '../../Actions/User';
import { useSelector } from "react-redux";
import LogoutIcon from '@mui/icons-material/Logout';


function Header() {
  return (
    <div className="headerDiv" >
  
        
    <h1 onClick={()=>navigate('/')}>C h a t H u b</h1>
  
    <div className="logoutDiv" onClick={logoutUser}><LogoutIcon >Logout</LogoutIcon>Logout</div>
  </div>
  );
}

export default Header;
