import React from "react";
export default function Die(props){
    return (
        <div className="die"
             style={{backgroundColor: props.isHold?"#59E391":"white"}}
             onClick={() => props.onClick(props.index)}
        >
            <h3>
                {props.value}
            </h3>
        </div>
    )
}