import React, { useState } from "react";
import axios from "axios";
import { axiosWithAuth } from "../utils/AxiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  // PUT - EDIT====================================================================
  const saveEdit = e => {
     console.log(colorToEdit.id)
       e.preventDefault();

       axiosWithAuth().put(`/api/colors/${colorToEdit.id}`, colorToEdit)
         .then((res) => {  
            const stateIndex = colors.findIndex((item)=>{
               return item.id === res.data.id
            })
               // console.log("STATE INDEX",stateIndex)
            const newStateArray = colors.filter( (item) => item.id !== res.data.id ) 
               // console.log( "NEW STATE ARRAY",newStateArray)
            const newState = newStateArray.splice(stateIndex,0,res.data)
               // console.log( "NEW STATE ARRAY",newStateArray)
            updateColors( newStateArray )
         })
         .catch((err) => console.log(err));
  };

  // DELETE ========================================================================
  const deleteColor = color => {
       //make a delete request to delete this color
       axiosWithAuth()       
         .delete(`/api/colors/${color.id}`)

      .then((res) => {     
          console.log("DELETE", res.data) 
          updateColors( colors.filter( (item) => item.id !== res.data ) )
          
      })
      .catch((err) => console.log(err));
   }
  

  return (
    <div className="colors-wrap">

      <p>colors</p>

      <ul>
        {colors.map(color => (
          <li 
            data-testid={color.color}
            key={color.color} 
            onClick={() => editColor(color)}
           >
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>

            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />

          </li>
        ))}
      </ul>

      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}

      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;

