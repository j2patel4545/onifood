import React, { useState, useEffect } from "react";
import Food from "./Fcontext";

function FcontextProvider({ children }) {
  const storedUser = localStorage.getItem("user");
  const storedchristi = localStorage.getItem("christi");

  const [cola, setCola] = useState(storedUser ? JSON.parse(storedUser) : null);
  const [shoppy,setShoppy]=  useState(storedchristi ? JSON.parse(storedchristi) : null);
 
    localStorage.setItem("user", JSON.stringify(cola));
    localStorage.setItem("christi",JSON.stringify(shoppy))
    console.log(storedchristi);
    
 

  return <Food.Provider value={{ cola, setCola , setShoppy ,shoppy }}>
    {children}
    </Food.Provider>;
}

export default FcontextProvider;
