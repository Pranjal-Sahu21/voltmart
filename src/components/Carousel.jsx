import React, { useContext, useEffect } from "react";
import { DataContext } from "../context/DataContext";

const Carousel = () => {
  const { data, fetchAllProducts } = useContext(DataContext);

  useEffect(() => {
    fetchAllProducts();
  }, [])  

  console.log(data);
  

  return <div>Carousel</div>;
};

export default Carousel;
