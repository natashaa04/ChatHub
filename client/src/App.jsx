import {  Routes, Route } from "react-router-dom";

import Login from "./pages/Login/Login";

import {useSelector } from "react-redux";
import { useEffect } from "react";
import { loadUser } from "./Actions/User";
import Chat from "./pages/Chat/Chat";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";



const App=()=> {

   useEffect(()=>{
  //   window.addEventListener('beforeunload', loadUser());

  //   return () => {
  //     window.removeEventListener('beforeunload');
  //   };
  loadUser();
    

},[]);

  const { isAuthenticated } = useSelector((state) => state.user);

  return (


  <div>
    
    <Routes>
<Route path="/" element={isAuthenticated ? <Home/> : <Login />} />
<Route path="/chats" element={isAuthenticated ? <Chat/> : <Login />} />
<Route
  path="/login"
  element={isAuthenticated ? <Chat /> : <Login />}
/>

<Route
  path="/register"
  element={isAuthenticated ? <Chat/> : <Register />}
/>

</Routes> 

      </div>
    
  );
}

export default App;



