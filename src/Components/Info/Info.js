import React from "react";
import './Info.css'

const Info=({name,entries})=>{
    return(
        <div className="info">
            <div>
                {`${name} your entry count is...`}
            </div>
            <div>
                {entries}
            </div>
        </div>
    )
}

export default Info;