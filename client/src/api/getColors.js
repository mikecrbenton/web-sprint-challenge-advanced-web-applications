import axios from 'axios'
import { axiosWithAuth } from "../utils/AxiosWithAuth";

export const getColors = () => {
   return axiosWithAuth().get('/api/colors')
      .then( (res) => { 
         console.log("returned for test". res.data)
         return res })
      .catch( (err) => { return err} );
}