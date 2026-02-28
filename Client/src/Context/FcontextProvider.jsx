import React, { useState, useEffect } from "react";
import Food from "./Fcontext";

function FcontextProvider({ children }) {
  // Lazy initialization of state from localStorage
  const [cola, setCola] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const [shoppy, setShoppy] = useState(() => {
    const saved = localStorage.getItem("christi");
    return saved ? JSON.parse(saved) : [];
  });

  // Sync state to localStorage when it changes
  useEffect(() => {
    if (cola) {
      localStorage.setItem("user", JSON.stringify(cola));
    } else {
      localStorage.removeItem("user");
    }
  }, [cola]);

  useEffect(() => {
    if (shoppy && shoppy.length > 0) {
      localStorage.setItem("christi", JSON.stringify(shoppy));
    } else if (shoppy && shoppy.length === 0) {
      localStorage.removeItem("christi");
    }
  }, [shoppy]);

  return (
    <Food.Provider value={{ cola, setCola, shoppy, setShoppy }}>
      {children}
    </Food.Provider>
  );
}

export default FcontextProvider;
