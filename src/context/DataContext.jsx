import axios from "axios";
import { createContext, useState } from "react";

export const DataContext = createContext(null);
export const DataProvider = ({children}) => {
    const [data, setData] = useState();
    
    const fetchAllProducts = async() => {
        try {
            const res = await axios.get()
        } catch (error) {
            console.error(error);
        }
    }

    return <DataContext.Provider value={{data, setData}}>
        {children}
    </DataContext.Provider>
}