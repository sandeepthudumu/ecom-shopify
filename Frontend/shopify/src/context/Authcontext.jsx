import { createContext, useReducer } from "react";

export const AuthContext =createContext();

const initialState={
  token:localStorage.getItem('token') || null,
  isAuthenticated :!!localStorage.getItem("token")
}

const autheReducer =(state,action)=>{
  switch(action.type){
    case 'LOGIN':
      return{
        token:action.payload,
        isAuthenticated:true
      };

      case "LOGOUT":
        return{
          token:null,
          isAuthenticated:false
        };

        default:
          return state;
  }
}

export const AuthProvider=({children})=>{
  const [authState,authDispatch]=useReducer(autheReducer,initialState);

  return(
    <AuthContext.Provider value={{authState,authDispatch}}>
      {children}
    </AuthContext.Provider>
  )
}