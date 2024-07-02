import React from "react";
import './Ai.css';

const Ai=({box})=>{
    const faces = box.map((box, index) => {
        return (
          <div
            key={index}
            className='bounding-box'
            style={{ top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol }}
          ></div>
        );
      });

      return(
        <>
            {faces}
        </>
        
      )
}

export default Ai;