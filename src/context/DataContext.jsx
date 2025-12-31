import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

export const DataContext = createContext({
  products: [],
  productCategories: [],
});

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

  const productCategories = getUniqueCategory(data);

  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <DataContext.Provider value={{ products: data, productCategories }}>
      {children}
    </DataContext.Provider>
  );
};

export const useProductsData = () => useContext(DataContext);
