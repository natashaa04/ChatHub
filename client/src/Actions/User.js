import axios from "axios";
import store from "../store"


import { LoginRequest ,
   LoginSuccess,
  LoginFailure,

  RegisterRequest,
  RegisterSuccess,
  RegisterFailure,
  LoadUserRequest,
  LoadUserSuccess,
 
  LoadUserFailure,
  LogoutUserRequest,
  LogoutUserSuccess,
  LogoutUserFailure,

 allUsersRequest,
 allUsersSuccess,
 allUsersFailure
} from "../Reducers/User";





const URL='http://localhost:8000';



export const loginUser = async(email, password) => {


  try {
    store.dispatch( LoginRequest() );

    const { data } = await axios.post(
      `${URL}/api/v1/login`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(data);
    localStorage.setItem("token", data.token)
    store.dispatch( LoginSuccess( data.user));
    
  } catch (error) {
    console.log(error);
    store.dispatch(LoginFailure(error.response.data.message));
  }
 
};





export const loadUser =async() => {
  

  try {
    store.dispatch(LoadUserRequest());
  

    const { data } = await axios.get(`${URL}/api/v1/me`, 
      { headers: {"Authorization" : `Bearer ${localStorage.getItem("token")}`} }
    );

    store.dispatch( LoadUserSuccess(data.user));
  
  } catch (error) {
    store.dispatch(LoadUserFailure(error.response.data.message));
  }
};



export const getAllUsers =
 async (name = "")=> {
    

    try {
            console.log('hello')
      store.dispatch(allUsersRequest());

      const { data } = await axios.get(`${URL}/api/v1/users?name=${name}`, 
      { headers: {"Authorization" : `Bearer ${localStorage.getItem("token")}`} });
      console.log('data=',data);
      store.dispatch(allUsersSuccess(data.users))
    
    } catch (error) {
      console.log('error=',error)
      store.dispatch(allUsersFailure(error.response.data.message));
    }
 
  };




export const logoutUser = async()=> {


  try {
    store.dispatch(LogoutUserRequest());
   
    // await axios.get(`${URL}/api/v1/logout`, 
    // { headers: {"Authorization" : `Bearer ${localStorage.getItem("token")}`} });
   await localStorage.removeItem("token");

    store.dispatch(LogoutUserSuccess());
  } catch (error) {
    console.log(error);
    store.dispatch(LogoutUserFailure(error.response.data.message))
  }
 
};




export const registerUser =

  async(avatar,name,email,password)=> {

    try {
      store.dispatch(RegisterRequest());

      const { data } = await axios.post(
        `${URL}/api/v1/register`,
        {avatar, name,email, password},
        {
          headers: {
            "Content-Type": "application/json", 
          },
        }
      );
      localStorage.setItem("token", data.token);

      store.dispatch(RegisterSuccess(data.user))
    } catch (error) {
      console.log(error);
  
      store.dispatch(RegisterFailure(error.response.data.message));
    }
    
  };


