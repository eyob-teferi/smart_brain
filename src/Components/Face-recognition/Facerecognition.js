import React from 'react';
import './Facerecognition.css';
import Ai from '../Ai/Ai.js'

const Facerecognition = ({ url, box }) => {
    

return (
  <div className='center ma'>
    <div className='absolute mt2'>
      <img id='inputimage' alt='' src={url} width='500px' height='auto' />
      <Ai box={box} />
    </div>
  </div>
);
}

export default Facerecognition;