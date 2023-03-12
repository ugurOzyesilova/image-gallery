import React, { createContext, useReducer, useEffect } from "react";
import Reducer from "./Reducer.js";

let initialState = {
    savedImages: JSON.parse(localStorage.getItem("savedImages")) || [],
};

export const Context = createContext(initialState);

export const StateProvider = (props) => {
    const [state, dispatch] = useReducer(Reducer, initialState);

    const saveImage = (image) => {
        dispatch({ type: "SAVE__IMAGE", payload: image });
    };

    const unsaveImage = (imageID) => {
        dispatch({ type: "UNSAVE__IMAGE", payload: imageID });
    };

    useEffect(() => {
        localStorage.setItem("savedImages", JSON.stringify(state.savedImages));
    }, [state.savedImages]);

    return (
        <Context.Provider value={{
            saveImage: saveImage,
            unsaveImage: unsaveImage,
            savedImages: state.savedImages
        }}>
            {props.children}
        </Context.Provider>
    );
};