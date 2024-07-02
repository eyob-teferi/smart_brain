import React from "react";
import './Input.css'

const Input=({handleChange,handleclick,value})=>{
    return(
        
        <div>
      <p className='f3'>
        {'This Magic Brain will detect faces in your pictures. Give it a try.'}
      </p>
      <div className='center' >
        <div className='form center pa4 br3 shadow-5 w-70' >
          <input className='f4 pa2 w-70 center br4 bn' style={{ outline: 'none' }} type='tex' onChange={handleChange} value={value}/>
          <button
            className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple ml3'
            onClick={handleclick}> 
          Detect
          </button>
        </div>
      </div>
    </div>
    )
}

export default Input;