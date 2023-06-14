import {  Routes, Route } from "react-router-dom";

import Login from "./Component/Login/Login";
import {useSelector } from "react-redux";
import { useEffect } from "react";
import { loadUser } from "./Actions/User";

import Register from "./Component/Register/Register";



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
        <Route path="/" element={isAuthenticated ? <Chat/> : <Login />} />
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



