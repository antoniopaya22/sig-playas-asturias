import React, { useReducer } from "react";

// core components
import { MapContext, mapReducer, initialState } from '../../utils/MapContext';
import Playas from "./Playas";

export default function Historial() {
  const [state, dispatch] = useReducer(mapReducer, initialState);
  return (
    <>
    <MapContext.Provider value={{ state, dispatch }}>  
        <Playas />
      </MapContext.Provider>
    </>
  );
}
