import { createContext, useState } from "react";
import React from 'react'

export let ContextStore=createContext()


export default function ContextStoreprovider(props) {
    const [count, setCount] = useState(0);
  return <ContextStore.Provider value={{count}}>

    {props.children}
  </ContextStore.Provider>

}
