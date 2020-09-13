import React from "react";
import { render, screen, wait, waitFor, fireEvent } from "@testing-library/react";
import BubblePage from "./BubblePage";
import { getColors as mockGetColors } from '../api/getColors'

jest.mock("../api/getColors");
//console.log("mock get colors",mockGetColors)

const colorArray =[
   [
      {
        color: 'aliceblue',
        code: {
          hex: '#f0f8ff'
        },
        id: 1
      },
      {
        color: 'limegreen',
        code: {
          hex: '#99ddbc'
        },
        id: 2
      },
      {
        color: 'aqua',
        code: {
          hex: '#00ffff'
        },
        id: 3
      },
      {
        color: 'aquamarine',
        code: {
          hex: '#7fffd4'
        },
        id: 4
      },
      {
        color: 'lilac',
        code: {
          hex: '#9a99dd'
        },
        id: 5
      },
      {
        color: 'softpink',
        code: {
          hex: '#dd99ba'
        },
        id: 6
      },
      {
        color: 'bisque',
        code: {
          hex: '#dd9a99'
        },
        id: 7
      },
      {
        color: 'softyellow',
        code: {
          hex: '#dcdd99'
        },
        id: 8
      },
      {
        color: 'blanchedalmond',
        code: {
          hex: '#ffebcd'
        },
        id: 9
      },
      {
        color: 'blue',
        code: {
          hex: '#6093ca'
        },
        id: 10
      },
      {
        color: 'blueviolet',
        code: {
          hex: '#8a2be2'
        },
        id: 11
      }
    ]
  ];

// THE COMPONENT SHELLS RENDER CORRECTLY
test("BubblePage renders properly", ()=> {
   const { queryByText } = render( <BubblePage /> );

   expect( queryByText(/bubbles/i)).toBeInTheDocument() ;
   expect( queryByText(/colors/i)).toBeInTheDocument() ;
})

// THE DATA IS NOT SHOWING UP
test("Fetches data and renders the bubbles", async () => {
  // Finish this test
  mockGetColors.mockResolvedValueOnce(colorArray);
  
  const { getByTestId, getByText } = render( <BubblePage/> );

  await waitFor(() => {
      getByText(/aliceblue/i);
  });

  await wait();
  
  const domArray = [
     "aliceblue","limegreen","aqua","aquamaring","lilac",
     "softpink","bisque","softyellow","blanchedalmond",
     "blue","blueviolet"]
     
      domArray.forEach( (color) => {
      expect( getByTestId(color) ).toBeInTheDocument(); 
   })  

   fireEvent.click( getByText(/aliceblue/i));
      expect( getByText(/edit color/i) ).toBeInTheDocument();
});
