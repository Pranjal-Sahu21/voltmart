import axios from "axios";
import { createContext, useContext, useState } from "react";

export const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);

  const fetchAllProducts = async () => {
    try {
      const res = await axios.get("https://fakestoreapi.com/products");
      setData(res.data); 
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <DataContext.Provider value={{ data, fetchAllProducts }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
