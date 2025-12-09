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

  const getUniqueCategory = (data) => {
    let newVal = data?.map((item) => item.category);
    return [...new Set(newVal)];
  };

  const categoryOnlyData = getUniqueCategory(data);


  return (
    <DataContext.Provider value={{ data, setData, fetchAllProducts, categoryOnlyData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
