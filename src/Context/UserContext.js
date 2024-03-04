import { createContext, useState } from "react";
import React from 'react'

export let UserContext=createContext()


export default function UserContextProvider(props) {
    let [UserToken, setUserToken] = useState(null);
  return <UserContext.Provider value={{UserToken,setUserToken}}>

        {props.children} 

  </UserContext.Provider>

}
