import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/AxiosWithAuth";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = ( ) => {
  const [colorList, setColorList] = useState([]);
 
  useEffect( () => {
   axiosWithAuth().get('/api/colors')
      .then( (res) => {
         //console.log(res.data)
         setColorList(res.data )
      })
      .catch( (err) => console.log(err) );
},[])


  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
