import { createContext, useContext, useEffect, useState } from "react";
import { Children } from "react";

const searchContext = createContext();

export const SearchProvider = ({children}) => {
    const [search, setSearch] = useState("");
    const [debouncingSearch, setDebouncingSearch] = useState("");

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncingSearch(search);
        },500);

        return () => clearTimeout(timer);
    },[search]);

     return (
        <searchContext.Provider
        value={{
            search, setSearch, debouncingSearch
        }}> {children} </searchContext.Provider>
    );
}

export const useSearch = () => useContext(searchContext);